import { decodeToken, isExpired } from "react-jwt";

class AuthService {
  login(email, password) {
    console.log(process.env.REACT_APP_API_URL);
    return fetch ("http://"+process.env.REACT_APP_API_URL + "login", {
        method:"POST",
        body: JSON.stringify({email:email,password:password}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
      })
      .then(response => {
        return response;
      }).catch(err=>{
            throw err;
      });
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getCurrentUser() {
    return decodeToken(localStorage.getItem('token'));
  }

  getExpiryToken(){
    return isExpired(localStorage.getItem("token"));
  }

  refreshPage(){
    if(!this.getToken()){
        localStorage.removeItem("token");
    }
    else if(!this.getCurrentUser() || this.getExpiryToken()){
        localStorage.removeItem("token");
        window.location.href="/";
      }
  }
}

export default new AuthService();