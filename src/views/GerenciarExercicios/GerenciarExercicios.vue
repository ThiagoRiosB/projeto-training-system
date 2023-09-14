<template>
  <v-app theme="dark">
    <v-navigation-drawer color="gray-darken-1" v-model="isDrawerOpen">
      <v-list>
        <v-list-item prepend-icon="mdi-home"><router-link class="text-decoration-none text-white" to="/dashboard">Home</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-account"><router-link class="text-decoration-none text-white" to="/gerenciar-alunos">Gerenciar alunos</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-weight-lifter"><router-link class="text-decoration-none text-white" to="/gerenciar-exercicios">Gerenciar exercícios</router-link></v-list-item>
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
            <template #activator="{props}">
              <v-avatar v-bind="props">
                <v-icon color="white" icon="mdi-account-circle" size="50"></v-icon>
              </v-avatar>
            </template>
            <v-card min-width="200px">
              <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar >
                  <v-icon color="white" icon="mdi-account-circle" size="50"></v-icon>               
                </v-avatar> 
                <v-card-title >{{ userInfo.name }}</v-card-title>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text"><router-link class="text-decoration-none text-white" to="/">Sair</router-link></v-btn>
              </div>        
            </v-card-text>
            </v-card>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main class="ma-15">
      <v-container>
        <div>
          <v-icon icon="mdi-arm-flex" size="50"></v-icon>
          <v-text class="pa-5 font-weight-bold">Exercícios</v-text>
        </div>
        <v-divider class="my-3 "></v-divider>
        <v-form ref="form" class="d-flex" @submit.prevent="handleSubmit">
          <v-text-field class="mr-15"  v-model="description" :rules="[value => !!value || 'O nome do exercício é obrigatório']" variant="outlined" type="text" label="Digite o nome do exercício" placeholder="Digite o nome do exercício"/>
          <v-btn class="pl-2 text-white" color="orange" variant="outlined" type="submit">Cadastrar</v-btn>
        </v-form> 
          <v-card color="orange" flat class="border mt-15">
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="font-weight-black">
                    Nome
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="trainings in training" :key="trainings.id">
                <td>{{ trainings.description }}</td>
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
      training: {},
      userInfo: {},
      isDrawerOpen: false,
      description: ""
    }
  },
  mounted(){
      axios.get('http://localhost:3000/exercises')
      .then(res => this.training = res.data)
      .catch(error => console.log(error))

    this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null
    },
    methods: {
      async handleSubmit() {
      const {valid} = await this.$refs.form.validate()

      if(!valid) {
          alert("Preencha o campo!")
          return
        }
        axios({
          url: 'http://localhost:3000/exercises',
          method: 'POST',
          data: {
            description: this.description
          }
        })
        .then(() => {
            alert('Cadastrado com sucesso')
            this.$refs.form.reset()
          })
          .catch((error) => {
            console.log(error)
            alert('Houve uma falha ao tentar cadastrar')
            this.$refs.form.reset()
          })
    }
  }
}
</script>