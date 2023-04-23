import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		if (mediaQuery.matches !== matches) {
			setMatches(mediaQuery.matches);
		}
		const listener = () => setMatches(mediaQuery.matches);

		window.addEventListener("resize", listener);
		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [query, matches]);

	return matches;
}

export default useMediaQuery;
