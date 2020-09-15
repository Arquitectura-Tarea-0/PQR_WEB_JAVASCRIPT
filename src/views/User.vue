<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-btn text to="/user/list">
        <span>Mis PQR</span>
      </v-btn>
      <v-btn text to="/user">
        <span>Crear PQR</span>
      </v-btn>
      <v-btn text @click="closeSession()">
        <span>Cerrar sesión</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer>
      <span>All rights reserved © Javascript Team {{ new Date().getYear() + 1900 }}</span>
      <v-spacer></v-spacer>
      <span>Profe.. un 5.0 todo bien</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    closeSession(){
      localStorage.clear()
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>