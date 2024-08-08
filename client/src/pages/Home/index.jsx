import React from 'react'
import Header from '../../components/Header'
import ProductList from '../../components/ProductList'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';
import { clearTokens } from '../../api';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const hendleLogout = () => {
    clearTokens();
    dispatch(logout());
  };

  return (
    <div>
      <Header/>
      <h3>HomePage</h3>
      <h1>Hello {user ? `${user.name}` : "guest"}</h1>
      <button onClick={hendleLogout}>logout</button>
      <ProductList />
    </div>
  )
}

export default HomePage