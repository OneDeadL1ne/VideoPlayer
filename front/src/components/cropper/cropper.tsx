import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Input } from '../ui/input';

import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
	type Crop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '../ui/button';
import setCanvasPreview from './setCanvasPreview';
import { LoadingSpinner } from '../spinner/spinner';
import axios from 'axios';

export default function CropperImage({
	image,
	cropped,
	open,

	photo,
	setOpen,
	updateCrop,
	setAvatar,
	setPhoto,
}: {
	image?: string;
	photo?: File | Blob;

	cropped?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	updateCrop: Dispatch<SetStateAction<string>>;
	setPhoto: Dispatch<SetStateAction<Blob | File | null>>;
	setAvatar: Dispatch<SetStateAction<Blob | File | null>>;
}) {
	const imgRef = useRef<HTMLImageElement | null>(null);

	const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const [photoFile, setPhotoFile] = useState<File | Blob | null>(photo ? photo : null);
	const [imageUrl, setImageUrl] = useState('');
	const [error, setError] = useState('');
	const [time, setTime] = useState(image ? true : false);
	const [crop, setCrop] = useState<Crop>({
		unit: '%', // Can be 'px' or '%'
		x: 25,
		y: 25,
		width: 50,
		height: 50,
	});

	useEffect(() => {
		if (photoFile) {
			const reader = new FileReader();

			reader.addEventListener('load', async () => {
				const imgeURL = reader.result?.toString() || '';

				setImageUrl(imgeURL);
			});

			reader.readAsDataURL(photoFile);
		}
	}, [photoFile]);

	useEffect(() => {
		if (image) {
			const t = image.split('.')[1];

			axios({
				url: image,
				method: 'GET',
				responseType: 'blob',
			}).then((res) => {
				if (image) {
					const fileName = `test.${t}`;

					const file = new File([res.data], fileName);

					return setPhotoFile(file);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (imageUrl.length != 0) {
			setTime(true);
			setTimeout(() => {
				setTime(false);
			}, 600);
		}
	}, [imageUrl]);

	useEffect(() => {
		if (!cropped && !open && photo) {
			setPhotoFile(photo);

			setPhoto(photo);
			setImageUrl('');
		}
	}, [cropped, setOpen, open]);

	return (
		<div className="grid grid-flow-row p-7 ">
			<div className="flex justify-center   ">
				{error && <p className="text-accent-foreground">{error}</p>}

				{imageUrl && imageUrl.length != 0 && !time ? (
					<ReactCrop
						crop={crop}
						onChange={(c) => setCrop(c)}
						circularCrop
						keepSelection
						className="h-full w-fit"
						aspect={1}
						minWidth={100}
					>
						<img
							ref={imgRef}
							src={imageUrl}
							alt="Upload"
							style={{ maxHeight: '70vh' }}
							onLoad={(e) => {
								const { width, height } = e.currentTarget;
								const cropWidth = (100 / width) * 100;
								const crop = makeAspectCrop(
									{
										unit: '%',
										width: cropWidth,
									},
									1,
									width,
									height
								);
								const centeredCrop = centerCrop(crop, width, height);
								setCrop(centeredCrop);
							}}
						/>
					</ReactCrop>
				) : (
					<div>{time && <LoadingSpinner className="text-accent-foreground" />}</div>
				)}
			</div>
			<div className="flex justify-center mt-5 ">
				<Input
					type="file"
					className="border-[2px] w-[200px] text-accent-foreground"
					onChange={(e) => {
						e.preventDefault();

						const file = e.target.files?.[0];

						if (!file) return;

						const reader = new FileReader();
						reader.addEventListener('load', () => {
							const imageEl = new Image();
							const imgeURL = reader.result?.toString() || '';
							imageEl.src = imgeURL;

							imageEl.addEventListener('load', () => {
								if (error) setError('');
								// const { naturalHeight, naturalWidth } = e.currentTarget;
								// if (naturalWidth < 100 || naturalHeight < 100) {
								// 	setError('Error');
								// 	setImg('');
								// 	return;
								// }
							});

							setImageUrl(imgeURL);

							setPhotoFile(file);
						});
						reader.readAsDataURL(file);
					}}
				/>
			</div>

			<div className="flex justify-center mt-5 text-accent-foreground">
				<Button
					onClick={() => {
						if (imgRef.current && previewCanvasRef.current) {
							setCanvasPreview(
								imgRef.current,
								previewCanvasRef.current,
								convertToPixelCrop(
									crop,
									imgRef.current.width,
									imgRef.current.height
								)
							);
							if (previewCanvasRef.current) {
								const dataUrl = previewCanvasRef.current.toDataURL();

								const blobBin = atob(dataUrl.split(',')[1]);
								const array = [];
								for (let i = 0; i < blobBin.length; i++) {
									array.push(blobBin.charCodeAt(i));
								}
								const file = new Blob([new Uint8Array(array)], {
									type: 'image/png',
								});
								if (photo) {
									setPhotoFile(photo);
								}
								setPhoto(photoFile);
								updateCrop(dataUrl);
								setAvatar(file);
								setOpen(false);
							}
						}
					}}
					className=" text-white"
				>
					Сохранить Изображение
				</Button>
			</div>
			<canvas ref={previewCanvasRef} className="hidden " />
		</div>
	);
}
