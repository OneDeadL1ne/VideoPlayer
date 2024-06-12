import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaPlayerInstance, MediaPlayerQuery, MediaProvider } from '@vidstack/react';
import { useCallback, useEffect, useRef } from 'react';
import {
	DefaultAudioLayout,
	DefaultVideoLayout,
	defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
export const VideoPlayer = ({
	src,
	play = false,
}: {
	src: string;
	preview?: string;
	play?: boolean;
}) => {
	const player = useRef<MediaPlayerInstance>(null);

	useEffect(() => {
		let time;
		if (play) {
			time = setTimeout(() => {
				player.current?.provider?.play();
			}, 2000);
		}
		if (!play) {
			player.current?.provider?.pause();
			player.current?.provider?.setCurrentTime(0);
			return clearTimeout(time);
		}
	}, [play]);

	const smallAudioLayoutQuery = useCallback<MediaPlayerQuery>(({ width }) => {
		return width < 576;
	}, []);

	const smallVideoLayoutQuery = useCallback<MediaPlayerQuery>(({ width, height }) => {
		return width < 576 || height < 380;
	}, []);

	return (
		<div className="	">
			<MediaPlayer
				className={`h-[600px] `}
				viewType="video"
				preferNativeHLS={true}
				streamType="on-demand"
				logLevel="warn"
				crossOrigin
				playsInline
				ref={player}
				src={src}
				volume={play ? 0.3 : 0.0}
			>
				<MediaProvider>
					{/* {preview && (
						<Poster
							className="absolute inset-0 block h-full w-full  rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
							src={preview}
							alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
						/>
					)} */}
				</MediaProvider>

				{/* Layouts */}
				<DefaultAudioLayout
					icons={defaultLayoutIcons}
					colorScheme="system"
					smallLayoutWhen={smallAudioLayoutQuery}
				/>
				<DefaultVideoLayout
					icons={defaultLayoutIcons}
					colorScheme="system"
					smallLayoutWhen={smallVideoLayoutQuery}
				/>
			</MediaPlayer>
		</div>
	);
};
