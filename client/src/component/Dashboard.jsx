import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/verify")
      .then((res) => {
        if (res.status == 200) {
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
