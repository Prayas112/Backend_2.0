import FormGroup from "../components/FormGroup";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

import { Link } from "react-router";

const Register = () => {
  const { loading, handleregister } = useAuth();

  const [email, setemail] = useState("");
  const [username, setusername] = useState("");

  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    await handleregister({ email, username, password });
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
            value={username}
            onchange={(e) => setemail(e.taget.value)}
            label="email"
            placeholder="enter username"
          />
          <FormGroup
            value={password}
            onchange={(e) => setpassword(e.taget.value)}
            label="password"
            placeholder="enter your passowrd"
          />
          <button>Register</button>
        </form>
        <p>
          Already Have An Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
