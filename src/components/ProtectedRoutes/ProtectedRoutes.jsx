import React from 'react'
import style from './ProtectedRoutes.module.css'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(props) {


  if(localStorage.getItem("setToken")){
    return   props.children
  }else{
  return  <Navigate to={'/login'}/>
  }

}
