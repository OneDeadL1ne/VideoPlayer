import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";

function App() {
	// const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	if (getCookieValue("accessToken")) {
	// 		dispatch(setUser(getCookieValue("accessToken")));
	// 	}
	// }, []);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
			</Route>

			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<HomePage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
