import React, { useEffect } from 'react';
import './Home.scss';
import { Map } from "../../components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStops } from "../../store/map";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {stops, center} = useSelector( ( state ) => state.map );
  const {user} = useSelector( ( state ) => state.auth );

  useEffect( () => {
    if (!user) {
      navigate( '/login' )
    }
    dispatch( getStops() )
  }, [] )

  return (
    <div>
      {window.google ?
        <Map stops={stops} center={center}/>
        : null}
    </div>
  );
};

export default Home;
