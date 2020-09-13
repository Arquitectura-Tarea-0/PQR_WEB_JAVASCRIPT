<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title class="headline justify-center">Hi! Joins us!</v-card-title>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-card-text>
              <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
              <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn @click="submit" :disabled="!valid">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
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
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox,
        });
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