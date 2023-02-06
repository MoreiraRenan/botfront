import axios from "axios";
// Auth
// document.location.origin
var authApi = null;
var verifyTokenApi = null;
if (document.location.origin === "http://localhost:8080") {
  authApi = "http://localhost:3330/auth/login";
  verifyTokenApi = "http://localhost:3330/auth/profile";
} else {
  authApi = "/auth/login";
  verifyTokenApi = "/auth/profile";
}

class AuthService {
  static authenticate(email, password) {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.post(authApi, {
          login: email,
          password: password,
        });
        const data = res;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static verifyToken(token) {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.post(
          verifyTokenApi,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = res;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AuthService;
