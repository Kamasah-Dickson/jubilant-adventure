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
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function Sidebar({ setIsOpenCart, isOpenCart }: navType) {
	const location = useRouter();
	const { cartProducts, setDarkmode, darkmode } = useContext(globalContext);

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
					<FaStore size={25} className={sideBarStyles.icon} />
				</Link>
				<div
					onClick={() => setIsOpenCart((prev) => !prev)}
					className={isOpenCart ? sideBarStyles.effects : sideBarStyles.hover2}
				>
					<IoMdCart size={25} className={sideBarStyles.icon} />
					<div className={sideBarStyles.before}>{cartProducts.length}</div>
				</div>
				<Link href="/checkout" className={sideBarStyles.effects}>
					<RiShoppingBag3Fill size={25} className={sideBarStyles.icon} />
				</Link>

				<div
					onClick={() => setDarkmode((prev) => !prev)}
					className={sideBarStyles.icon}
				>
					{darkmode ? (
						<MdOutlineLightMode color="white" size={25} cursor={"pointer"} />
					) : (
						<MdDarkMode size={25} cursor={"pointer"} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
