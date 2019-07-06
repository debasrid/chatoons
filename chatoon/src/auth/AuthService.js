import axios from "axios";
import { API_URL } from '../config/config'

class AuthService {
  service = axios.create({
    baseURL: "http://localhost:5000/auth",
    withCredentials: true
  });

  signup = (email, password) => {
    return this.service
      .post("/signup", { email: email, password: password })
      .then(response => response.data);
  };

  login = (email, password) => {
    return this.service
      .post("/login", { email: email, password: password })
      .then(response => response.data);
  };

  currentUser = () => {
    return this.service
      .get("/currentuser")
      .then(response => response.data);
  };
  
}

export default AuthService;