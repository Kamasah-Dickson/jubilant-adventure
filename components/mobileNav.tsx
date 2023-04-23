import { useContext, Dispatch, SetStateAction } from "react";
import styles from "../styles/Home.module.scss";
import sideBarStyles from "../styles/sidebar.module.scss";
import logo from "../assets/Type=Transparent.svg";
import Image from "next/image";
import { FaStore } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosCloseCircle, IoMdCart } from "react-icons/io";
import { globalContext } from "@/context/appContext";
import { useRouter } from "next/router";
import Link from "next/link";

export type navType = {
	setIsOpenCart: Dispatch<SetStateAction<boolean>>;
	isOpenCart: boolean;
};

function MobileNav({ setIsOpenCart, isOpenCart }: navType) {
	const { showNav, setShowNav } = useContext(globalContext);
	const location = useRouter();

	return (
		<div
			style={showNav ? { translate: "0" } : { translate: " -100px" }}
			className={styles.movileNav}
		>
			<div className={sideBarStyles.topSidebar}>
				<div onClick={() => setShowNav(false)} className={sideBarStyles.close}>
					<IoIosCloseCircle size={25} />
				</div>
				<Link href="/">
					<Image
						style={{ cursor: "pointer" }}
						height={30}
						width={30}
						src={logo}
						alt=""
					/>
				</Link>
				<div
					className={
						location.pathname === "/"
							? sideBarStyles.hover
							: sideBarStyles.effects
					}
				>
					<FaStore size={25} />
				</div>
				<div
					onClick={() => setIsOpenCart((prev) => !prev)}
					className={sideBarStyles.effects}
					style={isOpenCart ? {} : { backgroundColor: "black", color: "white" }}
				>
					<IoMdCart size={25} />
					<div className={sideBarStyles.before}>4</div>
				</div>
				<div className={sideBarStyles.effects}>
					<RiShoppingBag3Fill size={25} />
				</div>
			</div>
		</div>
	);
}

export default MobileNav;
