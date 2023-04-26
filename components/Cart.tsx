import { useContext, Dispatch, SetStateAction } from "react";
import Cartproducts from "@/components/SingleCartproduct";
import { IoIosCloseCircle } from "react-icons/io";
import cartStyles from "@/styles/Cart.module.scss";
import styles from "@/styles/Home.module.scss";
import { globalContext } from "@/context/appContext";
import { navType } from "./mobileNav";
import Link from "next/link";

interface Icart {
	isOpenCart: boolean;
	setIsOpenCart: Dispatch<SetStateAction<boolean>>;
}

function Cart({ setIsOpenCart, isOpenCart }: Icart) {
	const { cartProducts, setCartProducts, setProductCounts } =
		useContext(globalContext);

	function handleRemove() {
		const confirm = window.confirm("Do you want to remove all your Products");
		if (confirm) {
			setCartProducts([]);
			setProductCounts({});
		}
	}

	return (
		<div
			className={styles.cart}
			style={isOpenCart ? { display: "none" } : { display: "block" }}
		>
			<div className={styles.closeCartContainer}>
				<h2 className={styles.title}>Your Cart</h2>
				<div onClick={() => setIsOpenCart(true)} className={styles.closeCart}>
					<IoIosCloseCircle color="crimson" size={40} />
				</div>
			</div>
			{cartProducts.length === 0 ? (
				<p
					style={{
						textAlign: "center",
						display: "grid",
						placeContent: "center",
						height: "100%",
						fontSize: "1.5rem",
						color: "var(--black)",
					}}
				>
					Your cart is empty🙁
				</p>
			) : (
				<>
					<div className={cartStyles.cartItems}>
						{cartProducts?.map((data) => {
							return (
								<Cartproducts key={data.image + Math.random()} product={data} />
							);
						})}
					</div>
					<div className={styles.btns}>
						<Link href="/checkout">
							<button type="button" className={styles.checkoutBtn}>
								Checkout
							</button>
						</Link>
						<button
							type="button"
							onClick={handleRemove}
							className={styles.removeAll}
						>
							Remove All
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Cart;
