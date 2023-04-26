import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { BsFillBagPlusFill } from "react-icons/bs";
import { CartType } from "@/context/globlaTypes";
import Link from "next/link";

interface IProduct {
	product: CartType;
	productCounts: Record<string, number>;
	addItemToCart: (newProduct: CartType) => void;
}

function SingleItem({ product, productCounts, addItemToCart }: IProduct) {
	const count = productCounts[product.id] || 0;

	return (
		<div className={styles.singleCard}>
			<Link
				href={{
					pathname: `product/${product.id}`,
					query: {
						image: product.image.src,
						id: product.id,
						price: product.price,
						description: product.description,
						numberOfItems: product.numberOfItems,
						title: product.title,
					},
				}}
				as={`product/${product.id}`}
				className={styles.singleCardStyle}
			>
				<div
					style={{
						width: "300px",
						height: "300px",
						borderRadius: "20px",
					}}
				>
					<Image priority src={product.image} width={300} height={300} alt="" />
				</div>
			</Link>
			<div
				style={{
					padding: "2rem",
					width: "100%",
				}}
			>
				<Link
					href={{
						pathname: `product/${product.id}`,
						query: {
							id: product.id,
							price: product.price,
							description: product.description,
							numberOfItems: product.numberOfItems,
							image: product.image,
							title: product.title,
						},
					}}
					as={`product/${product.id}`}
				>
					<p className={styles.title}>{product.title}</p>
					<p
						style={{
							fontWeight: "400",
							color: "grey",
							fontSize: "13px",
							marginBottom: ".5rem",
						}}
					>
						{/* Silve-M1 Pro */}
						{product.description.slice(0, 30) + "..."}
					</p>
				</Link>
				<div className={styles.price}>
					<p>${product.price}</p>
					<div
						onClick={() => addItemToCart(product)}
						className={styles.addTocart}
					>
						<BsFillBagPlusFill size={20} className={styles.icon2} />
						{count > 0 && <div className={styles.before}>{count}</div>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleItem;
