import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const initialValues = {
    username: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPendding(true);

    try {
      Axios.post("http://localhost:5000/auth/signup", formFields)
        .then((res) => {
          if (res.status == 200) {
            navigate("/login");
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
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Username"
              name="username"
              value={formFields.username}
              onChange={handleChange}
            />
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
            {isPendding ? "pendding..." : "sign up"}
          </button>
        </form>
        <div className="form-section">
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
