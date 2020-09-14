<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card>
          <v-form v-model="valid" ref="form" lazy-validation class="ma-5 pr-5 pl-5 pb-5">
            <v-card-text>
              <v-text-field label="Correo" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
              <v-text-field
                label="Contraseña"
                v-model="password"
                type="password"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn block @click="submit" :disabled="!valid">Iniciar sesión</v-btn>
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
    email: "",
    password: "",
    rules: {
      required: (v) => !!v || "Required",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios
          .post("https://pqr-api-rails.herokuapp.com/login", {
            password: this.password,
            email: this.email,
          })
          .then((response) => {
            if(response && response.data && response.data.token && response.data.user){
              localStorage.setItem("token", response.data.token)
              localStorage.setItem("user", response.data.user)

              if(response.data.user.role && response.data.user.role == "admin"){
                this.$router.push("/admin");
              } else {
                this.$router.push("/user");
              }
            } else {
                this.$router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>