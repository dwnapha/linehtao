import React,{useState} from 'react'
import Layout from '../../components/layout/layout'
import toast  from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export const Forgotpassword = () => {
    const [email , setEmail ] = useState("")
    const [newPassword , setnewPassword ] = useState("")
    const [answer , setAnswer ] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password` , 
            {
              email , 
              newPassword,
              answer
            }
            );
            if(res && res.data.success){
                navigate("/login")
            }
            else toast.error(res.data.message)
        }
        catch(error){
            console.log(error)
            toast.error('Something went wrong');
        }
       
    }

  return (
    <Layout title = "Registration Form">
    <div className="form-container">
    <h1>Reset Password</h1>
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
        value={newPassword}
        onChange={(e) => setnewPassword(e.target.value) }  
         className="form-control" 
         id="exampleInputnewPassword" 
         placeholder="Enter your new Password"
         required/>
    </div>

    <div className="mb-3">
        <input type="text" 
        value={answer}
        onChange={(e) => setAnswer(e.target.value) }  
        className="form-control" 
        id="exampleInputanswer"
        placeholder="Secret: Enter favourite food"
        required />
  
    </div>

    
    <button type="submit" className="btn btn-primary">Submit</button>
    
    </form>

    </div>
    
</Layout>
  )
}
