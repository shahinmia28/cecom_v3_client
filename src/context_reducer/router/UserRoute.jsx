import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import API from '../../components/Api';
import Spinner from '../../components/Spinner';
import { Outlet } from 'react-router-dom';

export default function UserRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${API}/api/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
