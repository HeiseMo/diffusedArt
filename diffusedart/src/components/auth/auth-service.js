import axios from 'axios';
const baseURL = "http://api.diffusedhermit.com/auth";
class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: baseURL,
      withCredentials: true
    });
    this.service = service;
  }
  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }
   
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}
 
export default AuthService;