import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/home/HomePage";

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
		</Routes>
	);
}

export default App;
