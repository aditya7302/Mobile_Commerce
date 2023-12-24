import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Register = () => {
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [state,setState] = useState("");
    const [city,setCity] = useState("");
    const [pin_code,setPinCode] = useState("");
    const [street,setStreet] = useState("");
    const [role,setRole] = useState(1);
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
        try{
          const address = {
            state : state,
            city: city,
            pin_code: pin_code,
            street: street,
          }
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/user/login`,{email,password,role});
          if(res.data.success){
            toast.success(res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            });
            localStorage.setItem("auth",JSON.stringify(res.data));
          }else{
            toast.error(res.data.message);
          }
        }catch(error){
            console.log(error);
            toast.error("Something went wront!");
        }
    }

  return (
    <Layout>
    <div>
    <h1 className='text-5xl text-center'>Login Page</h1>
<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
<fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="role"
                      name="role"
                      value = {1}
                      type="radio"
                      defaultChecked
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      User
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="role"
                      name="role"
                      type="radio"
                      value={2}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
    </div>
    </Layout>
  )
}

export default Register