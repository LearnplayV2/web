import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";

const Routes = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Home />} />
        )
    );
    
    return <RouterProvider router={router} />;
}

export default Routes;