
import { useState } from "react";
import {useAuth}  from '../hooks/useAuth'
import { useNavigate } from "react-router";

const Register = () => {
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState();

    const{user, loading, handleregister} = useAuth()
     const navigate = useNavigate()
  async  function handlesubmit(e){
        e.preventDefault()
       await handleregister(email, username, password)
       navigate('/')
    }
    

  return (
    <main>
      <div>
        <form onSubmit={handlesubmit}>
          <h1>Register</h1>
          <input
            onInput={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter your email"
          />
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your username"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}

export default Register
