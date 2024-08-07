import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.status == 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <h1>Home</h1>

      <div className="home-conent">
        <Link to="/dashboard" className="forget-link">
          Dashboard
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
