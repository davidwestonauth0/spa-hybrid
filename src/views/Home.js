import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Lock from "../components/Lock";
import { useAuth0 } from "@auth0/auth0-react";
import { Route } from 'react-router-dom';

const Home = (props) => {

    const {
      user,
      isAuthenticated,
      loginWithRedirect,
      logout,
    } = useAuth0();
return (
  isAuthenticated ? (
    <Route to={{
      pathname: '/profile',
      state: { from: props.location }
    }} />
  ) : (

    <Lock location={props.location} />
  )
);
};

export default Home;


