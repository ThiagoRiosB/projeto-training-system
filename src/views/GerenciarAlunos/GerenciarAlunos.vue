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
        <div class="d-flex justify-space-between">
          <div>
            <v-icon icon="mdi-account-multiple" size="50"></v-icon>
            <v-text class="pa-5 font-weight-bold">Alunos</v-text>
          </div>
          <div>
            <v-btn variant="elevated"><router-link class="text-decoration-none text-black" to="/cadastrar-aluno">Novo</router-link></v-btn>
          </div>
        </div>
        <v-divider class="my-3"></v-divider>
        <div class="d-flex">
          <v-text-field class="mr-15"  v-model="filtro" variant="outlined" type="text" label="Digite o nome do aluno" placeholder="Digite o nome do aluno"/>
        </div> 
          <v-card flat class="border mt-15">
            <v-table density="compact">
              <thead>
                <tr>
                  <th>
                    Nome
                  </th>
                  <th>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody v-if="studentsName.students">
              <tr v-for="studentsNames in nomesFiltrados" :key="studentsNames.id">
                <td>{{ studentsNames.name }}</td>

                <td>
                  <v-btn @click="() => redirectCadastrarTreino(studentsNames)">Montar treino</v-btn>
                  <v-btn @click="() => redirectVizualizarTreino(studentsNames)">Ver</v-btn>
                </td>
              </tr>
             </tbody>
            </v-table>
          </v-card>     
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
      studentsName: {},
      userInfo: {},
      isDrawerOpen: false,
      filtro: "",
    }
  },
  mounted(){
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