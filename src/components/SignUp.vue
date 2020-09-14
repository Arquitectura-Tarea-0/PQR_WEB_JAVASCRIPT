<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card>
          <v-form v-model="valid" ref="form" lazy-validation class="ma-5 pr-5 pl-5 pb-5">
            <v-card-text>
              <v-text-field label="Nombre" v-model="name" :rules="nameRules" required></v-text-field>
              <v-text-field label="Correo" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Contraseña" v-model="password" :rules="passwordRules" required></v-text-field>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn block @click="submit" :disabled="!valid">Registrarme</v-btn>
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
    name: "",
    nameRules: [
      (v) => !!v || "Name is required"
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required"
    ],
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("https://pqr-api-rails.herokuapp.com/users", {
          name: this.name,
          email: this.email,
          password: this.password
        }).then(
          response => {
            if(response && response.data && response.data.token && response.data.user){
              localStorage.setItem("token", response.data.token)
              localStorage.setItem("user", response.data.user)

              this.$router.push("/user")
            } else {
              this.$router.push("/")
            }
          }
        ).catch(
          error => {
            console.log(error)
          }
        );
      }
    },
  },
};
</script>

<style>
</style>