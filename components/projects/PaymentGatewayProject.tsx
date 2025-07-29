import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// It's better to get this from an environment variable in a real app
// For this example, the user must replace it.
// e.g., in a .env file: REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
const STRIPE_PUBLISHABLE_KEY = "pk_test_51...YOUR_KEY"; // <-- REPLACE THIS

if (STRIPE_PUBLISHABLE_KEY.includes("YOUR_KEY")) {
    console.warn("Please replace the placeholder Stripe publishable key in components/projects/PaymentGatewayProject.tsx");
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // Redirect back to the same page for simplicity
      },
    });
    
    if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || 'An unexpected error occurred.');
    } else {
        setMessage("حدث خطأ غير متوقع.");
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="w-full p-2 bg-green-500 text-white rounded disabled:bg-gray-400">
        <span id="button-text">
          {isLoading ? "جاري المعالجة..." : "ادفع الآن"}
        </span>
      </button>
      {message && <div id="payment-message" className="text-red-500">{message}</div>}
    </form>
  );
}

const PaymentGatewayProject: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/create-payment-intent", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1500 }) // $15.00
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(err => console.error("Failed to create payment intent:", err));
  }, []);

  const appearance = { theme: 'stripe' as const };
  const options = { clientSecret, appearance };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 className="text-2xl font-bold text-center mb-4">مشروع بوابة الدفع (Stripe)</h2>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>جاري تهيئة الدفع...</p>
      )}
    </div>
  );
}

export default PaymentGatewayProject;
