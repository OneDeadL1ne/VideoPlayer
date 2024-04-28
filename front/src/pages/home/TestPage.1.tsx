import useEscape from '@/hooks/use-escape';
import { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';
import { TVPlayerButtonProps } from 'react-tv-player';
import { VideoPlayer } from '@/components/Video';

//import VideoPlayer from "@/components/Video";

export default function TestPage() {
	document.title = 'Видео плеер';

	//const player = useRef<BaseReactPlayer<ReactPlayer>>(null);
	const player = useRef<HTMLVideoElement>(null);

	const [video, setVideo] = useState('http://localhost:3002/trailer/stream/1');
	const full = () => {};
	const [open, setOpen] = useState(true);
	useEscape(() => {
		if (screenfull.isFullscreen) {
			setOpen(!open);
		}
	});

	const customButtons: TVPlayerButtonProps[] = [
		{ action: 'like', align: 'left' },
		{ action: 'mute', align: 'left' },
		{ action: 'playpause', align: 'center' },

		{ action: 'fullscreen', align: 'right', onRelease: full },
	];

	useEffect(() => {}, []);
	return (
		<div className="h-screen flex justify-center items-center  ">
			<div className={'bg-black h-[200px] w-[200px	]'}>
				{/* <TVPlayer url={video} className="" muted customButtons={customButtons} /> */}

				<VideoPlayer />

				{/* <ReactPlayer
                url={video}
                className=""
                muted
                controls
                config={{
                    file: {
                        forceHLS: true,
                        forceDisableHls: false,
                        attributes: {
                            controlsList: "nodownload",
                        },
                    },
                }}
            /> */}
			</div>
		</div>
	);
}
