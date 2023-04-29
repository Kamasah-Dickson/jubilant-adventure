import { useContext } from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.scss";
import { IoIosCloseCircle } from "react-icons/io";
import { globalContext } from "@/context/appContext";
import { CartType } from "@/context/globlaTypes";

interface IProduct {
	product: CartType;
	key: string;
}

export default function Cartproducts({ product }: IProduct) {
	const {
		removeItemFromCart,
		productCounts,
		handleUpdateProductCount,
		increaseItemCount,
		decreaseItemCount,
		getTotalPrice,
	} = useContext(globalContext);

	const count = productCounts[product.id] || 0;
	return (
		<div className={styles.cartCard}>
			<div className={styles.close} onClick={() => removeItemFromCart(product)}>
				<IoIosCloseCircle size={30} />
			</div>
			<div className={styles.CartCardStyle}>
				<Image priority src={product?.image} width={200} height={250} alt="" />
			</div>
			<div style={{ marginBottom: "1rem" }}>
				<p className={styles.title}>{product?.title}</p>
				<p className={styles.subtitle}>{product?.description?.slice(0, 55)}</p>
				<p className={styles.price}>${product.price}</p>
				<div className={styles.inputAndButtons}>
					<button
						type="button"
						disabled={count === 0}
						onClick={() => decreaseItemCount(product)}
						className={styles.minusButton}
					>
						-
					</button>
					<input
						className={styles.priceInput}
						value={count}
						onChange={(e) =>
							handleUpdateProductCount(Number(e.target.value), product)
						}
						type="number"
					/>
					<button
						type="button"
						onClick={() => increaseItemCount(product)}
						className={styles.plusButton}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
}
