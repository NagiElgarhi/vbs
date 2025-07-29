import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000/api/auth';

// --- Sub-components for each form ---

const SignUpForm: React.FC<{ onSwitch: (view: string) => void }> = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        const res = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        setMessage(data.message || 'حدث خطأ ما.');
        if (res.ok) {
            setTimeout(() => onSwitch('login'), 2000);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">تسجيل مستخدم جديد</h3>
            <div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="بريد إلكتروني" required className="w-full p-2 border" />
            </div>
            <div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" required className="w-full p-2 border" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
                {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
            </button>
            {message && <p className="text-center">{message}</p>}
            <p className="text-center"><a href="#" onClick={(e) => { e.preventDefault(); onSwitch('login'); }} className="text-blue-500 hover:underline">لديك حساب؟ سجل الدخول</a></p>
        </form>
    );
};

const LoginForm: React.FC<{ onSwitch: (view: string) => void, onAuthSuccess: (token: string) => void }> = ({ onSwitch, onAuthSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
            setMessage(data.message || 'فشل تسجيل الدخول.');
        } else {
            onAuthSuccess(data.token);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">تسجيل الدخول</h3>
            <div>
                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="بريد إلكتروني" required className="w-full p-2 border" />
            </div>
             <div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" required className="w-full p-2 border" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
                {isLoading ? 'جاري الدخول...' : 'دخول'}
            </button>
            {message && <p className="text-center text-red-500">{message}</p>}
            <p className="text-center"><a href="#" onClick={(e) => { e.preventDefault(); onSwitch('forgot'); }} className="text-blue-500 hover:underline">نسيت كلمة المرور؟</a></p>
             <p className="text-center"><a href="#" onClick={(e) => { e.preventDefault(); onSwitch('signup'); }} className="text-blue-500 hover:underline">ليس لديك حساب؟ سجل الآن</a></p>
        </form>
    );
};

const ForgotPasswordForm: React.FC<{ onSwitch: (view: string) => void }> = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        const res = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        setMessage(data.message + " (تحقق من طرفية الخادم للحصول على الرمز).");
        if (res.ok) {
            setTimeout(() => onSwitch('reset'), 2000);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">طلب إعادة تعيين كلمة المرور</h3>
            <div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="بريدك الإلكتروني" required className="w-full p-2 border" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
                {isLoading ? 'جاري الإرسال...' : 'إرسال'}
            </button>
            {message && <p className="text-center">{message}</p>}
            <p className="text-center"><a href="#" onClick={(e) => { e.preventDefault(); onSwitch('login'); }} className="text-blue-500 hover:underline">العودة لتسجيل الدخول</a></p>
        </form>
    );
};

const ResetPasswordForm: React.FC<{ onSwitch: (view: string) => void }> = ({ onSwitch }) => {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        const res = await fetch(`${API_BASE_URL}/reset-password`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ token, password })
        });
        const data = await res.json();
        setMessage(data.message);
        if (res.ok) {
            setTimeout(() => onSwitch('login'), 2000);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">إعادة تعيين كلمة المرور</h3>
            <div>
                <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="لصق الرمز هنا" required className="w-full p-2 border" />
            </div>
            <div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور الجديدة" required className="w-full p-2 border" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded">
                {isLoading ? 'جاري التعيين...' : 'إعادة تعيين'}
            </button>
            {message && <p className="text-center">{message}</p>}
        </form>
    );
};

// --- Main component managing the flow ---
const AuthFlowProject: React.FC = () => {
    const [view, setView] = useState('signup'); // 'signup', 'login', 'forgot', 'reset'
    const [authToken, setAuthToken] = useState<string | null>(null);

    const handleAuthSuccess = (token: string) => {
        setAuthToken(token);
        console.log("Logged in successfully! Token:", token);
    };
    
    const handleLogout = () => setAuthToken(null);
    
    let content;

    if (authToken) {
        content = (
            <div>
                <h2 className="text-2xl font-bold">أهلاً بك! أنت مسجل الدخول.</h2>
                <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">تسجيل الخروج</button>
            </div>
        );
    } else {
        switch (view) {
            case 'login': 
                content = <LoginForm onSwitch={setView} onAuthSuccess={handleAuthSuccess} />;
                break;
            case 'forgot': 
                content = <ForgotPasswordForm onSwitch={setView} />;
                break;
            case 'reset': 
                content = <ResetPasswordForm onSwitch={setView} />;
                break;
            case 'signup':
            default:
                content = <SignUpForm onSwitch={setView} />;
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 className="text-2xl font-bold text-center mb-4">مشروع تدفق المصادقة</h2>
            {content}
        </div>
    );
}

export default AuthFlowProject;
