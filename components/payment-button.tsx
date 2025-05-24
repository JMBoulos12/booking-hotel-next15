"use client";

import { useTransition } from "react";
import { reservationProps } from "@/types/reservation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentButton = ({ reservation }: { reservation: reservationProps }) => {
  const [isPending, startTransition] = useTransition();

  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });

        const { sessionId } = await response.json();

        const stripe = await stripePromise;
        if (stripe && sessionId) {
          await stripe.redirectToCheckout({ sessionId });
        } else {
          console.error("Stripe not initialized or sessionId missing");
        }
      } catch (error) {
        console.error("Payment Error:", error);
      }
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer"
      disabled={isPending}
    >
      {isPending ? "Processing..." : "Process Payment"}
    </button>
  );
};

export default PaymentButton;
