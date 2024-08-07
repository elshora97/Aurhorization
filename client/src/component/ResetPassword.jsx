import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isPendding, setIsPendding] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPendding(true);

    try {
      Axios.post("http://localhost:5000/auth/reset-password/" + token, {
        password,
      })
        .then((res) => {
          if (res.status == 200) {
            navigate("/login");
          }
          console.log(res);
          setIsPendding(false);
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
          <span className="title">Reset Password</span>

          <div className="form-container">
            <input
              type="password"
              className="input"
              placeholder="*******"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isPendding}>
            {isPendding ? "pendding..." : "reset"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
