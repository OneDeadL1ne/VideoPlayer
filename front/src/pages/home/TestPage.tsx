import useEscape from '@/hooks/use-escape';
import { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import { VideoPlayer } from '@/components/Video';

//import VideoPlayer from "@/components/Video";

export default function TestPage() {
	document.title = 'Видео плеер';

	//const player = useRef<BaseReactPlayer<ReactPlayer>>(null);
	// const player = useRef<HTMLVideoElement>(null);

	// const [video, setVideo] = useState(
	// 	'https://766qc35g-3001.euw.devtunnels.ms/video/stream/film/1/1_480p.m3u8'
	// );

	const [open, setOpen] = useState(true);
	useEscape(() => {
		if (screenfull.isFullscreen) {
			setOpen(!open);
		}
	});

	// const customButtons: TVPlayerButtonProps[] = [
	// 	{ action: 'like', align: 'right' },
	// 	{ action: 'mute', align: 'left' },
	// 	{ action: 'playpause', align: 'center' },

	// 	{ action: 'fullscreen', align: 'left', onRelease: full },
	// ];

	useEffect(() => {}, []);
	return (
		<div className="h-screen flex justify-center items-center  ">
			<div className={' h-screen w-screen'}>
				<VideoPlayer />
			</div>
		</div>
	);
}
