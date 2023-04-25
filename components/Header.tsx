import { globalContext } from "@/context/appContext";
import { useContext } from "react";
import { RiMenu4Line } from "react-icons/ri";
import sideBarStyles from "../styles/sidebar.module.scss";

type Ititle = {
	title: string;
};
function Header({ title }: Ititle) {
	const { setShowNav } = useContext(globalContext);
	return (
		<div
			onClick={() => setShowNav(true)}
			className={sideBarStyles.hamburgerAndtitle}
		>
			<div className={sideBarStyles.hamburger}>
				<RiMenu4Line size={25} />
			</div>
			<h1>{title}</h1>
		</div>
	);
}

export default Header;
