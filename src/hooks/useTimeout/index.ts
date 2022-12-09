import { useEffect, useState } from "react";

const useTimeout = (min: number | undefined = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_TIMEOUT : 0) => {
	const [finished, setFinished] = useState<boolean>(false);
	const [hasData, setHasData] = useState<boolean | undefined>(undefined);
	const [count, setCount] = useState<number>(1);

	const start = () => {
		setHasData(false);
	};

	const stop = () => {
		setHasData(undefined);
		setFinished(true);
	};

	useEffect(() => {
		if (typeof hasData != "undefined") {
			const counter = setInterval(() => {
				setCount(state => state + 1);
			}, 900);
			if(typeof min != "undefined" && count < min) {
				console.log(`Timeout: ${count}seg`);
				return () => clearInterval(counter);
			} else if (hasData) {
				console.log('Timeout finished.');
				stop();
				return () => clearInterval(counter);
			}
		}
	}, [hasData, count]);

	return {
		count,
		start,
		stop,
		finished,
		min
	};
};

export { useTimeout };
