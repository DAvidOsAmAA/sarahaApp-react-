import React, { useContext } from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { tokenContext } from '../../context/tokenContext';

export default function Login() {


  let navigate = useNavigate()
  const [isloading, setisloading] = useState(false);
  const [apiError, setApiError] = useState("")
  let {setToken} = useContext(tokenContext)

  async function logIn(values) {
    setisloading(true)
    await axios.post(`https://sara7aiti.onrender.com/api/v1/user/signin`, values).then((data) => {
    console.log(data.data)
    if (data.data.message == "welcome") {
        setisloading(false)
        localStorage.setItem("setToken",data.data.token)
        setToken(data.data.token)
        navigate("/profile")
      }
    }).catch((err) => {
      console.log(err.response.data.error)
      setApiError(err.response.data.error)
      setisloading(false)
    })
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("eamil is valid").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,9}$/, "password not valid").required("password is required"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    }, validationSchema,
    onSubmit: (values) => {
      logIn(values)
    }
  })

  return (
    <div className='w-50 mx-auto my-5'>
      <h3 className='text-center'>Login</h3>
      <form action="" onSubmit={formik.handleSubmit}>

        <div className="form-group mb-3">
          <label htmlFor="email">email</label>
          <input type="text" id='email' className='form-control' onBlur={formik.handleBlur} name='email' value={formik.values.email} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">
            {formik.errors.email}</div> : ""}
        </div>


        <div className="form-group mb-3">
          <label htmlFor="password">password</label>
          <input type="password" id='password' className='form-control' onBlur={formik.handleBlur} name='password' value={formik.values.password} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ?
            <div className="alert alert-danger">
              {formik.errors.password}
            </div> : ""}
        </div>

        <div>
          <button type='submit' className='btn btn-default-outline btn-primary d-block mx-auto mx-auto '>
            Login</button>
          
        </div>
      </form>
    </div>
  )
}

