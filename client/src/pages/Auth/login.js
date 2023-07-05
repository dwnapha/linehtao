import React,{useState} from 'react'
import Layout from '../../components/layout/layout'
import toast  from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/auth'

const Login = () => {
    const [email , setEmail ] = useState("")
    const [password , setPassword ] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login` , 
            {
              email , 
              password
            }
            );
           
    
            if(res && res.data.success){
              setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
              })
              localStorage.setItem('auth' , JSON.stringify(res.data));
                navigate("/");
            }
            else toast.error(res.data.message)
        }
        catch(error){
            console.log(error)
            toast.error('Something went wrong');
        }
       
    }

    const Forgot =( ) => {
        navigate("/forgotpassword")
    }
  return (
    <Layout title = "Registration Form">
    <div className="form-container">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}> 


    <div className="mb-3">
        <input type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value) }  
        className="form-control" 
        id="exampleInputEmail"
        placeholder="Enter your Email"
        required />
  
    </div>



    <div className="mb-3">
       
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value) }  
         className="form-control" 
         id="exampleInputPassword" 
         placeholder="Enter your Password"
         required/>
    </div>
    <div className='mb-3'>
    <button type="submit" className="btn btn-primary" onClick={Forgot}>Forgot Password</button>
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
    
    </form>

    </div>
    
</Layout>
  )
}

export default Login