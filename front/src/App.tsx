import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/NotFound';
import { AdminLayout } from './components/admin/AdminLayout';
import { useEffect } from 'react';
import { getCurrentColorScheme, getJWTtokens } from './utils/helpers';
import { FilmPage } from './pages/film/FilmPage';
import { setAccessToken, setUser } from './redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { useGetUserMutation } from './redux/api/user';
import { useRefreshTokenMutation } from './redux/api/auth';
import TableGenrePage from './pages/admin/genre/index';
import TableFilmPage from './pages/admin/film';
import TableDirectorPage from './pages/admin/director';
import TableActorPage from './pages/admin/actor';
import TableVoiceOverPage from './pages/admin/voiceover';
import TableUserPage from './pages/admin/user';
import ProfilePage from './pages/profile/ProfilePage';
import AuthDialog from './components/dialog/AuthDialog';
import RegistrationPage from './pages/registration/RegistrationPage';
import FilmsPage from './pages/film/FilmsPage';
import HLSVideoPlayer from './components/Video';
import HlsPlayer from './components/VideoTest';
import Hls from 'hls.js';
import VideoPlayer from './components/VideoTest';

function App() {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((s) => s.auth);
	const [
		fetchRefreshToken,
		{ data: newAccessToken, isError: refreshTokenError, isSuccess: refreshTokenSuccess },
	] = useRefreshTokenMutation();

	const [fetchUser, { data: userData, isSuccess: isUserSuccess }] = useGetUserMutation();

	useEffect(() => {
		const { accessToken, refreshToken } = getJWTtokens();
		if (!accessToken && !refreshToken) {
			return;
		}
		if (refreshToken) {
			fetchRefreshToken({ refresh_token: `${refreshToken}` });
		} else if (!accessToken) {
			console.log('2');
		}

		if (accessToken) {
			fetchUser();
		}
	}, []);

	useEffect(() => {
		if (refreshTokenSuccess || isUserSuccess) {
			if (refreshTokenSuccess) {
				dispatch(setAccessToken(newAccessToken));
			}

			if (isUserSuccess) {
				dispatch(setUser(userData));
			}
		}
	}, [refreshTokenSuccess, isUserSuccess]);

	useEffect(() => {
		if (refreshTokenError) {
			//console.log(1);
		}
	}, [refreshTokenError]);

	useEffect(() => {
		const { accessToken, refreshToken } = getJWTtokens();

		if (!accessToken && !refreshToken) {
			return;
		}
		if (accessToken) {
			fetchUser();
		}
	}, [document.cookie]);

	useEffect(() => {
		const colorScheme = getCurrentColorScheme();
		document.querySelector('html')?.setAttribute('data-color-scheme', colorScheme);
	}, []);

	const supported = Hls.isSupported();
	return (
		// <Routes>
		// 	<Route path="/" element={<Layout />}>
		// 		<Route index element={<HomePage />} />
		// 		<Route>
		// 			<Route path="/films" element={<FilmsPage />} />
		// 			<Route path="/film/:id" element={<FilmPage />} />
		// 		</Route>
		// 		<Route
		// 			path="/profile"
		// 			element={
		// 				user ? (
		// 					<ProfilePage />
		// 				) : (
		// 					<div className="opacity-0">
		// 						<AuthDialog active />
		// 					</div>
		// 				)
		// 			}
		// 		/>
		// 		{!user && <Route path="/registration" element={<RegistrationPage />} />}
		// 		<Route path="*" element={<NotFoundPage />} />
		// 	</Route>
		// 	{user?.role.role_name != 'Пользователь' && user && (
		// 		<Route path="/admin" element={<AdminLayout />}>
		// 			<Route path="films" element={<TableFilmPage />} />
		// 			<Route path="directors" element={<TableDirectorPage />} />
		// 			<Route path="actors" element={<TableActorPage />} />
		// 			<Route path="genres" element={<TableGenrePage />} />
		// 			<Route path="voiceovers" element={<TableVoiceOverPage />} />
		// 			<Route path="users" element={<TableUserPage />} />
		// 		</Route>
		// 	)}
		// 	<Route path="*" element={<NotFoundPage />} />
		// </Routes>
		<>
			{/* <HLSVideoPlayer src="http://localhost:4000/api/video/stream/film/1/1.m3u8" /> */}
			{supported ? (
				<VideoPlayer
					selectorId="1"
					videoSource="http://amoments.ru/api/video/stream/film/1/1.m3u8"
					hlsSource="http://amoments.ru/api/video/stream/film/1/1.m3u8"
				/>
			) : (
				'HLS is not supported in your browser'
			)}
		</>
	);
}

export default App;
