import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {

  let navigate = useNavigate()
  const [isloading, setisloading] = useState(false);
  const [apiError, setApiError] = useState("")







  async function register(values) {
    setisloading(true)
    await axios.post(`https://sara7aiti.onrender.com/api/v1/user`, values).then((data) => {
      if (data.data.message == "Added") {
        setisloading(false)
        navigate("/login")
      }
    }).catch((err) => {
      setApiError(err.response.data.error)
      setisloading(false)
    });

  }




  const validationSchema = Yup.object({
    name: Yup.string().max(15, "name must be less than 15").min(3, "name must be more than 3").required("name is required"),
    email: Yup.string().email("eamil is valid").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,9}$/, "password not valid").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required("rePassword is required"),
    age: Yup.number().positive().integer().required("age is required").min(10, "min is 10").max(60, "max is 60")
  })





  let validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "name is required"
    } else if (values.name.length < 3) {
      errors.name = "name must be more than 3 char"
    } else if (values.name.length > 15) {
      errors.name = "name must be less than 3 char"
    }

    if (!values.email) {
      errors.email = "email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "enter a valid email"
    }

    if (!values.password) {
      errors.password = "password is required"
    } else if (!/^[A-Z][a-z0-9]{3,9}$/i.test(values.password)) {
      errors.password = "password not match"
    }


    if (!values.rePassword) {
      errors.rePassword = "password is required"
    } else if (values.rePassword != values.password) {
      errors.rePassword = "rePassword should  match password"
    }

    if (!values.age) {
      errors.age = "age is required"
    } else if (values.age < 10) {
      errors.age = "age should be more than 10 years old"
    } else if (values.age > 60) {
      errors.age = "age should be less than 60 years old"
    }
    return errors;
  }


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0
    }, validationSchema,
    onSubmit: (values) => {
      register(values)
    }
  })
  return (
    <div className='w-50 mx-auto my-5'>
      <h3 className='text-center'>Register</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="useName">User Name</label>
          <input type="text" id='useName' className='form-control' onBlur={formik.handleBlur} name='name' value={formik.values.name} onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">
            {formik.errors.name}
          </div> : ""}
        </div>
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






        <div className="form-group mb-3">
          <label htmlFor="rePassword">rePassword</label>
          <input type="password" id='rePassword' className='form-control' onBlur={formik.handleBlur} name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">
            {formik.errors.rePassword}
          </div> : " "}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">age</label>
          <input type="number" id='age' className='form-control' name='age' onBlur={formik.handleBlur} value={formik.values.age} onChange={formik.handleChange} />
          {formik.errors.age && formik.touched.age ? <div className="alert alert-danger">
            {formik.errors.age}
          </div> : " "}
        </div>
        <div>
          <button type='submit' className='btn btn-default-outline btn-primary d-block mx-auto mx-auto '>
            Register</button>
        </div>
      </form>
    </div>
  )
}
