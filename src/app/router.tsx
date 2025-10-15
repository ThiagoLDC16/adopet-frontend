import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { PublicRoute } from '@/features/auth/components/PublicRoute';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { UserType } from '@/features/auth/types';
import { ListAnimalsPage } from '@/features/animals/pages/ListAnimalsPage';
import { MyAnimalsPage } from '@/features/animals/pages/MyAnimalsPage';
import { AnimalDetailsPage } from '@/features/animals/pages/AnimalDetailsPage';
import { MyReportsPage } from '@/features/reports/pages/MyReportsPage';
import { PendingReportsPage } from '@/features/reports/pages/PendingReportsPage';

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
      { path: "/animals/:id", element: <AnimalDetailsPage /> },

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
    element: <ProtectedRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "/my-reports", element: <MyReportsPage /> },
        ],
      },
    ]
  },
  {
    element: <ProtectedRoute userType={UserType.ONG} />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "/pending-reports", element: <PendingReportsPage /> },
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
