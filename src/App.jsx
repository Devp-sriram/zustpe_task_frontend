import './App.css'
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [data,setData]= useState({
    fullname : "",
    dob  :"",
    email : "",
  })
  const [response,setResponse] = useState([]);

  const valid = () => {
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    return (
      fullNameRegex.test(data.fullname) &&
      data.dob !== "" && 
      data.email !== "" 
    );
  };
    
  const handleChange = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:4000/post',data)
      console.log(response);
      if(response.status === 200){
          console.log()
          handleFetch();
      };
    }catch(err){
       console.log(err) 
    }
  }
 
  const handleFetch =async()=>{
     try{
      const response = await axios.get('http://localhost:4000/fetch')
      setResponse(response.data);
      if(response.status === 200){
          console.log('fetch success');
          console.log(response);
      };
    }catch(err){
       console.log(err) 
    }

  }

  return (
    <>
      <div>
        <form onSubmit={handleChange}>

          <label>full name</label>
          <input type='text' value = {data.fullname} onChange={ e=>setData({...data,fullname:e.target.value})}/>
          <label> dob </label>
          <input type='date' value = {data.dob} onChange={ e => setData({...data, dob:e.target.value})}/>
          <label> email </label>
          <input type='email'value = {data.email} onChange={ e=>setData({...data,email: e.target.value})} />
          
          <button disabled = {valid}> submit</button>
        </form>

        <div>
          <button onClick={handleFetch}>fetch</button>
          
        <table className='table'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
            </tr> 
          </thead>
          <tbody>
          {response?.map(res => (
            <tr key={res._id}>
              <td>{res.fullname}</td>
              <td>{res.dob}</td>
              <td>{res.email}</td>
            </tr>
          ))}
          </tbody>
        </table>
          
        </div>
      </div>
    </>
  )
}

export default App
