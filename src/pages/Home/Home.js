import React, { useEffect } from 'react';
import './Home.scss';
import { Map } from "../../components";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStops } from "../../store/map";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stops } = useSelector((state) => state.map);

  useEffect(() => {
    if (!Cookie.get('activeUser')) {
      navigate('/home')
    }
    dispatch(getStops())
  }, [])

  return (
    <div>
      <Map stops={stops}/>
    </div>
  );
};

export default Home;
