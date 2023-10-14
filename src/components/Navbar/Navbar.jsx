import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
export default function Navbar() {

  let { token,setToken } = useContext(tokenContext)
  let navigate = useNavigate()

function logOut(){
  localStorage.removeItem("userToken")
  navigate("/login")
  setToken(null)
}


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse  navbar-collapse" id="navbarNav">

            <ul className="navbar-nav">
              {token ? <><li className="nav-item">
                <Link className="nav-link" to={"profile"}>profile</Link>
              </li>
              </> : <> <li className="nav-item">
                  <Link className="nav-link" to={"register"}>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"login"}>login</Link>
                </li></>}



            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
