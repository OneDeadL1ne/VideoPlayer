import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Plyr, { Options } from 'plyr';
import 'plyr/dist/plyr.css';

type IProps = {
	selectorId: string;
	videoSource: string;
	hlsSource?: string;
	poster?: string;
	autoPlay?: boolean;
};

const plyrOptions: Plyr.Options = {
	ratio: '16:9',
	autopause: true,
	keyboard: { global: true },
	i18n: {
		qualityLabel: {
			0: '360p',
		},
	},
};

const VideoPlayer = ({ selectorId, videoSource, hlsSource, poster, autoPlay = false }: IProps) => {
	const video = useRef<HTMLMediaElement | null>(null);
	const [supported] = useState(Hls.isSupported());
	const hls = useRef<Hls | null>(null);
	const player = useRef<Plyr | null>(null);

	useEffect(() => {
		console.log('initialized');
		video.current = document.getElementById(selectorId) as HTMLMediaElement;

		if (poster) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			video.current.poster = poster;
		}

		if (!supported || !hlsSource) {
			video.current.src = videoSource;
			player.current = new Plyr(video.current, plyrOptions);

			if (autoPlay) {
				player.current.play();
			}

			return () => {
				player.current?.destroy(() => console.log('player destroyed'));
			};
		}

		hls.current = new Hls({ maxMaxBufferLength: 10, autoStartLoad: false });
		hls.current.loadSource(hlsSource);
		hls.current.attachMedia(video.current! as HTMLMediaElement);

		hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
			console.log('Mainfest parsed');

			// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
			const levels = hls?.current?.levels!;
			console.log(levels);
			const quality: Options['quality'] = {
				default: levels[levels.length - 1].height,
				options: levels.map((level) => {
					if (level.bitrate == 800000) {
						return level.height;
					}
					return level.height;
				}),
				forced: true,

				onChange: (newQuality: number) => {
					console.log('changes', newQuality);
					levels.forEach((level, levelIndex) => {
						if (level.height === newQuality) {
							hls.current!.currentLevel = levelIndex;
						}
					});
				},
			};

			player.current = new Plyr(video.current!, {
				...plyrOptions,
				quality,
			});

			player?.current?.on('play', () => {
				console.log('playing');
				hls?.current?.startLoad();
			});

			player?.current?.on('pause', () => {
				console.log('paused');
				hls?.current?.stopLoad();
			});

			if (autoPlay) {
				player.current.play();
			}
		});

		return () => {
			console.log('destroyed');
			hls.current?.destroy();
			player.current?.destroy();
		};
	}, []);

	return (
		<div
			style={{
				width: 'min(1080px, 100%)',
			}}
		>
			<video id={selectorId} />
		</div>
	);
};

export default VideoPlayer;
