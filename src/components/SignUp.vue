<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card>

          <v-form v-model="valid" ref="form" lazy-validation class="ma-5 pr-5 pl-5 pb-5">
            <v-card-text>
              <v-text-field label="Correo" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Contraseña" v-model="password" :rules="passwordRules" required></v-text-field>
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
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      //(v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox,
        });
      }
    },
  },
};
</script>

<style>
</style>