import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from "./Components/AuthLayout.jsx";
import MainScreen from './Pages/MainScreen.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <MainScreen/>
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUpPage/>
          </AuthLayout>
        )
      }, 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)