import {LoginPage, SignPage, EmailVerify, AllNotes, CompleteNotes, UnCompletedNotes, PasswordPage} from "../components/index"
import MainLayout from "./MainLayout"
import {createBrowserRouter} from "react-router-dom"
import PublicRoute from "./PublicRouter"
import ProtectedRoute from "./ProtectedRoute"


const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <PublicRoute>
                     <LoginPage/>
            </PublicRoute>
        )
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                    <SignPage/>
            </PublicRoute>
        )
    },
    {
        path: "/email-verify",
        element: (
            <PublicRoute>
                    <EmailVerify/>
            </PublicRoute>   
        ) 
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout/>
            </ProtectedRoute>
        ),

        children: [
            {index: true, element:<AllNotes/>},
            {path: "/completednotes", element: <CompleteNotes/>},
            {path: "/uncompletednotes", element: <UnCompletedNotes/>},
            {path: "/changepassword", element: <PasswordPage/>},
        ]
    }
])

export default router

