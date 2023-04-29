import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/singleProduct.module.scss";
import { BsFillBagPlusFill } from "react-icons/bs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { globalContext } from "@/context/appContext";
import { CartType } from "@/context/globlaTypes";

function SingleProductPage() {
	const { query } = useRouter();
	const { productCounts, addItemToCart, products } = useContext(globalContext);
	const count = productCounts[String(query.id)] || 0;

	let thisProductDetails: CartType = {
		id: Number(query.id),
		image: query?.image,
		price: Number(query.price),
		title: String(query.title),
		description: String(query.description),
	};

	let index = products.findIndex((product) => product.id == query.id);

	return (
		<>
			<Header title={String(query.title)} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					height: "100%",
				}}
			>
				<div className={styles.mainContainer}>
					<div className={styles.singleCard}>
						<div className={styles.cardImage}>
							<Image
								src={products[index].image}
								priority
								width={350}
								height={350}
								alt=""
							/>
						</div>
						<div className={styles.productDescriptions}>
							<div>
								<p className={styles.title}>
									{thisProductDetails.title.slice(0, 40) + "..."}
								</p>
								<p className={styles.subtitle}></p>
							</div>
							<div className={styles.price}>
								<p>${query.price}</p>
								<div
									onClick={() => addItemToCart(thisProductDetails)}
									className={styles.addTocart}
								>
									<BsFillBagPlusFill size={20} className={styles.icon2} />
									{count > 0 && <div className={styles.before}>{count}</div>}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.description}>
						<p>{thisProductDetails.description}</p>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}

export default SingleProductPage;
