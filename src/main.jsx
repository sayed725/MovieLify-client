import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes.jsx'
import AuthProvider from './Porvider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async'








createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
<HelmetProvider>
<RouterProvider router={router}></RouterProvider>
<ToastContainer />
</HelmetProvider>
 </AuthProvider>
  </StrictMode>,
)
