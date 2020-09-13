<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-btn text to="/register">
        <span>registrarse</span>
      </v-btn>
      <v-btn text to="/">
        <span>iniciar sesión</span>
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
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
  },
};
</script>
