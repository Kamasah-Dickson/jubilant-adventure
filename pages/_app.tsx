import { useState } from "react";
import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "typeface-roboto";
import styles from "@/styles/Home.module.scss";
import type { AppProps } from "next/app";
import Sidebar from "@/components/Sidebar";
import AppContext from "@/context/appContext";
import MobileNav from "@/components/mobileNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import NextNProgress from "nextjs-progressbar";
import Cart from "@/components/Cart";

function App({ Component, pageProps }: AppProps) {
	const isSmall = useMediaQuery("(max-width:768px)");
	const [isOpenCart, setIsOpenCart] = useState(true);

	return (
		<AppContext>
			<>
				<div className={styles.dashboard}>
					{isSmall ? (
						<MobileNav setIsOpenCart={setIsOpenCart} isOpenCart={isOpenCart} />
					) : (
						<Sidebar setIsOpenCart={setIsOpenCart} isOpenCart={isOpenCart} />
					)}
					<main className={styles.main}>
						<Layout>
							<Component {...pageProps} />
							<NextNProgress color="#583cd8" height={5} />
						</Layout>
					</main>
					<Cart isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} />
				</div>
			</>
		</AppContext>
	);
}
export default App;
