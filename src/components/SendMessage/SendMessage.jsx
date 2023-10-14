import React from 'react'
import style from './SendMessage.module.css'
import { useParams } from 'react-router-dom'
import AvatarImg from '../../img/avatar.png'
import './SendMessage.module.css'
import { useFormik } from 'formik'
import axios from 'axios'


export default function SendMessage() {
  let x = useParams();
  console.log(x.id)

  async function addMessage(values) {
    let data = {
      ...values,
      receivedId: x.id
      
    };
  
    try {
      const response = await axios.post('https://sara7aiti.onrender.com/api/v1/message', data);
      console.log('Response:', response.data);
    
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  let formik = useFormik({
    initialValues: {
      messageContent: ""
    },
    onSubmit: (values) => {
      addMessage(values)
    }
  })
  return (
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <a href="" data-toggle="modal" data-target="#profile">
          <img src={AvatarImg} className="avatar " alt="" />
        </a>
        <h3 className="py-2">David</h3>
        <div className="container w-50 m-auto">
          <form action="" method="post" onSubmit={formik.handleSubmit}>
            <textarea
              className="form-control"
              name="messageContent"
              value={formik.values.messageContent}
              onChange={formik.handleChange}
              id=""
              cols={10}
              rows={9}
              placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
              
            />
            <button type='submit' className="btn btn-outline-info mt-3">
              <i className="far fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
      <button
        data-toggle="modal"
        data-target="#share"
        className="btn btn-default-outline share "
      >
        <i className="fas fa-share-alt" /> Share Profile
      </button>
    </div>

  )
}
