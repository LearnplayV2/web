import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Session } from "./authentication";
import { All } from "./pages/all";
import DashboardPage  from "./pages/dashboard";
import { ProfilePage } from "./pages/dashboard/profile";
import HomePage from "./pages/home";

const Routes = () => {
    
    const routes = (
        <>
            <Route path='/' element={<Session.Provider children={<HomePage />} />} />
            <Route path='*' element={<All />} />
            <Route path='/dashboard' element={<Session.Provider children={<DashboardPage />} />} />
            <Route path='/dashboard/profile' element={<Session.Provider children={<ProfilePage />} />} />
        </>
    );

    const router = createBrowserRouter( createRoutesFromElements(routes) );
    
    return <RouterProvider router={router} />;
}

export default Routes;