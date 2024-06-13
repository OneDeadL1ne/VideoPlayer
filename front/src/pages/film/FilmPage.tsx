import { VideoPlayer } from '@/components/Video';
import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { useGetFilmQuery } from '@/redux/api/film';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function FilmPage() {
	const { id } = useParams();
	const { data } = useGetFilmQuery(Number(id));
	const film = data?.data;
	const [open, setOpen] = useState(false);

	const [genreOpen, setGenreOpen] = useState(false);

	document.title = film?.film_title || '';
	return (
		<div className=" ">
			<div className="h-full bg-accent text-accent-foreground p-10">
				<Card className="  bg-secondary border-accent  @[1000px]:p-10 p-4 gap-10  @container">
					<div className="grid   @[1000px]:grid-cols-4 gap-10">
						<div className=" @[1000px]:col-span-3 flex justify-center rounded-lg">
							{film?.preview_path && (
								<img
									src={film?.preview_path}
									alt={`${film?.film_title}`}
									className=" h-full  @[1000px]:h-[480px] @[1100px]:h-[500px]  @[1200px]:h-[550px] object-cover     rounded-lg"
								/>
							)}
						</div>
						<div className="text-accent-foreground">
							<p className="text-4xl font-bold text-center @[500px]:text-start">
								{film?.film_title}
							</p>
							<div className="flex items-center gap-1 mt-5">
								<p className="text-xl text-primary">Год выпуска:</p>
								<p>{film?.release_year}</p>
							</div>
							<div>
								<div
									className={`h-[120px] overflow-y-hidden 
										@[1000px]:h-[130px] @[1100px]:h-[150px] 
									`}
								>
									<p className="text-sm mt-5 ">{film?.description}</p>
								</div>

								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger>
										<p
											className="inline-flex text-primary hover:cursor-pointer "
											onClick={() => setOpen(!open)}
										>
											Подробнее...
										</p>
									</DialogTrigger>
									<DialogContent className="text-accent-foreground">
										<DialogHeader>
											<DialogTitle>Описание</DialogTitle>
											<DialogDescription className="text-balance text-md mt-10">
												{film?.description}
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</div>
							{!open && (
								<div className="flex  @[900px]:items-center @[1000px]:items-start gap-1 mt-5 ">
									<p className=" text-xl text-primary top-0">Жанры:</p>
									<div className="items-center @[900px]:flex @[1000px]:inline-block ">
										<div className="flex gap-2">
											<div className="flex items-center w-[70px] @[800px]:w-full @[800px]:flex @[1000px]:inline-block overflow-hidden">
												{film?.genres.map((genre, i) => {
													if (film.genres.length == i + 1) {
														return <p key={i}>{genre.genre_name}</p>;
													}

													return <p key={i}>{genre.genre_name},</p>;
												})}
											</div>
											<div className="inline-block @[800px]:hidden ">
												<Dialog
													open={genreOpen}
													onOpenChange={setGenreOpen}
												>
													<DialogTrigger className="inline-flex text-primary hover:cursor-pointer @[1000px]:hidden ">
														Подробнее...
													</DialogTrigger>
													<DialogContent className="text-accent-foreground">
														<DialogHeader>
															<DialogTitle className="text-xl">
																Жанры
															</DialogTitle>
															<DialogDescription className="text-balance mt-10 text-lg">
																<div>
																	{film?.genres.map(
																		(genre, i) => {
																			if (
																				film.genres
																					.length ==
																				i + 1
																			) {
																				return (
																					<p key={i}>
																						{
																							genre.genre_name
																						}
																					</p>
																				);
																			}

																			return (
																				<p key={i}>
																					{
																						genre.genre_name
																					}
																					,
																				</p>
																			);
																		}
																	)}
																</div>
															</DialogDescription>
														</DialogHeader>
													</DialogContent>
												</Dialog>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className=" items-center gap-1 mt-3">
						<p className="text-xl text-primary">Режиссер</p>
						<div className="flex items-center mt-3">
							{film?.directors.map((director, i) => (
								<CustomAvatar avatar_url={director.avatar_url} key={i} />
							))}
						</div>
					</div>
					<div className=" items-center gap-1 mt-3">
						<p className="text-xl text-primary">Актеры</p>
						<div className="flex items-center gap-2 mt-3">
							{film?.actors.map((actor, i) => (
								<CustomAvatar
									avatar_url={actor.avatar_url}
									key={i}
									className=" outline-1 outline-primary"
								/>
							))}
						</div>
					</div>
					<div className="mt-5 ">
						<div className="@container ">
							{film?.film_path && (
								<VideoPlayer
									src={film.film_path}
									classNameVideo="@[1000px]:h-full @[900px]"
								/>
							)}
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
