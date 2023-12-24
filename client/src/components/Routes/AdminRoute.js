import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import {toast} from "react-toastify";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
        try{
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
      if(res.status === 401){
        setOk(false);
        throw new Error(res.data.message);
      }
      else if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    }catch(error){
        toast.error("Unauthorized Access");
    }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}
