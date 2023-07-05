import React,{useState} from 'react'
import Layout from '../../components/layout/layout'
import toast  from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Register = () => {

    const [name , setName ] = useState("")
    const [email , setEmail ] = useState("")
    const [password , setPassword ] = useState("")
    const [hostel , setHostel ] = useState("")
    const [registration_number , setReg_Number] = useState()
    const [phone_number, setPhone ] = useState()
    const [room , setRoom ] = useState()
    const [role , setRole] = useState()
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register` , 
            {name , 
            email , 
            password , 
            hostel , 
            room ,
            registration_number , 
            phone_number,
            role,
            answer}
            );
            
    
            if(res && res.data.success){
              const tst =  () =>{ toast.success(res.data && res.data.message);}
              tst();
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
    <>
    <Layout title = "Registration Form">
        <div className="form-container">
        <h1>Registeration Page</h1>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value) }  
            className="form-control" 
            id="exampleInputName" 
            placeholder="Enter your name" 
            required
             />
        </div>

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
            <input type="number" 
            value={registration_number}
            onChange={(e) => setReg_Number(e.target.value) }  
            className="form-control" 
            id="exampleInputRegistration" 
            placeholder='Enter Reg_Number'
            required
            />
        </div>

        <div className="mb-3">
            <input type="text" 
            value={hostel}
            onChange={(e) => setHostel(e.target.value) }  
            className="form-control" 
            id="exampleInputHostel" 
            placeholder="Enter your Hostel"
            required
            />
        </div>

        <div className="mb-3">
            <input type="number" 
            value={room}
            onChange={(e) => setRoom(e.target.value) }  
            className="form-control" 
            id="exampleInputEmail1" 
            placeholder="Enter your Room"
            required/>
    
        </div>

        <div className="mb-3">
            <input type="text" 
            value={phone_number}
            onChange={(e) => setPhone(e.target.value) }  
            className="form-control" 
            id="exampleInputPhone" 
            placeholder="Enter Phone Number"
            required/>
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
        <div className="mb-3">
           
            <input type="number"
            value={role}
            onChange={(e) => setRole(e.target.value) }  
             className="form-control" 
             id="exampleInputRole" 
             placeholder="0(student)/1(owner)"
             required/>
        </div>

        <div className="mb-3">
           
           <input type="text"
           value={answer}
           onChange={(e) => setAnswer(e.target.value) }  
            className="form-control" 
            id="exampleInputQuestion" 
            placeholder="Safety: Your favourite food?"
            required/>
       </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        
        </form>

        </div>
        
    </Layout>
    </>
  )
}

export default Register