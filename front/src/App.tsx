import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/NotFound';
import { AdminLayout } from './components/admin/AdminLayout';
import { useEffect } from 'react';
import { getCurrentColorScheme, getJWTtokens } from './utils/helpers';
import { FilmPage } from './pages/film/FilmPage';
import { setAccessToken, setUser } from './redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { useGetMyUserQuery } from './redux/api/user';
import { useRefreshTokenMutation } from './redux/api/auth';
import TableGenrePage from './pages/admin/genre/index';
import TablePostPage from './pages/admin/post';
import TableFilmPage from './pages/admin/film';
import TableDirectorPage from './pages/admin/director';
import TableActorPage from './pages/admin/actor';
import TableVoiceOverPage from './pages/admin/voiceover';
import TableRolePage from './pages/admin/role';
import TableEmployeePage from './pages/admin/employee';
import TableUserPage from './pages/admin/user';

function App() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector((s) => s.auth);
	const [
		fetchRefreshToken,
		{ data: newAccessToken, isError: refreshTokenError, isSuccess: refreshTokenSuccess },
	] = useRefreshTokenMutation();

	const { data: userData, isSuccess: isUserSuccess } = useGetMyUserQuery();

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
			navigate('/');
		}
	}, [document.cookie]);

	useEffect(() => {
		const colorScheme = getCurrentColorScheme();
		document.querySelector('html')?.setAttribute('data-color-scheme', colorScheme);
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route>
					<Route path="/film/:id" element={<FilmPage />} />
					<Route path="/film/:id" element={<FilmPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Route>
			{user?.role.role_name != 'Пользователь' && (
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="posts" element={<TablePostPage />} />
					<Route path="films" element={<TableFilmPage />} />
					<Route path="directors" element={<TableDirectorPage />} />
					<Route path="actors" element={<TableActorPage />} />
					<Route path="genres" element={<TableGenrePage />} />
					<Route path="voiceovers" element={<TableVoiceOverPage />} />
					<Route path="users" element={<TableUserPage />} />
					<Route path="employees" element={<TableEmployeePage />} />
					<Route path="roles" element={<TableRolePage />} />
				</Route>
			)}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
