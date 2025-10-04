import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { PublicRoute } from '@/features/auth/components/PublicRoute';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { UserType } from '@/features/auth/types';
import { ListAnimalsPage } from '@/features/animals/pages/ListAnimalsPage';
import { MyAnimalsPage } from '@/features/animals/pages/MyAnimalsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/animals" replace />
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
    element: <DefaultLayout />,
    children: [
      { path: "/animals", element: <ListAnimalsPage /> },
    ],
  },
  {
    element: <ProtectedRoute userType={UserType.ONG} />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "/my-animals", element: <MyAnimalsPage /> },
        ],
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/animals" replace />
  }
]);

export function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}
