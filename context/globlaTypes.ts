import { Dispatch, SetStateAction } from "react";

export type CartType = {
	id: number | string;
	title: string;
	price: number;
	image: string | any;
	description: string;
	numberOfItems?: number;
};

export type productCounts = {
	[x: number]: number;
}[];
export interface globalContextProp {
	showNav: boolean;
	darkmode: boolean;
	setShowNav: Dispatch<SetStateAction<boolean>>;
	getTotalPrice(): number;
	setProducts: Dispatch<SetStateAction<CartType[]>>;
	products: CartType[];

	setCartProducts: Dispatch<SetStateAction<CartType[]>>;
	cartProducts: [] | CartType[];
	setProductCounts: Dispatch<SetStateAction<Record<string, number>>>;
	setDarkmode: Dispatch<SetStateAction<boolean>>;
	productCounts: Record<string, number>;
	addItemToCart(newProduct: CartType): void;
	removeItemFromCart(newProduct: CartType): void;
	handleUpdateProductCount(previousValue: number, product: CartType): void;
	increaseItemCount(product: CartType): void;
	decreaseItemCount(product: CartType): void;
}
