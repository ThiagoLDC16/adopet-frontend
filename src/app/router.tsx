import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout';
import { HomePage } from '@/features/home/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ListAnimalsPage } from '@/features/animals/pages/ListAnimalsPage';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/animals", element: <ListAnimalsPage/ >},
    ],
  },
]);

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}
