import { LionPlayer } from 'lion-player';
import 'lion-player/dist/lion-skin.min.css';

const SOURCES = [
	// {
	// 	src: 'https://streams.bitmovin.com/conpaklsrjnnig8jbd4g/manifest.m3u8',
	// 	type: 'application/x-mpegURL',
	// },
	{
		src: 'https://766qc35g-3001.euw.devtunnels.ms/video/stream/film/1/1_480p.m3u8',
		type: 'application/x-mpegURL',
	},
];

export const VideoPlayer = () => {
	return (
		<div className="relative h-[200px] w-[400px]">
			<LionPlayer sources={SOURCES} muted />
		</div>
	);
};
