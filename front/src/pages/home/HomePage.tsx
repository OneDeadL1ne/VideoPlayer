import { SelectDemo } from "@/components/Select";
import { useEffect, useReducer, useState } from "react";

export default function HomePage() {
	document.title = "Видео плеер";
	const [settings, setSettings] = useState("3");

	const [_, forceUpdate] = useReducer(
		(x) => `http://localhost:3002/trailer/stream/${settings}`,
		`http://localhost:3002/trailer/stream/${settings}`
	);
	useEffect(() => {
		forceUpdate();
	}, [settings]);
	return (
		<div className="h-screen flex justify-center items-center ">
			<div className="relative">
				<video className="h-[700px]" controls muted autoPlay>
					<source src={_} />
				</video>
			</div>
			<div className="w-full  top-5 flex items-center justify-center"></div>
			<SelectDemo value={settings} setValue={setSettings} />
		</div>
	);
}
