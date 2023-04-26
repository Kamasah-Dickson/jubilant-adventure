import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const searchQuery = req.query.q?.toString();

	if (!searchQuery) {
		return res.status(400).json({ error: "Please provide a search query" });
	}

	const response = await axios.get(
		`https://fakestoreapi.com/products/category/${searchQuery}`
	);

	const productResponse = response.data;
	res.status(200).json(productResponse);
}
