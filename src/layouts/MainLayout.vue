<template>
  <div class="" :style="style">
    <q-layout
      view="lHh Lpr lFf"
      class="shadow-3"
      style="z-index: auto"
      container
    >
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <q-btn round flat>
            <q-avatar>
              <q-img
                :src="currentConversation.img"
                v-if="currentConversation != null"
              ></q-img>
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md" v-if="currentConversation != null">
            {{ currentConversation.person }}
          </span>
        </q-toolbar>
        <q-toolbar class="bg-grey-2 text-black">
          <q-space></q-space>
          <q-btn
            v-if="currentConversation != null"
            color="red"
            icon="add_task"
            @click="finalizarchat()"
            label="Finalizar atendimento"
          ></q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-space />
          <q-btn outline round color="primary" icon="add"></q-btn>
        </q-toolbar>
        <div class="q-pa-md" style="max-width: 300px">
          <!-- <q-input rounded outlined v-model="text" label="pesquisar">
            <template v-slot:append>
              <q-icon
                v-if="text !== ''"
                name="close"
                @click="text = ''"
                class="cursor-pointer"
              ></q-icon>
              <q-icon name="search"></q-icon>
            </template>
          </q-input> -->
        </div>
        <q-scroll-area style="height: calc(100% - 120px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              clickable
              v-ripple
              :class="checkchatAtivo(conversation)"
              @click="setCurrentConversation(index)"
            >
              <q-item-section avatar>
                <q-avatar class="bg-grey-3">
                  <!-- <q-icon name="forum" /> -->
                  <q-img
                    :src="conversation.img"
                    v-if="conversation != null"
                  ></q-img>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.person }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="not_interested" v-if="conversation.deleted" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-chip
                  v-if="conversation.messagenotread > 0"
                  color="green"
                  text-color="white"
                  :label="conversation.messagenotread"
                ></q-chip>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
            </q-item>
          </q-list>
          <div
            v-if="conversations.legth == 0"
            class="q-pa-md row justify-center"
          >
            <span>Não tem chat iniciado</span>
          </div>
        </q-scroll-area>
      </q-drawer>
      <!-- chat-->
      <q-page-container class="bg-grey-1">
        <div id="q-app" style="min-height: 870px" class="chat">
          <div
            ref="containerMensagem"
            class="q-pa-md row justify-center"
            v-if="currentConversation != null"
          >
            <div
              style="width: 90%"
              v-for="convi in currentConversation.conversa"
              :key="convi.text"
            >
              <div
                v-if="
                  convi.audio == false &&
                  convi.video == false &&
                  convi.img == false
                "
              >
                <q-chat-message
                  :name="convi.name"
                  :text="[convi.text]"
                  :sent="convi.name != currentConversation.person"
                  :stamp="convi.time"
                  :bg-color="
                    convi.name != currentConversation.person
                      ? 'positive'
                      : 'info'
                  "
                >
                </q-chat-message>
              </div>
              <div v-if="convi.img == true">
                <q-chat-message
                  style="wid"
                  :name="convi.name"
                  :text="null"
                  :stamp="convi.time"
                  :sent="convi.name != currentConversation.person"
                  :bg-color="
                    convi.name != currentConversation.person
                      ? 'positive'
                      : 'info'
                  "
                >
                  <div style="width: 500px">
                    <q-img :src="convi.data"></q-img>
                  </div>
                </q-chat-message>
              </div>
              <q-chat-message
                v-if="convi.audio == true"
                :name="convi.name"
                :text="null"
                :stamp="convi.time"
                :sent="convi.name != currentConversation.person"
                :bg-color="
                  convi.name != currentConversation.person ? 'positive' : 'info'
                "
              >
                <div>
                  <audio ref="player" controls>
                    <source :src="convi.data" type="audio/x-wav" />
                  </audio>
                </div>
              </q-chat-message>
              <q-chat-message
                v-if="convi.video == true"
                :name="convi.name"
                :text="null"
                :sent="convi.name != currentConversation.person"
                :bg-color="
                  convi.name != currentConversation.person ? 'positive' : 'info'
                "
              >
                <div style="width: 400px">
                  <video controls style="width: 400px">
                    <source :src="convi.data" />
                  </video>
                </div>
              </q-chat-message>
            </div>
          </div>
          <div class="q-pa-md justify-center" v-else>
            <q-img
              src="~/assets/logo.png"
              style="
                max-width: 400px;
                height: 250px;
                margin-top: 20%;
                margin-left: 36%;
              "
              fit="contain"
            ></q-img>
          </div>
        </div>
      </q-page-container>
      <!-- mensage-->
      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input
            :disable="currentConversation == null"
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            @keydown.enter="sendMensagem(message)"
            placeholder="Message"
          />
          <q-btn
            round
            :disable="currentConversation == null"
            flat
            icon="send"
            @click="sendMensagem(message)"
          />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { socket } from "../boot/socket.io";
import { LocalStorage, scroll } from "quasar";
import Swal from "sweetalert2";

const Buffer = require("buffer/").Buffer;
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "WhatsappLayout",
  data() {
    return {
      currentConversationIndex: ref(0),
      currentConversation: ref(null),
      leftDrawerOpen: ref(null),
      search: ref(null),
      style: ref(null),
      message: ref(null),
      conversations: ref([]),
      toggleLeftDrawer: ref(true),
    };
  },
  created() {
    socket.emit("disponivel", {
      fila: "TCOM",
      agente: this.$store.getters.agente,
    });
    this.style = { height: this.$q.screen.height + "px" };

    this.currentConversation =
      this.conversations.length >= 1 ? this.conversations[0] : null;

    socket.on("msgToClient", (dados) => {
      this.scrollBottom();
      this.playbeep();
      let index = null;
      for (let i = 0; i < this.conversations.length; i++) {
        if (this.conversations[i].person == dados.dados.person) {
          index = i;
          i = this.conversations.length;
        }
      }
      if (index == null) {
        this.conversations.push({
          id: dados.dados.id,
          person: dados.dados.person,
          caption: dados.dados.caption,
          time: dados.conversa.slice(-1)[0].time.split(" ")[1],
          sent: true,
          deleted: false,
          img: dados.dados.img,
          messagenotread: 1,
          conversa: dados.conversa,
          queue: dados.queue,
        });
      } else {
        if (this.currentConversation != null) {
          if (this.currentConversation.person == dados.dados.person) {
            this.conversations[index].messagenotread = 0;
          } else {
            this.conversations[index].messagenotread += 1;
          }
        } else {
          this.conversations[index].messagenotread += 1;
        }

        this.conversations[index].conversa = dados.conversa;
        this.conversations[index].time = dados.conversa
          .slice(-1)[0]
          .time.split(" ")[1];
      }
    });
    socket.on("NewmsgClient", (dado) => {
      this.scrollBottom();
      this.playbeepNewChat();
      let dados = { ...dado.dados };
      this.conversations.push({
        id: dados.id,
        person: dados.person,
        caption: dados.caption,
        time: dado.conversa.slice(-1)[0].time.split(" ")[1],
        img: dados.img,
        messagenotread: 1,
        sent: true,
        deleted: false,
        queue: dado.queue,
        conversa: dado.conversa,
      });
    });
  },
  methods: {
    ...mapActions(["playbeep", "playbeepNewChat"]),
    checkchatAtivo(dados) {
      if (this.currentConversation != null) {
        if (this.currentConversation.person == dados.person) {
          return "chatAtivo";
        }
      }
    },
    scrollBottom() {
      const el = this.$refs.containerMensagem;
      const { getScrollTarget, setVerticalScrollPosition } = scroll;
      const target = getScrollTarget(el);
      if (el === undefined) {
        setVerticalScrollPosition(target, 0);
      } else {
        const offset = el.scrollHeight;
        setVerticalScrollPosition(target, offset, 500);
      }
    },

    sendMensagem(mensagem) {
      this.currentConversation.conversa.push({
        name: "Atendente",
        text: mensagem,
        audio: false,
        img: false,
        video: false,
        data: null,
      });
      socket.emit("msgToServer", {
        from: this.currentConversation.caption,
        text: mensagem,
        userName: "Atendente",
      });
      this.message = null;
      this.scrollBottom();
    },
    finalizarchat() {
      Swal.fire({
        title: "Deseja finalizar esse atendimento?",
        text: "Você não será capaz de reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim!",
      }).then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.conversations.length; i++) {
            if (
              this.conversations[i].caption == this.currentConversation.caption
            ) {
              this.conversations.splice(i, 1);
              i = this.conversations.length;
            }
          }
          socket.emit("finalizarchat", {
            from: this.currentConversation.caption,
            queue: this.currentConversation.queue,
          });
          this.currentConversation = null;
          Swal.fire(
            "Finalizado!",
            "Esse atendimento foi finalizado",
            "success"
          );
        }
      });
    },
    setCurrentConversation(index) {
      this.currentConversation = this.conversations[index];
      this.conversations[index].messagenotread = 0;
      this.scrollBottom();
    },
  },
};
</script>
<style>
.chat {
  background-image: url("../assets/fundo.png");
}
.chatAtivo {
  background-color: #cbcbcb;
}
.swal2-container {
  z-index: 0;
}
</style>
<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color:#2d385e
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
