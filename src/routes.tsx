import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Session } from "./authentication";
import { All } from "./pages/all";
import { DashboardPage } from "./pages/dashboard";
import { HomePage } from "./pages/home";

const Routes = () => {
    
    const routes = (
        <>
            <Route path='/' element={<Session.Provider children={<HomePage />} />} />
            <Route path='*' element={<All />} />
            <Route path='/dashboard' element={<Session.Provider children={<DashboardPage />} />} />
        </>
    );

    const router = createBrowserRouter( createRoutesFromElements(routes) );
    
    return <RouterProvider router={router} />;
}

export default Routes;