<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container t" :class="(heightSize, fundo)">
    <div class="box">
      <div class="q-pa-md justify-center">
        <h1 v-if="img == null">Aguarde ...</h1>
        <h3 v-else>QR code</h3>
        <h3 v-if="conectado == true">Conectado</h3>
        <h3 v-if="erro == true">
          Erro Com o bot entre em contato com o suporte
        </h3>
        <div style="width: 500px" v-if="conectado == false && erro == false">
          <q-img :src="img"></q-img>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { ref, computed } from "vue";
import { socket } from "../boot/socket.io";
import { Platform } from "quasar";
export default {
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
      img: ref(null),
      fundo: "fundo1",
      conectado: false,
      erro: false,
    };
  },
  created() {
    socket.on("qrcode", (dados) => {
      this.img = dados[0];
    });

    socket.on("conectado", () => {
      this.conectado = true;
    });

    socket.on("erroqr", () => {
      this.erro = true;
    });
  },
};
</script>
<style scoped>
.fundo1 {
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
</style>
