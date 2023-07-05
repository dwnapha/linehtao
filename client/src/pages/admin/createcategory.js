import React,{useEffect , useState} from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Categoryform from '../../components/Form/Categoryform';
import {} from 'antd'
import Modal from 'antd/es/modal/Modal';

const Createcategory = () => {
  const [category,setCategory] = useState([]);
  const [name, setName] = useState("")
  const [visible,setVisible]= useState(false)
  const [selected , setSelected] = useState(null)
  const [updatedname , setUpdate] = useState(null)


  //handle form 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const data = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name})
      if(data){
          toast.success(`New category is created.`)
          getAllCategory();
      }
      else toast.error("Error in Submitting");
    } catch (error) {
      console.log(error)
      toast.error("Something is wrong.")
    }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}` , {name: updatedname})
      if(data.success){
          toast.success("updated")
          setSelected(null)
          setUpdate("")
          setVisible(false)
          getAllCategory()
      }
      else toast.error("Error in Submitting");

    } catch (error) {
      toast.error("Something is wrong while updating.")
    }
  }

  const handleDelete = async(id)=>{
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/deletecategory/${id}`)
      if(data.success){
          toast.success("Deleted")
          getAllCategory()
      }
      else toast.error("Error in deleting");

    } catch (error) {
      toast.error("Something is wrong while deleting.")
    }
  }

  const getAllCategory = async () =>{
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getcategory`
        )

      if(data?.success){
        setCategory(data?.category)
      }

     

    } catch (error) {
      console.log(error)
      toast.error("Somthing went wrong")
    }
  }

  useEffect(() =>{
    getAllCategory();
  }, []);

  return (
    <Layout title = {"Dashboard - Category"}>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-9'>
            <h1>Manage Category</h1>

            <div className='p-3 w-50'>
            <Categoryform handleSubmit = {handleSubmit} value = {name} setValue = {setName}/>
            </div>
            <div className='w-75'>
                          <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name </th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* here is c */}
                {category.map( c =>(
                  <>
                  <tr>
                 
                    <td key = {c._id}> {c.name} </td>
                    <td>
                      <button className='btn btn-primary ms-2 ' 
                      onClick={ ()=> {
                          setVisible(true);
                          setUpdate(c.name)
                          setSelected(c)
                        }
                      }>Edit</button>
                      <button className='btn btn-danger ms-2' onClick={() => {handleDelete(c._id)}}>Delete</button>
                    </td>
                  </tr>
                  </>
                  ))}

                </tbody>
                
              </table>

            </div>
            <Modal onCancel={() => {setVisible(false)}} 
            footer = {null} 
            visible = {visible}
            >
              <Categoryform value = {updatedname} setValue={ setUpdate} handleSubmit={handleUpdate}/>
            </Modal>
            </div>
        </ div>
        </div>
       
    </Layout>
  )
}

export default Createcategory