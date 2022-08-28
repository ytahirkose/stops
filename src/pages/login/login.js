import React, { useEffect, useRef } from 'react';
import './login.scss'
import { IconLogoDark } from "../../utils/Icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components";
import { useNavigate } from "react-router";
import { setUser } from "../../store/auth";
import { checkValidationEmail } from "../../utils/Validation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isPending, inviteUser} = useSelector((state) => state.auth);

  const operationForm = useRef()

  useEffect(() => {
    if (inviteUser) {
      navigate('/home')
    }
  }, [inviteUser])


  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'required';
    } else if (values.email.length > 35) {
      errors.email = 'must be 35 characters or less';
    } else if (!checkValidationEmail(values.email)) {
      errors.email = 'must be valid';
    }

    if (!values.password) {
      errors.password = 'required';
    } else if (values.password.length > 20) {
      errors.password = 'must be 20 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      dispatch(setUser(values));
    },
  });

  if (isPending) {
    return (<Loader/>)
  }

  return (
    <div className="form-signin w-100 pb-5">
      <form className="text-center login-form bg-light mb-5 shadow" onSubmit={formik.handleSubmit} ref={operationForm}>
        <IconLogoDark className="my-5 align-self-center text-primary login-icon"/>
        <h1 className="h2 mb-3 fw-normal text-primary">Please Sign in</h1>

        <div className="form-floating">
          <input name="email"
                 type="email"
                 className="form-control"
                 id="floatingInput"
                 placeholder="email"
                 onChange={formik.handleChange}
                 value={formik.values.email}
                 onBlur={formik.handleBlur}
                 required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        {formik.touched.email && formik.errors.email ?
          <div className="text-danger">E Mail {formik.errors.email}</div> : null}
        <div className="form-floating">
          <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"
                 onChange={formik.handleChange}
                 value={formik.values.password}
                 onBlur={formik.handleBlur}
                 required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {formik.touched.password && formik.errors.password ?
          <div className="text-danger">Password {formik.errors.password}</div> : null}
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
