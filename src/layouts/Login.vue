<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container t" :class="(heightSize, fundo)">
    <div class="box">
      <q-card class="my-card card-login">
        <q-card-section>
          <q-avatar size="74px" color="white" class="absolute-center shadow-15">
            <q-icon
              :name="'fas fa-users'"
              class="cursor-pointer"
              color="primary"
            />
          </q-avatar>
        </q-card-section>
        <q-card-section class="q-mt-md">
          <div class="text-h6 text-center">
            {{ nomeAnalista }}
          </div>
          <q-input
            v-model="email"
            type="text"
            placeholder="Login"
            v-if="nomeAnalista == null"
          >
          </q-input>
          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            placeholder="Enter Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            push
            label="Logar"
            class="text-capitalize"
            color="primary"
            @click="startComputing(1)"
          ></q-btn>
          <q-btn
            v-if="nomeAnalista != null"
            push
            label="Trocar User"
            class="text-capitalize"
            color="negative"
            @click="TrocarUser()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script type="text/javascript">
/**/
import Vivus from "vivus";
import Swal from "sweetalert2";
import { Platform } from "quasar";
export default {
  mounted() {
    //this.startAnimation();

    let number = Math.floor(Math.random() * 4) + 1;
    this.fundo = "fundo" + number;
    let agente = JSON.parse(localStorage.getItem("agente"));
    if (agente != undefined && agente != null) {
      this.email = agente.email;
      this.nomeAnalista = agente.nome;
    }
  },
  computed: {
    heightSize() {
      if (Platform.is.desktop) {
        return "items-center";
      }
      return "";
    },
  },
  data() {
    return {
      nomeAnalista: null,
      isPwd: true,
      fundo: "",
      loading1: false,
      percentage1: 0,

      loading2: false,
      percentage2: 0,

      loading3: false,
      percentage3: 0,
      logo: "Digitalizer",
      email: "",
      password: "",
      bgColor: "#355760",
      toneColor: 10,
      buttonClass: "round",
      vivus: "",
    };
  },
  methods: {
    TrocarUser() {
      this.nomeAnalista = null;
      this.email = null;
      localStorage.clear();
    },
    startComputing(id) {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((e) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error!", "Usuário ou senha incorretos", "error");
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.logo-login {
  position: absolute;
  top: 165px;
}
.login-icone {
  padding: 15px;
  background-image: linear-gradient(#0f4b65, #062f43) !important;
}
.card-login {
  width: 300px;
  margin-top: 5%;
}
.card {
  margin-bottom: 0px;
}
.card-content {
  min-height: 160px;
}
button {
  margin-bottom: 4%;
}
.t {
  /* height: 50px !important; */
}

.fundo1 {
  background: url(../assets/img/fundo.jpg) bottom;
  background-color: #fff !important;

  background-repeat: no-repeat;
  background-size: cover;
}
.fundo2 {
  background: url(../assets/img/fundo.jpg) bottom;
  background-color: #fff !important;

  background-repeat: no-repeat;
  background-size: cover;
}
.fundo3 {
  background: url(../assets/img/fundo.jpg) bottom;
  background-color: #fff !important;

  background-repeat: no-repeat;
  background-size: cover;
}
.fundo4 {
  background: url(../assets/img/fundo.jpg) bottom;
  background-color: #fff !important;

  background-repeat: no-repeat;
  background-size: cover;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.box {
  width: 300px;
  height: 300px;
}
</style>
