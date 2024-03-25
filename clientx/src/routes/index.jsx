import HomePage from '../views/HomePage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import EditCuisinePage from '../views/EditCuisinePage';
import CategoriesPage from '../views/CategoriesPage';
import AddCuisinePage from '../views/AddCuisinePage';
import CustomNavbar from '../components/CustomNavbar';
import PublicHomePage from '../views/PublicHomePage';
import PublicDetailsPage from '../views/PublicDetailsPage';
import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import CuisineDetailPage from '../views/CuisineDetailPage';
import PublicNavbar from '../components/PublicNavbar';
import CuisineCard from '../components/CuisineCard';

const NavbarLayout = () => {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
};

const PublicNavbarLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/public',
    element: <PublicNavbarLayout />,
    children: [
      {
        path: '/public/home',
        element: <PublicHomePage />,
      },
      {
        path: '/public/details/:id',
        element: <PublicDetailsPage />,
      },
    ],
  },
  {
    loader: () => {
      const access_token = localStorage.getItem('Authorization');
      if (access_token) {
        throw redirect('/cuisines');
      }
      return null;
    },
    path: '/login',
    element: <LoginPage />,
  },
  {
    loader: () => {
      const access_token = localStorage.getItem('Authorization');
      if (!access_token) {
        throw redirect('/login');
      }
      return null;
    },
    path: '/',
    element: <NavbarLayout />,
    children: [
      {
        path: 'cuisines', //done
        element: <HomePage />,
      },
      {
        path: 'cuisines/:id', //done
        element: <HomePage />,
      },
      {
        path: 'register', //done
        element: <RegisterPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'add-cuisine',
        element: <AddCuisinePage />,
      },
      {
        path: 'edit-cuisine/:id',
        element: <EditCuisinePage />,
      },
      {
        path: 'detail-cuisine/:id',
        element: <CuisineDetailPage />,
      },
    ],
  },
]);

export default router;
