import React, { useState, useEffect } from 'react';

// This component simulates checking the order status after payment redirection.
// It would be used on a "Thank You" or "Order Completion" page.
const DigitalProductProject: React.FC = () => {
    // In a real app, the orderId would come from the URL query parameters
    const [orderId] = useState<string>('mock-order-123');
    const [order, setOrder] = useState<{ status: string, code?: string, reason?: string } | null>(null);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        if (!orderId) return;

        const intervalId = setInterval(async () => {
            if (attempts >= 5) { // Stop after 5 attempts
                setOrder({ status: 'failed', reason: 'Timeout checking order status.' });
                clearInterval(intervalId);
                return;
            }

            try {
                // You need to create this GET endpoint in your backend
                // It should check the status of the order in your database/memory
                const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
                const data = await response.json();
                
                if (data.status === 'completed' || data.status === 'failed') {
                    setOrder(data);
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error("Failed to fetch order status:", error);
                setOrder({ status: 'failed', reason: 'Could not connect to server.' });
                clearInterval(intervalId);
            }
            setAttempts(prev => prev + 1);
        }, 3000); // Check every 3 seconds

        return () => clearInterval(intervalId);
    }, [orderId, attempts]);

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2 className="text-2xl font-bold mb-4">مشروع المنتج الرقمي</h2>
            {!order && <p>جاري التحقق من حالة الدفع... (محاولة {attempts + 1})</p>}
            {order && order.status === 'failed' && <p className="text-red-600">فشل الدفع: {order.reason}</p>}
            {order && order.status === 'completed' && (
                 <div>
                    <h3 className="text-xl font-semibold text-green-600">اكتمل الدفع بنجاح!</h3>
                    <p>رمز بطاقتك هو:</p>
                    <p style={{ background: '#eee', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '1.2rem', margin: '10px 0' }}>
                        <strong>{order.code}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DigitalProductProject;
