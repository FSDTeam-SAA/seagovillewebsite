"use client";

import { useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function StripePayment({ clientSecret }: { clientSecret: string }) {
    const options = {
        clientSecret: clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
}

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
     const router = useRouter();

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        setLoading(true); // ⛔ Disable button

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
            redirect: "if_required",
        });

        if (result.error) {
            toast.error(result.error.message || "Payment failed");
            setLoading(false); // re-enable button
            return;
        }

        const paymentIntent = result.paymentIntent;

        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/payment/confirm-payment`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ transactionId: paymentIntent.id }),
                    }
                );

                const data = await res.json();

                if (res.ok) {
                    toast.success("Payment confirmed!");
                     router.push("/");
                } else {
                    toast.error(data.message || "Payment confirmation failed");
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to confirm");
            }
        }

        setLoading(false); // ✔ enable button again if staying on same page
    };

    return (
        <div className="p-4 border rounded-lg">
            <PaymentElement />

            <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full mt-4 text-white rounded py-2 
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
}
