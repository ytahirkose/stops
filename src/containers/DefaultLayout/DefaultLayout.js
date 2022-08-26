import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import './DefaultLayout.scss';
import { IconMap } from "../../utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/auth";

const DefaultLayout = () => {
  const scroller = useRef();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const [inDeep, setInDeep] = useState(false)

  const setUpButtonVisibility = () => {
    window.pageYOffset > 180 ? setInDeep(true) : setInDeep(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", setUpButtonVisibility, false);
  }, []);

  return (
    <div style={{position: 'relative'}} ref={scroller}>
      <header className={'pb-5'}>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <Link to="home" className="navbar-brand"><IconMap className="align-self-center"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0 ps-md-4 ps-sm-4">
                <li className="nav-item">
                  <Link className="nav-link ms-1 active" to="/home">Home Page</Link>
                </li>
              </ul>
              {user ? <div className={'text-light text-capitalize me-5 welcome-text fw-bold'}>
                Welcome {user.name}
              </div>: null}

              <Link to="/login" className="btn btn-danger"
                    onClick={() => dispatch(removeUser())}>Logout</Link>
            </div>
          </div>
        </nav>
      </header>
      <Outlet/>
      <i className={`bi bi-arrow-up-circle up-button ${inDeep ? 'show-up-button' : 'hide-up-button'}`}
         onClick={() => window.scrollTo(0, 0)}
         title="Page Up">
      </i>
    </div>
  );
};

export default DefaultLayout;
