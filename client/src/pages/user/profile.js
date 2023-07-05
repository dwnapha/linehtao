import React , {useState , useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/usermenu'
import { useAuth } from '../../context/auth.js'
import toast  from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    const [name , setName ] = useState("")
    const [email , setEmail ] = useState("")
    const [password , setPassword ] = useState("")
    const [hostel , setHostel ] = useState("")
    const [registration_number , setReg_Number] = useState(0)
    const [phone_number, setPhone ] = useState(0)
    const [room , setRoom ] = useState(0)

    const [auth , setAuth] = useAuth()


    //get user data
    useEffect(() => {
        const { name,email, password , hostel ,room, registration_number ,phone_number  } = 
        auth?.user
        setName(name);
        setEmail(email);
        setHostel(hostel);
        setPassword(password);
        setReg_Number(registration_number);
        setRoom(room);
        setPhone(phone_number);

    } , [auth.user])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile` , 
            {name , 
            password , 
            phone_number,
            hostel , 
            room 
            });
          
            if(data?.error){
                toast.error(data?.error);
            }

            else {
              setAuth({...auth ,
                user:data?.updatedUser
            })
              let ls = localStorage.getItem('auth')
              ls =  JSON.parse(ls)
              ls.user = data.updatedUser
              localStorage.setItem('auth' , JSON.stringify(ls))
              toast.success("Profile Updated")
            }
           
        }
        catch(error){
            console.log(error)
            toast.error('Something went wrong');
        }
       
    }
  return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Usermenu/>
                    </div>
                    <div className='col-md-9'>
                    <div className="form-container">
        <h1>Update Details</h1>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value) }  
            className="form-control" 
            id="exampleInputName" 
            placeholder="Enter your name" 

             />
        </div>

        <div className="mb-3">
            <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value) }  
            className="form-control" 
            id="exampleInputEmail"
            placeholder="Enter your Email"
            disabled

            />
      
        </div>

        <div className="mb-3">
            <input type="number" 
            value={registration_number}
            onChange={(e) => setReg_Number(e.target.value) }  
            className="form-control" 
            id="exampleInputRegistration" 
            placeholder='Enter Reg_Number'

            disabled
            />
        </div>

        <div className="mb-3">
            <input type="text" 
            value={hostel}
            onChange={(e) => setHostel(e.target.value) }  
            className="form-control" 
            id="exampleInputHostel" 
            placeholder="Enter your Hostel"

            />
        </div>

        <div className="mb-3">
            <input type="number" 
            value={room}
            onChange={(e) => setRoom(e.target.value) }  
            className="form-control" 
            id="exampleInputEmail1" 
            placeholder="Enter your Room"
/>
    
        </div>

        <div className="mb-3">
            <input type="text" 
            value={phone_number}
            onChange={(e) => setPhone(e.target.value) }  
            className="form-control" 
            id="exampleInputPhone" 
            placeholder="Enter Phone Number"
/>
        </div>

        <div className="mb-3">
           
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value) }  
             className="form-control" 
             id="exampleInputPassword" 
             placeholder="Enter your Password"/>
        </div>

      

        <button type="submit" className="btn btn-primary">Submit</button>
        
        </form>

        </div>
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default Profile