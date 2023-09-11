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
        <v-icon icon="mdi-arm-flex" size="50"></v-icon>
        <v-text class="pa-5 font-weight-bold">Treino</v-text> 
        <v-divider class="my-3"></v-divider>
        <v-card flat class="border mt-15 d-flex flex-column">
          <v-form ref="form" class="ma-10" @submit.prevent="handleSubmit">

          <v-row v-if="trainingLoaded">
             <v-select  :items="training" item-title="description" item-value="id" :rules="[value => !!value || 'Selecione algum exercício']" class="pa-5"  v-model="exercise_id" variant="outlined" label="Qual exercício" placeholder="Qual exercício"/>   
          </v-row> 

          <v-row>
            <v-text-field class="pa-5" v-model="repetitions" :rules="[value => value >= 1 || 'Informe a quantidade de repetições', value => Number.isInteger(Number(value)) || 'Apenas números inteiros']" variant="outlined" 
           type="number" label="Repetições" placeholder="Repetições"/>
           <v-text-field class="pa-5" v-model="weight" :rules="[value => value >= 1 || 'Informe o peso utilizado']" variant="outlined" type="number" label="Quilos" placeholder="Quilos"/>
           <v-text-field class="pa-5" v-model="break_time" :rules="[value => value >= 30 || 'Mínimo 30 segundos']" variant="outlined" type="number" label="Pausa(em segundos)" placeholder="Pausa(em segundos)"/>   
            <v-select :items="['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']" variant="outlined" v-model="day"/>      
         </v-row>
           
          <v-row>
            <v-textarea class="pa-5" v-model="observations" variant="outlined"
             type="text" label="Observações" placeholder="Observações"/>
          </v-row>
         
         <v-row> 
          <v-btn class="ma-2" variant="elevated" type="submit">Cadastrar</v-btn>
         </v-row>    
        </v-form> 
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
      training: {},
      isDrawerOpen: false,
      exercise_id: "",
      repetitions: null,
      weight: null,
      break_time: null,
      observations: "",
      day: this.getCurrentDay(),
      trainingLoaded: false,
    }
  },
  async mounted(){
    try {
      const response = await axios.get('http://localhost:3000/exercises');
      this.training = response.data;

      this.trainingLoaded = true;

      this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null;
     }catch (error) {
      console.error('Erro ao carregar os dados da API', error);
    }
    },


    methods: {

      getCurrentDay(){
      const value = new Date().getDay()
      
      const days = [
        {value: 'Segunda', number: 1},
        {value: 'Terça', number: 2},
        {value: 'Quarta', number: 3},
        {value: 'Quinta', number: 4},
        {value: 'Sexta', number: 5},
        {value: 'Sábado', number: 6},
        {value: 'Domingo', number: 0}
      ]

      const option = days.find(item => item.number === value)

      return option.value
      },
    
      async handleSubmit() {
      const {valid} = await this.$refs.form.validate()

     if(!valid) {
          alert("Preencha todos os dados obrigatórios!")
          return
        }      

        axios({
          url: 'http://localhost:3000/workouts',
          method: 'POST',
          data: {
            exercise_id: this.exercise_id,
            student_id: this.$route.params.id,
            repetitions: this.repetitions,
            weight: this.weight,
            break_time: this.break_time,
            observations: this.observations,
            day: this.day,
            
           }
        })
        .then(() => {
            alert('Exercício cadastrado com sucesso')
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