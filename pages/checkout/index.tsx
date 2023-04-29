import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/checkout.module.scss";
import Footer from "@/components/Footer";
import { globalContext } from "@/context/appContext";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { IoMdAlert } from "react-icons/io";

function Checkout() {
	const {
		cartProducts,
		decreaseItemCount,
		handleUpdateProductCount,
		increaseItemCount,
		productCounts,
		getTotalPrice,
	} = useContext(globalContext);
	const [showNotify, setShowNotify] = useState(true);
	const location = useRouter();

	useEffect(() => {
		if (!cartProducts.length) {
			let confirm = window.confirm(
				"Please you cannot get to the checkout page with an empty items in cart"
			);

			if (confirm) {
				location.push("/");
			} else {
				location.push("/");
			}
		}
	}, [cartProducts.length, location]);

	if (!cartProducts.length) {
		return;
	}
	return (
		<>
			<form className={styles.wrapper}>
				<Header title="Let's Checkout" />
				<p
					className={styles.alert}
					style={showNotify ? { display: "flex" } : { display: "none" }}
				>
					<div className={styles.notify}>
						<IoMdAlert color="crimson" size={30} /> Please inspect your products
						one more time before proceeding
					</div>
					<span onClick={() => setShowNotify(false)} className={styles.okay}>
						Okay
					</span>
				</p>

				{cartProducts.length > 0 && (
					<p className={styles.totalPice} style={{ color: "var(--black)" }}>
						Total Price:
						<span
							style={{
								fontWeight: 700,
								fontSize: "1.2rem",
							}}
						>
							${getTotalPrice()}
						</span>
					</p>
				)}
				{cartProducts.map((product) => {
					return (
						<>
							<div className={styles.singleCard}>
								<div className={styles.cardImage}>
									<Image
										priority
										src={product.image}
										width={350}
										height={350}
										alt=""
									/>
								</div>
								<div className={styles.productDescriptions}>
									<div>
										<p className={styles.title}>{product.title}</p>
										<p className={styles.subtitle}>{product.description}</p>
									</div>
									<div className={styles.price}>
										<p>${product.price}</p>
										<p className={styles.quantity}>
											Quantity ~{productCounts[product.id]}
										</p>
									</div>

									{/* //checkout */}
									<div className={styles.inputAndButtons}>
										<button
											type="button"
											disabled={productCounts[product.id] == 0}
											onClick={() => decreaseItemCount(product)}
											className={styles.minusButton}
										>
											-
										</button>
										<input
											className={styles.priceInput}
											value={productCounts[product.id] || 0}
											onChange={(e) =>
												handleUpdateProductCount(
													Number(e.target.value),
													product
												)
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
						</>
					);
				})}

				<button
					onClick={() => window.alert("Page under construction")}
					type="button"
					role="link"
					className={styles.proceed}
				>
					{`Let's Checkout`}
				</button>

				<Footer />
			</form>
		</>
	);
}

export default Checkout;
