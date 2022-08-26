import React from 'react';

const NotFound = React.lazy(() => import('./NotFound/NotFound'));
const Login = React.lazy(() => import('./login/login'));
const Home = React.lazy(() => import('./Home/Home'));

export {
  NotFound,
  Home,
  Login
};
