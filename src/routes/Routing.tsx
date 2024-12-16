import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home'));

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
