import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/NotFound';
import { AdminLayout } from './components/admin/AdminLayout';
import { useEffect } from 'react';
import { getCurrentColorScheme, getJWTtokens } from './utils/helpers';
import { FilmPage } from './pages/film/FilmPage';
import { setAccessToken, setUser } from './redux/reducers/authSlice';
import { useAppDispatch } from './hooks/reduxHooks';
import { useGetMyUserQuery } from './redux/api/user';
import { useRefreshTokenMutation } from './redux/api/auth';

function App() {
	const dispatch = useAppDispatch();

	const [
		fetchRefreshToken,
		{ data: newAccessToken, isError: refreshTokenError, isSuccess: refreshTokenSuccess },
	] = useRefreshTokenMutation();

	const { data: user, isSuccess: isUserSuccess } = useGetMyUserQuery();

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
				dispatch(setUser(user));
			}
		}
	}, [refreshTokenSuccess, isUserSuccess]);

	useEffect(() => {
		if (refreshTokenError) {
			//console.log(1);
		}
	}, [refreshTokenError]);

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

			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<HomePage />} />
			</Route>
		</Routes>
	);
}

export default App;
