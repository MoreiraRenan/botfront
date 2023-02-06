import axios from "axios";
import store from "../store";

var ApiUrl = null;

if (document.location.origin === "http://localhost:8080") {
  ApiUrl = "http://localhost:5005/";
} else {
  ApiUrl = document.location.origin + "/";
}
class ApiService {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.get(ApiUrl + "user/allUser", {
          headers: {
            Authorization: "Bearer " + store.getters.token
          }
        });
        const data = res;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.get(ApiUrl + "user/userbyid/" + id, {
          headers: {
            Authorization: "Bearer " + store.getters.token
          }
        });
        const data = res;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }


  static resetPassword(id) {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.get(ApiUrl + "user/reset-password/" + id, {
          headers: {
            Authorization: "Bearer " + store.getters.token
          }
        });
        const data = res;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static changePassword(changePasswordDto) {
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(
            ApiUrl + "user/change-password/",
            { ...changePasswordDto },
            {
              headers: {
                Authorization: "Bearer " + store.getters.token
              }
            }
          )
          .then(res => {
            const data = res;
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static CreateUser(user) {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(
            ApiUrl + "user/register",
            { ...user },
            {
              headers: {
                Authorization: "Bearer " + store.getters.token
              }
            }
          )
          .then(re => {
            if (re.data.use === undefined || re.data.use === null) {
              reject("Erro");
            } else {
              resolve("sucess");
            }
          });
      } catch (err) {
        console.log("Erro", err);
        reject(err);
      }
    });
  }

  static getAgenteByCliente(cliente) {
    return new Promise((resolve, reject) => {
      try {
        const res = axios.get(ApiUrl + "agente/agente/" + cliente, {
          headers: {
            Authorization: "Bearer " + store.getters.token
          }
        });
        const data = res;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }


  static CreateAgente(user) {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(
            ApiUrl + "agente/create",
            { ...user },
            {
              headers: {
                Authorization: "Bearer " + store.getters.token
              }
            }
          )
          .then(re => {
            if (re.data.use === undefined || re.data.use === null) {
              reject("Erro");
            } else {
              resolve("sucess");
            }
          });
      } catch (err) {
        console.log("Erro", err);
        reject(err);
      }
    });
  }

  static ActivateOrDeactivateUser(id, desativado, motivoDesativacao) {
    return new Promise((resolve, reject) => {
      try {
        if (desativado) {
          // mandar requisição para ativar
          axios
            .get(ApiUrl + "user/activate/" + id, {
              headers: {
                Authorization: "Bearer " + store.getters.token
              }
            })
            .then(re => {
              if (re.data.user === undefined || re.data.user === null) {
                reject("Erro");
              } else {
                resolve("sucess");
              }
            });
        } else {
          // mandar requisição para desativar
          axios
            .get(ApiUrl + "user/deactivate/" + id + "/" + motivoDesativacao, {
              headers: {
                Authorization: "Bearer " + store.getters.token
              }
            })
            .then(re => {
              if (re.data.user === undefined || re.data.user === null) {
                reject("Erro");
              } else {
                resolve("sucess");
              }
            });
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  static relatorios(dados) {
    return new Promise((resolve, reject) => {
      try {
          const dadosRelatorio = {
            dataInicio: dados.dataInicio,
            horaInicio: dados.horaInicio,
            dataFim: dados.dataFim,
            horaFim: dados.horaFim,
            cliente: dados.cliente
          };
          axios
            .post(
              ApiUrl + "relatorio/pesquisa",
              { ...dadosRelatorio },
              {
                headers: {
                  Authorization: "Bearer " + store.getters.token
                }
              }
            )
            .then(re => {
              resolve(re.data);
            })
            .catch(err => {
              reject(err);
            });
        
      } catch (err) {
        reject(err);
      }
    });
  }

}

export default ApiService;
