import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isPendding, setIsPendding] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPendding(true);
    try {
      Axios.post("http://localhost:5000/auth/forget-password", { email })
        .then((res) => {
          if (res.status == 200) {
            navigate(`/resetPassword/${res.data.token}`);
          }
          setIsPendding(false);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.msg}`,
          });
          setEmail("");
          setIsPendding(false);
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
          <span className="title">Forgot Password</span>

          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isPendding}>
            {isPendding ? "pendding..." : "send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
