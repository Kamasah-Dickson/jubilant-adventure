import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { BsFillBagPlusFill } from "react-icons/bs";
import { CartType } from "@/context/globlaTypes";

interface IProduct {
	product: CartType;
	productCounts: Record<string, number>;
	addItemToCart: (newProduct: CartType) => void;
}

function SingleItem({ product, productCounts, addItemToCart }: IProduct) {
	const count = productCounts[product.id] || 0;

	return (
		<div className={styles.singleCard}>
			<div className={styles.singleCardStyle}>
				<Image src={product.image} width={350} height={350} alt="" />
			</div>
			<div
				style={{
					padding: "2rem",
					width: "100%",
				}}
			>
				<p
					style={{
						marginBottom: ".4rem",
						fontWeight: "700",
						fontSize: "1.2rem",
					}}
				>
					Macbook pro 16
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
