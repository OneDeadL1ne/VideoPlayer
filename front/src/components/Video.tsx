import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
	DefaultAudioLayout,
	DefaultVideoLayout,
	defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import { MediaPlayer, MediaPlayerInstance, MediaPlayerQuery, MediaProvider } from '@vidstack/react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
		if (play) {
			player.current?.provider?.play();
		}
		if (!play) {
			player.current?.provider?.pause();
			player.current?.provider?.setCurrentTime(0);
		}
	}, [play]);
	useEffect(() => {
		console.log(src);
	}, []);

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
				preferNativeHLS={true}
				streamType="on-demand"
				logLevel="silent"
				crossOrigin
				playsInline
				ref={player}
				src={src}
				volume={0.3}
			>
				<MediaProvider />

				{/* Layouts */}
				<DefaultAudioLayout icons={defaultLayoutIcons} colorScheme="system" />
				<DefaultVideoLayout icons={defaultLayoutIcons} colorScheme="system" />
			</MediaPlayer>
		</div>
	);
};
