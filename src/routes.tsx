import { Session } from "./authentication";
import { All } from "@/pages/all";
import { DashboardPage } from "./components/dashboard/pages";
import { Group } from "./components/dashboard/pages/groups";
import { ProfilePage } from "./components/dashboard/pages/profile";
import { HomeMain as HomePage } from "./components/home/index";
import { Alert } from "@components/ui/alert";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { GroupId } from "./components/dashboard/pages/groups/group";

const Router = () => {
	const sessionComponent = (el: React.ReactNode) => <Session.Provider children={el} />;

	const Element = () => (
		<React.Fragment>
			<BrowserRouter>
				<Alert />
				<Routes>
					<Route index={true} path="/" element={<Session.Provider children={<HomePage />} />} />
					<Route path="*" element={<All />} />
					<Route path="/dashboard">
						<Route index={true} element={sessionComponent(<DashboardPage />)} />
						<Route path="profile" element={<Session.Provider children={<ProfilePage />} />} />
						<Route path="groups" element={<Session.Provider children={<Group />} />} />
						<Route path="group/:id" element={<Session.Provider children={<GroupId />} />}>
							<Route path="*" element={<Session.Provider children={<GroupId />} />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);

	return <Element />;
};

export default Router;
