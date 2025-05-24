// app/api/payment/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { reservationProps } from "@/types/reservation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: Request) => {
  const reservation: reservationProps = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd", // Adjust currency as needed
            product_data: {
              name: `Reservation #${reservation.id}`,
              description: `Reserved by ${reservation.User.name}`,
            },
            unit_amount: reservation.Payment.amount * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      customer_email: reservation.User.email,
      metadata: {
        reservationId: reservation.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Session Error:", error);
    return NextResponse.json(
      { error: "Unable to create Stripe Checkout session." },
      { status: 500 }
    );
  }
};
