import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// Stripe needs the raw body, not parsed JSON
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text(); // must use raw body
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle only the events you care about
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const reservationId = session.metadata?.reservationId;

    if (!reservationId) {
      return NextResponse.json(
        { error: "Missing reservationId" },
        { status: 400 }
      );
    }

    try {
      const transaction = await prisma.payment.update({
        where: { reservationId },
        data: {
          status: "paid",
          method: "card",
        },
      });

      return NextResponse.json({ message: "Payment updated", transaction });
    } catch (error) {
      console.error("Failed to update payment:", error);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
