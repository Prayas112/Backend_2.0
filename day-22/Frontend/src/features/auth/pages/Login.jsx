import React from "react";
import FormGroup from "../components/FormGroup";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

import { Link } from "react-router";

const Login = () => {
  const { loading, handlelogin } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    await handlelogin({ email, password });
    navigate("/");
  }

  return (
    <main>
      <div>
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
          <FormGroup
            value={email}
            onchange={(e) => setemail(e.taget.value)}
            label="email"
            placeholder="enter your email"
          />
          <FormGroup
            value={password}
            onchange={(e) => setpassword(e.taget.value)}
            label="password"
            placeholder="enter your passowrd"
          />
          <button>Login</button>
        </form>
        <p>
          New User? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
