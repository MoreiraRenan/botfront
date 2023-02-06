import Swal from "sweetalert2";
import Vue from "vue";
import Vuex from "vuex";
import { socket } from "../boot/socket.io";
// import example from './module-example'
import AuthService from "../services/AuthService";
// import { route } from 'quasar/wrappers'
let agente;
let visoes = null;
import { Howl } from "howler";
import beepAudio from "../assets/sounds/newmessage.mp3";
import beepAudio2 from "../assets/sounds/newchat.mp3";

let beep = new Howl({
  src: beepAudio,
  autoplay: false,
  loop: false,
  volume: 0.1,
});
let beepAtivo = new Howl({
  src: beepAudio2,
  autoplay: false,
  loop: false,
  volume: 0.1,
});

function verifyToken() {
  if (localStorage.getItem("token")) {
    AuthService.verifyToken(localStorage.getItem("token")).then((resp) => {
      if (resp.data.token != null) {
        return resp.data.token;
      } else {
        return "";
      }
    });
  } else {
    return null;
  }
}
socket.on("registrado", (dados) => {
  visoes = dados;
});
const Store = new Vuex.Store({
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        try {
          AuthService.authenticate(user.email, user.password)
            .then((res) => {
              var data = JSON.parse(res.request.response);
              if (data.accessToken === undefined) {
                Swal.fire("Error!", "Usuário e/ou senha inválidos.", "error");
              } else {
                localStorage.setItem("token", data.accessToken);
                resolve(agente);
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            })
            .catch((err) => {
              commit("auth_error");
              localStorage.removeItem("token");
              reject(err);
            });
        } catch (err) {}
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    },
    verifyLogin({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          if (localStorage.getItem("token")) {
            AuthService.verifyToken(localStorage.getItem("token"))
              .then((resp) => {
                if (resp.data) {
                  agente = {
                    nome: resp.data.nome,
                    id: resp.data.id,
                    email: resp.data.email,
                    limit: 2,
                    id: resp.data.id,
                  };
                  commit("auth_success", localStorage.getItem("token"));
                  resolve(resp.data);
                } else {
                  localStorage.removeItem("token");
                  reject("error");
                }
              })
              .catch((e) => {
                localStorage.removeItem("token");
                this.$router.reload();
              });
          } else {
            reject("error");
          }
        } catch (err) {}
      });
    },
    playbeep() {
      beep.play();
    },
    playbeepNewChat() {
      beepAtivo.play();
    },
  },
  getters: {
    isRegister: (state) => state.isRegister,
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    agente: (state) => state.agente,
    token: (state) => state.token,
    loggedUser: (state) => state.user,
    darkModel: (state) => state.darkModel,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.isLoggedIn = true;
      state.token = token;
      state.agente = agente;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    dark(state, val) {
      state.darkModel = !val;
    },
  },
  state: {
    visoes: visoes,
    status: "",
    agente: null,
    darkModel: false,
    token: verifyToken() || "",
  },
  strict: process.env.DEV,
});

export default Store;
