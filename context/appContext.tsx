import { commerce } from "@/Data";
import { useState, ReactNode, createContext } from "react";
import { CartType, globalContextProp } from "./globlaTypes";

interface childrenProp {
	children: ReactNode;
}

export const globalContext = createContext<globalContextProp>({
	showNav: true,
	setShowNav: () => {},
	setProducts: () => {},
	products: commerce,
	setCartProducts: () => {},
	cartProducts: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	setProductCounts: () => {},
	productCounts: {},
	handleUpdateProductCount: (number) => number,
	increaseItemCount: (number) => number,
	decreaseItemCount: (number) => number,
});

function AppContext({ children }: childrenProp) {
	const [showNav, setShowNav] = useState(false);
	const [products, setProducts] = useState<CartType[]>(commerce);
	const [cartProducts, setCartProducts] = useState<CartType[]>([]);
	const [productCounts, setProductCounts] = useState<Record<string, number>>(
		{}
	);

	function addItemToCart(newProduct: CartType) {
		const ItemAlreadyExist = cartProducts.findIndex(
			(product) => product.id === newProduct.id
		);

		const newProductCount = productCounts[newProduct.id] || 0;

		const newItem = {
			id: newProduct.id,
			title: newProduct.title,
			price: newProduct.price,
			image: newProduct.image,
			numberOfItems: newProductCount + 1,
		};
		if (ItemAlreadyExist === -1) {
			setCartProducts((prev) => [newItem, ...prev]);
			setProductCounts((prev) => ({
				...prev,
				[newItem.id]: newProductCount + 1,
			}));
		} else {
			setCartProducts((prev) =>
				prev.map((product, index) =>
					index === ItemAlreadyExist
						? { ...product, numberOfItems: newItem.numberOfItems + 1 }
						: product
				)
			);
			setProductCounts((prev) => ({
				...prev,
				[newProduct.id]: newProductCount + 1,
			}));
		}
	}

	function removeItemFromCart(newProduct: CartType) {
		setCartProducts(
			cartProducts.filter((product) => product.id !== newProduct.id)
		);
		setProductCounts((prev) => ({
			...prev,
			[newProduct.id]: 0,
		}));
	}

	function handleUpdateProductCount(currentValue: number, product: CartType) {
		setProductCounts((prev) => ({
			...prev,
			[product.id]: currentValue,
		}));
	}

	function increaseItemCount(product: CartType) {
		setProductCounts((prev) => ({
			...prev,
			[product.id]: prev[product.id] + 1,
		}));
	}
	function decreaseItemCount(product: CartType) {
		setProductCounts((prev) => ({
			...prev,
			[product.id]: prev[product.id] - 1,
		}));
		if (productCounts[product.id] < 2) {
			removeItemFromCart(product);
		}
	}

	return (
		<globalContext.Provider
			value={{
				products,
				addItemToCart,
				setCartProducts,
				cartProducts,
				setProducts,
				showNav,
				setShowNav,
				removeItemFromCart,
				setProductCounts,
				productCounts,
				handleUpdateProductCount,
				increaseItemCount,
				decreaseItemCount,
			}}
		>
			{children}
		</globalContext.Provider>
	);
}

export default AppContext;
