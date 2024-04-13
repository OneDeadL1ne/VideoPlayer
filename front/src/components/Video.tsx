import { LionPlayer } from "lion-player";
import "lion-player/dist/lion-skin.min.css";

const SOURCES = [
	{
		src: "http://localhost:3002/trailer/stream/3.m3u8",
		type: "application/x-mpegURL",
	},
	// {
	// 	src: "https://766qc35g-3002.euw.devtunnels.ms/trailer/stream/3.m3u8",
	// 	type: "application/x-mpegURL",
	// },
];

export const VideoPlayer = () => {
	return (
		<div className="relative h-[200px] w-[400px]">
			<LionPlayer
				tracks={[{}]}
				disablePictureInPicture
				sources={SOURCES}
				autoplay
				muted
				bigPlayButton
			/>
		</div>
	);
};
