import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { PublicRoute } from '@/features/auth/components/PublicRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

export function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}
