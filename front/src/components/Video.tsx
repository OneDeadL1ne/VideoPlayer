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
import { cn } from '@/lib/utils';

export const VideoPlayer = ({
	src,
	play = true,
	className,
	classNameVideo,
}: {
	src: string;
	classNameVideo?: string;
	className?: string;

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
		<div className={cn('@container	', className)}>
			<MediaPlayer
				className={cn(` `, classNameVideo)}
				viewType="video"
				//preferNativeHLS={true}
				//streamType="on-demand"
				logLevel="warn"
				crossOrigin
				playsInline
				ref={player}
				src={src}
				volume={play ? 0.3 : 0.0}
			>
				<MediaProvider />

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
