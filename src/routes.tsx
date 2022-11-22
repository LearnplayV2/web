import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Session } from "./authentication";
import { All } from "@/pages/all";
import {DashboardPage}  from "./components/dashboard/pages";
import { Group } from "./components/dashboard/pages/groups";
import { ProfilePage } from "./components/dashboard/pages/profile";
import {HomeMain as HomePage} from './components/home/index';

const Routes = () => {

    const routes = (
        <>
            <Route path='/' element={<Session.Provider children={<HomePage />} />} />
            <Route path='*' element={<All />} />
            <Route path='/dashboard' element={<Session.Provider children={<DashboardPage />} />} />
            <Route path='/dashboard/profile' element={<Session.Provider children={<ProfilePage />} />} />
            <Route path='/dashboard/groups' element={<Session.Provider children={<Group />} />}>
                <Route path=":page" element={<Session.Provider children={<Group />} />}/>
            </Route>
        </>
    );

    const router = createBrowserRouter( createRoutesFromElements(routes) );
    
    return <RouterProvider router={router} />;
}

export default Routes;