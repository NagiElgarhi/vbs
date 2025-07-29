import React, { useState, useEffect, useRef } from 'react';
import { getAiResponse } from '../services/geminiService'; // Import the new service

// --- TypeScript declarations for Speech Recognition API ---
// This is necessary because the Web Speech API is not yet part of standard TypeScript DOM typings.
interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly [index: number]: SpeechRecognitionAlternative;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
    readonly [index: number]: SpeechRecognitionResult;
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start(): void;
    stop(): void;
}

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionStatic;
        webkitSpeechRecognition: SpeechRecognitionStatic;
    }
}
// --- End of declarations ---

interface ChatWidgetProps {
  apiKey: string | null;
  sectionContent: string;
  sectionTitle: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  imagePreview?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ apiKey, sectionContent, sectionTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // New state for image and voice
  const [uploadedImage, setUploadedImage] = useState<{ data: string; mimeType: string; preview: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Drag state
  const [position, setPosition] = useState({ 
      x: window.innerWidth - 370, // 350px width + 20px padding
      y: window.innerHeight - 520 // 450px height + 70px padding to be above toggle
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatWindowRef = useRef<HTMLDivElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);
  
  useEffect(() => {
    if (isOpen) {
        setChatHistory([]); // Clear history when opening on a new section
        setError(null);
    }
  }, [isOpen, sectionContent]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatWindowRef.current) {
        setIsDragging(true);
        const refPos = chatWindowRef.current.getBoundingClientRect();
        setDragStart({ 
            x: e.clientX - refPos.left, 
            y: e.clientY - refPos.top 
        });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatWindowRef.current) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Constrain to viewport
        const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - chatWindowRef.current.offsetWidth));
        const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - chatWindowRef.current.offsetHeight));

        setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target && e.target.result ? (e.target.result as string) : '';
        if (dataUrl) {
            const mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            const base64Data = dataUrl.split(',')[1];
            setUploadedImage({ data: base64Data, mimeType, preview: dataUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("متصفحك لا يدعم التعرف على الكلام.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
           setUserInput(prev => prev + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };
    
    recognition.onend = () => {
        setIsRecording(false);
    };
    
    recognition.onerror = (event) => {
        setError(`خطأ في التعرف على الكلام: ${event.error}`);
        setIsRecording(false);
    }

    recognition.start();
    setIsRecording(true);
    recognitionRef.current = recognition;
  };


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!userInput.trim() && !uploadedImage) || isLoading) return;

    const newUserMessage: ChatMessage = { 
      sender: 'user', 
      text: userInput,
      imagePreview: uploadedImage ? uploadedImage.preview : undefined
    };
    setChatHistory(prev => [...prev, newUserMessage]);
    const currentInput = userInput;
    const currentImage = uploadedImage;
    setUserInput('');
    setUploadedImage(null);
    setIsLoading(true);
    setError(null);
    
    if (!apiKey) {
        setError("لم يتم توفير مفتاح Gemini API. يرجى إضافته في إعدادات الوكيل أدناه.");
        setIsLoading(false);
        const aiResponse: ChatMessage = { sender: 'ai', text: "مفتاح Gemini API غير متوفر. يرجى الذهاب إلى 'إعدادات الوكيل' في أسفل الصفحة لإضافة مفتاحك." };
        setChatHistory(prev => [...prev, aiResponse]);
        return;
    }

    try {
        const aiText = await getAiResponse(apiKey, currentInput, sectionContent, currentImage || undefined);
        const aiResponse: ChatMessage = { sender: 'ai', text: aiText };
        setChatHistory(prev => [...prev, aiResponse]);
    } catch (err) {
        console.error("Gemini API error:", err);
        const errorMessage = (err as Error).message || "An unknown error occurred with the AI service.";
        setError(`Failed to get response: ${errorMessage}`);
        const aiErrorResponse: ChatMessage = { sender: 'ai', text: `حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي. قد يكون المفتاح غير صالح أو انتهت صلاحيته. الخطأ: ${errorMessage}` };
        setChatHistory(prev => [...prev, aiErrorResponse]);
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="اسأل الذكاء الاصطناعي عن هذا القسم"
        className="fixed bottom-5 right-5 z-[9998] w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-stone-900"
        aria-label="Toggle Chat Widget"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed z-[9999] w-[350px] h-[450px] bg-stone-800 border border-stone-600 rounded-lg shadow-2xl flex flex-col"
          style={{ 
            top: `${position.y}px`, 
            left: `${position.x}px`
          }}
          dir="rtl"
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-2 bg-stone-700 border-b border-stone-600 cursor-move"
            onMouseDown={handleMouseDown}
          >
            <h3 className="font-bold text-amber-400 text-sm truncate pr-2">اسأل عن: {sectionTitle}</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 text-stone-300 hover:text-white hover:bg-stone-500 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-sky-700 text-white' : 'bg-stone-600 text-stone-200'}`}>
                    {msg.imagePreview && <img src={msg.imagePreview} alt="user upload" className="rounded-md mb-2 max-w-full h-auto" />}
                   <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                    <div className="max-w-[80%] p-2 rounded-lg bg-stone-600 text-stone-200 flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-0"></span>
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            )}
            {error && <p className="text-red-400 text-xs p-2 bg-red-900/50 rounded">{error}</p>}
             <div ref={messagesEndRef} />
          </div>
            
           {/* Image Preview */}
            {uploadedImage && (
                <div className="p-2 border-t border-stone-600 bg-stone-700 flex items-center justify-between">
                    <img src={uploadedImage.preview} alt="preview" className="w-12 h-12 rounded-md object-cover" />
                    <button onClick={() => setUploadedImage(null)} className="p-1 text-red-400 hover:text-red-300">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                         </svg>
                    </button>
                </div>
            )}

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-stone-600">
            <div className="flex items-center">
             <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => { if (fileInputRef.current) fileInputRef.current.click(); }}
                title="رفع صورة"
                className="p-2 text-stone-300 hover:text-white disabled:text-stone-500"
                disabled={isLoading}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
              </button>
              <button
                type="button"
                onClick={toggleRecording}
                title={isRecording ? "إيقاف التسجيل" : "التسجيل الصوتي"}
                className={`p-2 ${isRecording ? 'text-red-500 animate-pulse' : 'text-stone-300'} hover:text-white disabled:text-stone-500`}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 10.5a.5.5 0 001 0v-1a.5.5 0 00-1 0v1z" />
                   <path d="M10 12a4 4 0 00-4 4v.5a.5.5 0 001 0V16a3 3 0 016 0v.5a.5.5 0 001 0V16a4 4 0 00-4-4z" />
                </svg>
              </button>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={sectionContent ? "اكتب سؤالك هنا..." : "اختر فصلاً للبدء"}
                disabled={isLoading || !sectionContent}
                className="flex-1 bg-stone-900 border border-stone-500 rounded-md py-1.5 px-3 text-white placeholder-stone-400 focus:ring-amber-400 focus:border-amber-400 transition text-sm"
                aria-label="Chat input"
              />
              <button type="submit" disabled={isLoading || (!userInput.trim() && !uploadedImage) || !sectionContent} className="mr-2 rtl:ml-2 rtl:mr-0 p-2 bg-sky-600 text-white rounded-md disabled:bg-stone-500 disabled:cursor-not-allowed hover:bg-sky-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;