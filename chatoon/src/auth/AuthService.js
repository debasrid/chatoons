import axios from "axios";
import { API_URL } from './config'

class AuthService {
  service = axios.create({
    baseURL: `${API_URL}/auth`,
    withCredentials: true
  });

  signup = (username, password) => {
    return this.service
      .post("/signup", { username: username, password: password })
      .then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username: username, password: password })
      .then(response => response.data);
  };

  currentUser = () => {
    return this.service
      .get("/currentuser")
      .then(response => response.data);
  };
  
}

export default AuthService;