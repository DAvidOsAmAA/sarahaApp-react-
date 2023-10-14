import React, { useContext, useEffect, useState } from 'react';
import style from './Profile.module.css';
import avatarImg from '../../img/avatar.png';
import './Profile.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { tokenContext } from '../../context/tokenContext';
import jwtDecode from 'jwt-decode';

export default function Profile() {
  let { token } = useContext(tokenContext);
  const [allMessages, setallMessages] = useState([]);
  const [userId, setUserId] = useState('');

  async function getMessages() {
    try {
      let response = await axios.get('https://sara7aiti.onrender.com/api/v1/message', {
        headers: {
          token: localStorage.getItem("setToken")
        }
        
      });
      setallMessages(response.data.allMessages);
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  }

  function getUserId() {
    const decodedToken = jwtDecode(localStorage.getItem('setToken'));
    setUserId(decodedToken.id);
  }

  useEffect(() => {
    getMessages();
    getUserId();
  }, []);

  return (
    <div className="container text-center my-5">
      <div className="card">
        <a href="" data-toggle="modal" data-target="#profile">
          <img src={avatarImg} className="avatar" alt="" />
        </a>
        <h3 className="py-2">David</h3>
        <Link
          to={'/message/' + userId}
          data-target="#share"
          className="btn btn-default-outline share"
        >
          <i className="fas fa-share-alt" /> Share Profile
        </Link>
      </div>
      {allMessages.length === 0 ? (
        <div className="card py-5">
          <p>You don't have any messages...</p>
        </div>
      ) : (
        allMessages.map((ele, index) => (
          <div key={ele.id} className="card py-5">
            <p>{ele.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

