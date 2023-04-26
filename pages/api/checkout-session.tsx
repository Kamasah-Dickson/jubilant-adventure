import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { CartType } from "@/context/globlaTypes";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { lineItems } = req.body;

			if (!lineItems) {
				return res.status(404).json({ error: "Bad request" });
			}

			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: lineItems,
				mode: "payment",
				success_url: `${req.headers.origin}/?success=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			});
			res.redirect(303, session.url);
		} catch (err: any) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
