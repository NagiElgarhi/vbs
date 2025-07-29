import React, { useState } from 'react';

const ContactFormProject: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('إرسال...');
    setErrors({});
    setIsSubmitting(true);
    
    try {
      // In a real app, this URL would come from an environment variable
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
            const serverErrors = result.errors.reduce((acc: any, err: any) => {
                acc[err.param] = err.msg;
                return acc;
            }, {});
            setErrors(serverErrors);
            setStatus('فشل الإرسال. الرجاء إصلاح الأخطاء.');
        } else {
            throw new Error(result.message || 'فشل الإرسال.');
        }
      } else {
        setStatus(result.message);
        setFormData({ name: '', email: '', message: '' }); // Clear form
      }
    } catch (err) {
      setStatus((err as Error).message);
      setErrors({});
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3 className="text-xl font-semibold mb-4 text-center">مشروع عملي: نموذج اتصل بنا (React)</h3>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">الاسم:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full p-2 border rounded" />
            {errors.name && <p style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">البريد الإلكتروني:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full p-2 border rounded" />
            {errors.email && <p style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">الرسالة:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required disabled={isSubmitting} className="w-full p-2 border rounded" style={{ minHeight: '100px' }} />
            {errors.message && <p style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer disabled:bg-gray-400">
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
            </button>
          {status && <p style={{ marginTop: '15px' }} className="text-center">الحالة: {status}</p>}
        </form>
    </div>
  );
}

export default ContactFormProject;
