"use client";

import { useEffect } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

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

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        // Stripe confirmPayment returns either error or paymentIntent
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
            redirect: "if_required", // stay in SPA if possible
        });

        if (result.error) {
            toast.error(result.error.message || "Payment failed");
            return;
        }

        // TypeScript-safe access to paymentIntent
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
                    toast.success("Payment confirmed and order finalized!");
                } else {
                    toast.error(data.message || "Something went wrong confirming payment");
                }
            } catch (error) {
                if (error instanceof Error) {

                    toast.error(error.message || "Failed to confirm payment");
                }
            }
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <PaymentElement />

            <button
                onClick={handlePayment}
                className="w-full mt-4 bg-red-500 cursor-pointer text-white rounded py-2"
            >
                Pay Now
            </button>
        </div>
    );
}
