import logo from './logo.svg';

import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Notfound from './components/Notfound/Notfound';
import { useContext, useEffect } from 'react';
import { tokenContext } from './context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import SendMessage from './components/SendMessage/SendMessage';






function App() {

let {setToken} = useContext(tokenContext)

useEffect(()=>{
  if(localStorage.getItem(setToken)){
    setToken(localStorage.getItem(setToken))
  }
})



const routes =createBrowserRouter([{
  path:"",element:<Layout/>,children:[
    { path: '', element: <Register /> },
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"profile",element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
    {path:"message/:id",element:<SendMessage/>},
    {path:"*",element:<Notfound/>}
  ]
}])



  return (
<RouterProvider router={routes}>
  

</RouterProvider>
  );
}

export default App;
