import axios from "axios";
import { API_URL } from '../config/config'


class AuthService {
  service = axios.create({
    baseURL: "http://localhost:5000/auth",
    withCredentials: true
  });

  signup = (username,firstname,lastname,email, password,profile_picture) => {
    return this.service
      .post("/", {username:username, firstname:firstname, lastname:lastname, 
        email: email, password: password, profile_picture: profile_picture })
      .then(response => response.data);
  };

  login = (email, password) => {
    return this.service
      .post("/login", { email: email, password: password })
      .then(response => response.data)
  };

  currentUser = () => {
    return this.service
      .get("/currentuser")
      .then(response => response.data);
  };
  
}

export default AuthService;