import axios from 'axios';
class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:4000/auth',
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
    return this.service.get('/logout', {})
    .then(response => {
      console.log(response.data)
      return response.data
      
    })
  }
}
 
export default AuthService;