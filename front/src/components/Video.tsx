import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster } from '@vidstack/react';
import { useEffect, useRef, useState } from 'react';

export const VideoPlayer = ({
	src,
	preview,
	play,
}: {
	src: string;
	preview?: string;
	play?: boolean;
}) => {
	const player = useRef<MediaPlayerInstance>(null);
	const [currentTime, setCurrentTime] = useState(0);
	useEffect(() => {
		console.log(play, player.current?.paused);

		if (play && player.current?.paused) {
			//setTimeout(() => player.current?.play(), 1000);
			player.current?.play();
		}
		if (!play && !player.current?.paused) {
			player.current?.pause();

			rewindToStart();
		}
	}, [play]);

	const rewindToStart = () => {
		setCurrentTime(0);
	};

	const handleTimeUpdate = (time) => {
		setCurrentTime(time);
	};

	// const smallAudioLayoutQuery = useCallback<MediaPlayerQuery>(({ width }) => {
	// 	return width < 576;
	// }, []);

	// const smallVideoLayoutQuery = useCallback<MediaPlayerQuery>(({ width, height }) => {
	// 	return width < 576 || height < 380;
	// }, []);

	return (
		<div className="	">
			{!play && (
				<img
					src={preview}
					alt={'1'}
					className={`h-full object-cover rounded-lg duration-200 
					`}
				/>
			)}
			<MediaPlayer
				className={`h-full rounded-lg ${!play && ' hidden'}`}
				viewType="video"
				streamType="on-demand"
				logLevel="warn"
				onTimeUpdate={handleTimeUpdate}
				currentTime={currentTime}
				crossOrigin
				playsInline
				ref={player}
				src={src}
				volume={0.3}
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
				{/* <DefaultAudioLayout
					icons={defaultLayoutIcons}
					colorScheme="system"
					smallLayoutWhen={smallAudioLayoutQuery}
				/>
				<DefaultVideoLayout
					icons={defaultLayoutIcons}
					colorScheme="system"
					smallLayoutWhen={smallVideoLayoutQuery}
				/> */}
			</MediaPlayer>
		</div>
	);
};
