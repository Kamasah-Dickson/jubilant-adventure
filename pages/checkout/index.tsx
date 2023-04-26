import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/checkout.module.scss";
import Footer from "@/components/Footer";
import { globalContext } from "@/context/appContext";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { IoMdAlert } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function Checkout() {
	const {
		cartProducts,
		decreaseItemCount,
		handleUpdateProductCount,
		increaseItemCount,
		productCounts,
	} = useContext(globalContext);
	const [showNotify, setShowNotify] = useState(true);
	const location = useRouter();

	const StripeCheckout = async () => {
		try {
			const lineItems = cartProducts.map((product) => ({
				price: product.id,
				quantity: product.numberOfItems,
			}));

			const data = await fetch("api/checkout-session", {
				method: "POST",
				headers: {
					"Context-Type": "application/json",
				},
				body: JSON.stringify({ lineItems }),
			});

			const response = await data.json();

			console.log(response);
		} catch (error: any) {
			console.log(error.message);
		}
	};

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
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get("success")) {
			console.log("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			console.log(
				"Order canceled -- continue to shop around and checkout when you’re ready."
			);
		}
	}, [cartProducts.length, location]);

	if (!cartProducts.length) {
		return;
	}
	return (
		<>
			<form
				action="/api/checkout-session"
				method="POST"
				className={styles.wrapper}
			>
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
				{cartProducts.map((product) => {
					return (
						<>
							<div className={styles.singleCard}>
								<div className={styles.cardImage}>
									<Image src={product.image} width={350} height={350} alt="" />
								</div>
								<div className={styles.productDescriptions}>
									<div>
										<p className={styles.title}>{product.title}</p>
										<p className={styles.subtitle}>Silve-M1 Pro</p>
									</div>
									<div className={styles.price}>
										<p>{product.price}</p>
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

				{/* <Link hre> */}

				<button
					onSubmit={StripeCheckout}
					type="submit"
					role="link"
					className={styles.proceed}
				>
					{`Let's Checkout`}
				</button>

				{/* </Link> */}

				<Footer />
			</form>
		</>
	);
}

export default Checkout;
