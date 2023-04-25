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
				<Image src={product.image} width={350} height={350} alt="" />
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
							image: product.image.src,
							title: product.title,
						},
					}}
					as={`product/${product.id}`}
				>
					<p
						style={{
							marginBottom: ".4rem",
							fontWeight: "700",
							fontSize: "1.2rem",
						}}
					>
						{product.title}
					</p>
					<p
						style={{
							fontWeight: "400",
							color: "grey",
							fontSize: "13px",
							marginBottom: ".5rem",
						}}
					>
						Silve-M1 Pro
					</p>
				</Link>
				<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
					<p>{product.price}</p>
					<div
						onClick={() => addItemToCart(product)}
						className={styles.addTocart}
					>
						<BsFillBagPlusFill size={15} color="white" />
						{count > 0 && <div className={styles.before}>{count}</div>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleItem;
