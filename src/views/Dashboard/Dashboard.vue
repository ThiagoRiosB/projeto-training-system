<template>
  <v-app>
    <v-navigation-drawer v-model="isDrawerOpen">
      <v-list>
        <v-list-item prepend-icon="mdi-home"><router-link class="text-decoration-none text-black" to="/dashboard">Home</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-account"><router-link class="text-decoration-none text-black" to="/gerenciar-alunos">Gerenciar alunos</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-weight-lifter"><router-link class="text-decoration-none text-black" to="/gerenciar-exercicios">Gerenciar exercícios</router-link></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat class="border-b" color="grey-lighten-2">
      <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
      <v-app-bar-title>Lab Treinos</v-app-bar-title>
      <template #append>
        <v-btn icon>
          <v-menu>
            <template #activator="{props}">
              <v-avatar v-bind="props">
                <v-icon icon="mdi-account-circle" size="50"></v-icon>
              </v-avatar>
            </template>
            <v-card min-width="200px">
              <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar >
                  <v-icon icon="mdi-account-circle" size="50"></v-icon>               
                </v-avatar> 
                <v-card-title >{{ userInfo.name }}</v-card-title>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text"><router-link class="text-decoration-none text-black" to="/">Sair</router-link></v-btn>
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
        <v-row class="d-flex justify-space-between mt-10">
          <v-col cols="12" md="4" lg="3">
            <v-card max-width="344" variant="outlined" class="d-flex justify-space-between">
             <v-car-item>
              <v-card-text class="pa-2">{{ dashboardInfo.amount_students }} Alunos</v-card-text>
              <v-card-actions>
              <v-btn variant="outlined">
                <router-link class="text-decoration-none text-black" to="/cadastrar-aluno">
              Adicionar</router-link>
             </v-btn>
             </v-card-actions>
            </v-car-item>
            <v-card-item>
              <v-icon icon="mdi-account-multiple" size="50"></v-icon>
            </v-card-item>
          </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-card max-width="344" variant="outlined" class="d-flex justify-space-between">
            <v-car-item>
              <v-card-text class="pa-2">{{ dashboardInfo.amount_exercises }} Exercícios</v-card-text>
              <v-card-actions>
              <v-btn variant="outlined"><router-link class="text-decoration-none text-black" to="/cadastrar-treino">
              Adicionar</router-link>
             </v-btn>
             </v-card-actions>
            </v-car-item>
            <v-card-item>
              <v-icon icon="mdi-arm-flex" size="50"></v-icon>
            </v-card-item>
          </v-card>
          </v-col>
        </v-row>   
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
 import {ref} from 'vue'
  const isDrawerOpen = ref(false)

  export default {
  data() {
    return {
      dashboardInfo: {},
      userInfo: {},
      isDrawerOpen : false
    }
  },
    mounted(){
      axios.get('http://localhost:3000/dashboard')
      .then(res => this.dashboardInfo = res.data)
      .catch(error => console.log(error))

    this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null
    }
  }
</script>