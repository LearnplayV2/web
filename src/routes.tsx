import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./authentication";
import { All } from "./pages/all";
import { Home } from "./pages/home";

const Routes = () => {
    
    const routes = (
        <>
            <Route path='/' element={<AuthProvider children={<Home />} />} />
            <Route path='*' element={<All />} />
            <Route path='/dashboard' element={<AuthProvider children={<>to do</>} />} />
            <Route path='/dashboard/test' element={<AuthProvider children={<>to do</>} />} />
        </>
    );

    const router = createBrowserRouter( createRoutesFromElements(routes) );
    
    return <RouterProvider router={router} />;
}

export default Routes;