<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8">
        <v-card>
          <v-card-title class="headline">
            <b>Información de la solicitud</b>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <span>
              <b>Asunto</b>
            </span>
            <p class="mb-2">{{ (pqr && pqr.subject) ? pqr.subject : "No se encontró" }}</p>
            <span>
              <b>Tipo</b>
            </span>
            <p class="mb-2">{{ requestType((pqr && pqr.request_type) ? pqr.request_type : "No se encontró") }}</p>
            <span>
              <b>Estado</b>
            </span>
            <p class="mb-2">{{ requestState((pqr && pqr.request_state) ? pqr.request_state : "No se encontró") }}</p>
            <span>
              <b>Descripción</b>
            </span>
            <p class="mb-2">{{ ( pqr && pqr.description ) ? pqr.description : "No se encontró" }}</p>

            <v-divider class="mb-2"></v-divider>

            <span class="headline group">
              <b>Anotaciones</b>
            </span>
            <span class="float-right mt-2">
              Nueva anotación
              <v-icon medium @click.stop="newNoteModal = true">mdi-plus-box-outline</v-icon>
            </span>

            <div v-if="notes" class="mt-3">
              <div v-for="(note,index) in notes" :key="index">
                <span><b>{{ note.user.name }}</b></span>
                <p>
                  {{ note.description }}
                </p>
              </div>
            </div>

            <div v-if="pqr && pqr.request_state == 'solved'">
              <v-divider></v-divider>

              <span>
                <b>
                  Aquí se supone que iría para "re-abrir" el asunto que parece inconcluso
                </b>
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="newNoteModal" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title class="justify-center headline">Crear nueva nota</v-card-title>

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card-text>
            <v-textarea
              label="Nota:"
              auto-grow
              v-model="newNote"
              :rules="[ rules.required ]"
              placeholder="Por favor escriba su nota."
            ></v-textarea>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn @click="submit" :disabled="!valid">submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowUserPQR",
  data() {
    return {
      newNoteModal: false,
      valid: true,
      newNote: "",
      rules: {
        required: (v) => !!v || "Required",
      },
      notes: []
    };
  },
  props: ["pqr"],
  methods: {
    requestType(text) {
      if (text && text == "request") {
        return "Petición";
      } else if (text && text == "complain") {
        return "Queja";
      } else if (text && text == "claim") {
        return "Reclamo";
      }
      return text;
    },
    requestState(text) {
      if (text && text == "settled") {
        return "Abierta";
      } else if (text && text == "in_progress") {
        return "En progreso";
      } else if (text && text == "solved") {
        return "Resuleta";
      } else if (text && text == "closed") {
        return "Cerrada";
      }
      return text;
    },
    submit() {
      axios
        .post(
          "https://pqr-api-rails.herokuapp.com/notes/create/" + this.pqr.id,
          {
            description: this.newNote,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if(response && response.data && response.data.status && response.data.status == "ok"){
            this.findAllPQRNotes();
            this.newNoteModal = false;
          } else {
            this.newNoteModal = false;
            this.$router.push("/user/list")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findAllPQRNotes() {
      axios
        .get(
          "https://pqr-api-rails.herokuapp.com/notes/get_notes/" + this.pqr.id,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if(response && response.data && response.data.notes){
            this.notes = response.data.notes
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (this.pqr) {
      this.findAllPQRNotes();
    } else {
      this.$router.push("/user/list");
    }
  },
};
</script>

<style>
</style>