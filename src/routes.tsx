import { Session } from "./authentication";
import { All } from "@/pages/all";
import { DashboardPage } from "./components/dashboard/pages";
import { Group } from "./components/dashboard/pages/groups";
import { ProfilePage } from "./components/dashboard/pages/profile";
import { HomeMain as HomePage } from "./components/home/index";
import { Alert } from "@components/ui/alert";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const Router = () => {
	const sessionComponent = (el: React.ReactNode) => <Session.Provider children={el} />;

	const Element = () => (
		<React.Fragment>
			<BrowserRouter>
				<Alert />
				<Routes>
					<Route path="/" element={<Session.Provider children={<HomePage />} />} />
					<Route path="*" element={<All />} />
					<Route path="/dashboard" element={<Session.Provider children={<DashboardPage />} />} />
					<Route path="/dashboard/profile" element={<Session.Provider children={<ProfilePage />} />} />
					<Route path="/dashboard/groups" element={<Session.Provider children={<Group />} />}/>
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);

	return <Element />;
};

export default Router;
