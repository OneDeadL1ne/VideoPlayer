import { LionPlayer } from 'lion-player';
import 'lion-player/dist/lion-skin.min.css';

const SOURCES = [
	{
		src: 'http://localhost:3001/video/stream/trailer/1/1.m3u8',
		type: 'application/x-mpegURL',
	},
	// {
	// 	src: "https://766qc35g-3002.euw.devtunnels.ms/trailer/stream/3.m3u8",
	// 	type: "application/x-mpegURL",
	// },
];

export const VideoPlayer = () => {
	return (
		<div className="relative h-[200px] w-[400px]">
			<LionPlayer disablePictureInPicture sources={SOURCES} autoplay muted bigPlayButton />
		</div>
	);
};
