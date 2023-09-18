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
        <div class="d-flex justify-space-between">
          <div>
            <v-icon icon="mdi-account-multiple" size="50"></v-icon>
            <v-text class="pa-5 font-weight-bold">Alunos</v-text>
          </div>
          <div>
            <v-btn variant="outlined" color="orange"><router-link class="text-decoration-none text-white"
                to="/cadastrar-aluno">Novo</router-link></v-btn>
          </div>
        </div>
        <v-divider class="my-3"></v-divider>
        <div class="d-flex">
          <v-text-field class="mr-15" v-model="filtro" variant="outlined" type="text" label="Digite o nome do aluno"
            placeholder="Digite o nome do aluno" />
        </div>
        <div class="d-flex flex-column flex-md-row">
          <v-card color="orange" flat class="border mt-15 w-75 ma-auto">
            <v-table class="pa-1" density="compact">
              <thead>
                <tr>
                  <th>
                    Nome
                  </th>
                </tr>
              </thead>
              <tbody v-if="studentsName.students">
                <tr v-for="studentsNames in nomesFiltrados" :key="studentsNames.id">
                  <td class="pa-2">{{ studentsNames.name }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-card color="orange" flat class="border mt-15 w-50 ma-auto">
            <v-table density="compact">
              <thead>
                <tr>
                  <th>
                    Ações
                  </th>
                </tr>
              <tbody v-if="studentsName.students">
                <tr v-for="studentsNames in nomesFiltrados" :key="studentsNames.id">
                  <td class="pa-1">
                    <v-btn variant="outlined" color="orange" class="mr-4"
                      @click="() => redirectCadastrarTreino(studentsNames)">Montar treino</v-btn>
                    <v-btn variant="outlined" color="orange"
                      @click="() => redirectVizualizarTreino(studentsNames)">Ver</v-btn>
                  </td>
                </tr>
              </tbody>
              </thead>
            </v-table>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
const isDrawerOpen = ref(false)

export default {
  data() {
    return {
      studentsName: {},
      userInfo: {},
      isDrawerOpen: false,
      filtro: "",
    }
  },
  mounted() {
    axios.get('http://localhost:3000/students')
      .then(res => this.studentsName = res.data)
      .catch(error => console.log(error))

    this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null
  },
  computed: {
    nomesFiltrados() {
      return this.studentsName.students.filter(nome =>
        nome.name.toLowerCase().includes(this.filtro.toLowerCase())
      );
    },
  },
  methods: {
    redirectCadastrarTreino(treino) {
      this.$router.push({
        path: `/cadastrar-treino/${treino.id}`,
      })
    },
    redirectVizualizarTreino(vizualizar) {
      this.$router.push({
        path: `/visualizar-treino/${vizualizar.id}`,
      })
    }

  }
}
</script>