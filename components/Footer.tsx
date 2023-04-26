function Footer() {
	let year = new Date().getFullYear();
	return (
		<footer>
			<p
				style={{
					fontSize: "14px",
				}}
			>
				Created by Kamasah Dickson with 💖
			</p>
			<div></div>
			<div>
				<p>&copy; {year} All rights reserved</p>
			</div>
		</footer>
	);
}

export default Footer;
