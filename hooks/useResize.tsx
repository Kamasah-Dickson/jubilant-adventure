import { useState, useEffect } from "react";

function useResize(stringSize: string) {
	const [size, setSize] = useState(window.matchMedia(stringSize));

	function handleResize() {
		if (size) {
			return true;
		} else {
			return false;
		}
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
}

export default useResize;
