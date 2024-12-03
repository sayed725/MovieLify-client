import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";



const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout></MainLayout>,
      errorElement: <Error></Error>,
      children:[
        {
            path:'/',
            element: <Home></Home>,
        },
        {
            path:'/allmovies',
            element: <Register></Register>
        },
        {
            path:'/register',
            element: <Register></Register>
        },
        {
            path:'/login',
            element: <Login></Login>
        },
      ]
    },
  ]);


  export { router }