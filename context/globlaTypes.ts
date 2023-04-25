import { Dispatch, SetStateAction } from "react";

export type CartType = {
	id: number;
	title: string;
	price: string;
	image: string | any;
	description?: string;
	numberOfItems?: number;
};

export type productCounts = {
	[x: number]: number;
}[];
export interface globalContextProp {
	showNav: boolean;
	setShowNav: Dispatch<SetStateAction<boolean>>;
	setProducts: Dispatch<
		SetStateAction<
			{
				image: any;
				id: number;
				price: string;
				title: string;
			}[]
		>
	>;
	products: {
		image: string;
		id: number;
		price: string;
		title: string;
	}[];

	setCartProducts: Dispatch<SetStateAction<CartType[]>>;
	cartProducts: [] | CartType[];
	setProductCounts: Dispatch<SetStateAction<Record<string, number>>>;
	productCounts: Record<string, number>;
	addItemToCart(newProduct: CartType): void;
	removeItemFromCart(newProduct: CartType): void;
	handleUpdateProductCount(previousValue: number, product: CartType): void;
	increaseItemCount(product: CartType): void;
	decreaseItemCount(product: CartType): void;
}
