//import 'lion-player/dist/lion-skin.min.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
//import '@vidstack/react/player/styles/base.css';
const SOURCES = [
	{
		src: 'http://localhost:3001/video/stream/film/1/1_1080p.m3u8',
		type: 'application/x-mpegURL',
		width: 1920,
		height: 1080,
	},
	{
		src: 'http://localhost:3001/video/stream/film/1/1_720p.m3u8',
		type: 'application/x-mpegURL',
		width: 1280,
		height: 720,
	},
	{
		src: 'http://localhost:3001/video/stream/film/1/1_480p.m3u8',
		type: 'application/x-mpegURL',
		width: 853,
		height: 480,
	},
];

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
	DefaultAudioLayout,
	DefaultVideoLayout,
	defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

export const VideoPlayer = () => {
	return (
		<div className="h-[300px] 	">
			{/* <LionPlayer sources={SOURCES} muted /> */}

			<MediaPlayer
				className=""
				keyTarget="document"
				load="visible"
				title=""
				viewType="video"
				src={'http://localhost:3001/video/stream/film/1/1_360p.m3u8'}
				crossOrigin
			>
				<MediaProvider></MediaProvider>

				{/* Layouts */}

				<DefaultAudioLayout icons={defaultLayoutIcons} colorScheme="system" />
				<DefaultVideoLayout icons={defaultLayoutIcons} colorScheme="system" />
			</MediaPlayer>
		</div>
	);
};
