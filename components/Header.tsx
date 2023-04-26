import { globalContext } from "@/context/appContext";
import { useContext, Dispatch, useEffect, SetStateAction } from "react";
import { RiMenu4Line } from "react-icons/ri";
import sideBarStyles from "../styles/sidebar.module.scss";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

type Ititle = {
	title: string;
};

function Header({ title }: Ititle) {
	const { setShowNav, setDarkmode, darkmode } = useContext(globalContext);

	useEffect(() => {
		if (darkmode) {
			document.body.classList.remove("light-mode");
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
			document.body.classList.add("light-mode");
		}
	}, [darkmode]);

	return (
		<div className={sideBarStyles.hamburgerAndtitle}>
			<div onClick={() => setShowNav(true)} className={sideBarStyles.hamburger}>
				<RiMenu4Line size={25} />
			</div>
			<div className={sideBarStyles.titleFlex}>
				<h1>{title}</h1>
				<div
					onClick={() => setDarkmode((prev) => !prev)}
					className={sideBarStyles.icon}
				>
					{darkmode ? <MdOutlineLightMode color="white" /> : <MdDarkMode />}
				</div>
			</div>
		</div>
	);
}

export default Header;
