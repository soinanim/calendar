import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Event from '../pages/Event';
import Login from '../pages/Login';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

console.log(privateRoutes);
const AppRouter = () => {
  const auth = true;
  return auth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path='/'
          //   exact={route.exact}
          element={route.element}
          // element={<Event />}
          key={route.path}
        />
      ))}
      {/* <Navigate to={RouteNames.EVENT} /> */}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          //   exact={route.exact}
          element={<Login />}
          key={route.path}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
