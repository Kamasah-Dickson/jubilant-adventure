import { useContext } from "react";
import styles from "../styles/Home.module.scss";
import sideBarStyles from "../styles/sidebar.module.scss";
import logo from "../assets/Type=Transparent.svg";
import Image from "next/image";
import { FaStore } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { navType } from "./mobileNav";
import { globalContext } from "@/context/appContext";

function Sidebar({ setIsOpenCart, isOpenCart }: navType) {
	const location = useRouter();
	const { cartProducts } = useContext(globalContext);

	return (
		<div className={styles.sidebar}>
			<div className={sideBarStyles.topSidebar}>
				<Link href="/">
					<Image
						style={{ cursor: "pointer", marginBottom: "1rem" }}
						height={30}
						width={40}
						src={logo}
						alt=""
					/>
				</Link>
				<Link
					href="/"
					className={
						location.pathname === "/"
							? sideBarStyles.hover
							: sideBarStyles.effects
					}
				>
					<FaStore size={25} />
				</Link>
				<div
					onClick={() => setIsOpenCart((prev) => !prev)}
					className={sideBarStyles.effects}
					style={isOpenCart ? {} : { backgroundColor: "black", color: "white" }}
				>
					<IoMdCart size={25} />
					<div className={sideBarStyles.before}>{cartProducts.length}</div>
				</div>
				<div className={sideBarStyles.effects}>
					<RiShoppingBag3Fill size={25} />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
