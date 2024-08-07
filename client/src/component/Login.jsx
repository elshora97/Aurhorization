import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(initialValues);
  const [isPendding, setIsPendding] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPendding(true);
    try {
      Axios.post("http://localhost:5000/auth/login", formFields)
        .then((res) => {
          if (res.status == 200) {
            navigate("/");
          }
          setIsPendding(false);
          console.log(res);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.msg}`,
          });
          setIsPendding(false);
          console.log(err);
        });
    } catch (error) {
      setIsPendding(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Login</span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={formFields.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              value={formFields.password}
              onChange={handleChange}
            />
          </div>
          <button disabled={isPendding}>
            {isPendding ? "pendding..." : "login"}
          </button>
          <Link to="/forgetPassword" className="forget-link">
            Forget Password?
          </Link>
        </form>
        <div className="form-section">
          <p>
            Create New Account <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
