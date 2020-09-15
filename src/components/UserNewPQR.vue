<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title class="justify-center">Crear una PQR</v-card-title>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-card-text>
              <v-row justify="center" align="center">
                <v-col cols="8">
                  <v-text-field
                    label="Asunto"
                    v-model="subject"
                    :rules="[ rules.required ]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    label="Item"
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-textarea
                    label="Descripción"
                    auto-grow
                    v-model="description"
                    :rules="[ rules.required ]"
                    placeholder="Por favor describa su petición, queja o reclamo."
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn @click="submit" :disabled="!valid">submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    subject: "",
    select: "Petición",
    description: "",
    rules: {
      required: (v) => !!v || "Required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    items: ["Petición", "Queja", "Reclamo"],
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post(
          "https://pqr-api-rails.herokuapp.com/requests/create",
          {
            subject: this.subject,
            description: this.description,
            //request_type: "FALTA IMPLEMENTAR"
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        ).then(
          response => {
            if(response && response.data && response.data.status && response.data.status == "ok"){
              this.$router.push("/user/list")
            }
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>