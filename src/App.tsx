import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GlobalProvider from "./components/providers/global-provider";
import RevenuePage from "./app/home/page";

import "@/styles/globals.css";
import "@/styles/utils.css";
function App() {
	return (
		<Router>
			<GlobalProvider>
				<Routes>
					<Route index element={<RevenuePage />} />
					<Route path="*" element={<RevenuePage />} />
				</Routes>
			</GlobalProvider>
		</Router>
	);
}

export default App;
