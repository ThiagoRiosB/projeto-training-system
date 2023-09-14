<template>
  <v-app theme="dark">
    <v-navigation-drawer color="gray-darken-1" v-model="isDrawerOpen">
      <v-list>
        <v-list-item prepend-icon="mdi-home"><router-link class="text-decoration-none text-white"
            to="/dashboard">Home</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-account"><router-link class="text-decoration-none text-white"
            to="/gerenciar-alunos">Gerenciar alunos</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-weight-lifter"><router-link class="text-decoration-none text-white"
            to="/gerenciar-exercicios">Gerenciar exercícios</router-link></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat class="border-b" color="gray-darken-1">
      <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
      <template #append>
        <div class="mr-16">
          <img class="w-25 mr-16 d-none d-md-flex d-xl-none" src="../../img/img-fundo-transparente.png" alt="logo">
        </div>
        <v-btn icon>
          <v-menu>
            <template #activator="{ props }">
              <v-avatar v-bind="props">
                <v-icon color="white" icon="mdi-account-circle" size="50"></v-icon>
              </v-avatar>
            </template>
            <v-card min-width="200px">
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar>
                    <v-icon color="white" icon="mdi-account-circle" size="50"></v-icon>
                  </v-avatar>
                  <v-card-title>{{ userInfo.name }}</v-card-title>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text"><router-link class="text-decoration-none text-white"
                      to="/">Sair</router-link></v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main class="ma-15">
      <v-container>
        <h1 class="text-h4">Bem vindo, {{ userInfo.name }}</h1>
        <v-row class="d-flex justify-center mt-10">
          <v-col class="mr-5" cols="12" md="4" lg="3">
            <v-card style="width: 300px;" color="orange" variant="outlined" class="d-flex flex-column">
              <img style="width: 450px;" src="../../img/img-card-alunos.jpg" alt="card-alunos">
              <v-text class="pa-2 text-white text-center">{{ dashboardInfo.amount_students }} Alunos cadastrados</v-text>
              <v-btn color="orange" class="bg-orange-accent-3" variant="outlined">
                <router-link class="text-decoration-none text-white" to="/gerenciar-alunos/">
                  Adicionar</router-link>
              </v-btn>
            </v-card>

          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-card color="orange" style="width: 300px;" variant="outlined" class="d-flex flex-column">
              <img style="width: 300px;" src="../../img/img-card-exercicios.png" alt="card-exercicios">
              <v-text class="pa-2 text-white text-center">{{ dashboardInfo.amount_exercises }} Exercícios
                cadastrados</v-text>
              <v-btn color="orange" class="bg-orange-accent-3" variant="outlined"><router-link
                  class="text-decoration-none text-white" to="/gerenciar-exercicios">
                  Adicionar</router-link>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="bg-black">

    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
const isDrawerOpen = ref(false)

export default {
  data() {
    return {
      dashboardInfo: {},
      userInfo: {},
      isDrawerOpen: false
    }
  },
  mounted() {
    axios.get('http://localhost:3000/dashboard')
      .then(res => this.dashboardInfo = res.data)
      .catch(error => console.log(error))

    this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null
  }
}
</script>