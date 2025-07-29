import { GoogleGenAI } from "@google/genai";

/**
 * Gets a response from the Gemini AI based on user input and section content.
 * @param apiKey The user's Gemini API key.
 * @param userInput The user's question.
 * @param sectionContent The content of the current e-book section.
 * @returns A promise that resolves to the AI's text response.
 * @throws An error if the API call fails.
 */
export async function getAiResponse(apiKey: string, userInput: string, sectionContent: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey });
        
        const systemInstruction = `أنت مساعد خبير في كتاب عن إدارة الخوادم.
        مهمتك هي الإجابة على سؤال المستخدم بناءً على النص المقدم أدناه فقط.
        لا تستخدم أي معرفة خارجية.
        إذا لم يكن الجواب موجودًا في النص، يجب أن تقول "لا يمكنني الإجابة على هذا السؤال بناءً على النص المقدم."
        أجب دائمًا باللغة العربية.
        النص المقدم:
        ---
        ${sectionContent}
        ---`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userInput,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text;
    } catch (err) {
        console.error("Gemini Service Error:", err);
        // Re-throw the error to be caught by the calling component
        throw new Error((err as Error).message || "An unknown error occurred with the AI service.");
    }
}
