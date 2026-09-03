import {useState} from 'react'
import {useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
const Login = () => {

    const{user, loading, handlelogin} =  useAuth()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    
    const navigate = useNavigate()
    async function handlesubmit(e){
        e.preventDefault()
     await handlelogin(username,password)
     navigate('/')
    }
  
    if(loading){
      return(
        <main><h1>Loading.....</h1></main>
      )
    }
    
  return (
    <main>
      <div>
        <form onSubmit={handlesubmit}>
          <h1>Login</h1>
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your name"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  );
}

export default Login
