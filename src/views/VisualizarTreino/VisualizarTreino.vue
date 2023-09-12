<template>
  <v-app>
    <v-navigation-drawer v-model="isDrawerOpen">
      <v-list>
        <v-list-item prepend-icon="mdi-home"><router-link class="text-decoration-none text-black"
            to="/dashboard">Home</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-account"><router-link class="text-decoration-none text-black"
            to="/gerenciar-alunos">Gerenciar alunos</router-link></v-list-item>
        <v-list-item prepend-icon="mdi-weight-lifter"><router-link class="text-decoration-none text-black"
            to="/gerenciar-exercicios">Gerenciar exercícios</router-link></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat class="border-b" color="grey-lighten-2">
      <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
      <v-app-bar-title>Lab Treinos</v-app-bar-title>
      <template #append>
        <v-btn icon>
          <v-menu>
            <template #activator="{ props }">
              <v-avatar v-bind="props">
                <v-icon icon="mdi-account-circle" size="50"></v-icon>
              </v-avatar>
            </template>
            <v-card min-width="200px">
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar>
                    <v-icon icon="mdi-account-circle" size="50"></v-icon>
                  </v-avatar>
                  <v-card-title>{{ userInfo.name }}</v-card-title>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text"><router-link class="text-decoration-none text-black"
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
        <v-icon icon="mdi-account-multiple" size="50"></v-icon>
        <v-text class="pa-5 font-weight-bold">Treinos - </v-text>
        <v-text class="font-weight-bold" v-if="loaded">{{ studentsName[0].student_name }}</v-text>
        <v-divider class="my-3"></v-divider>

        <v-form ref="form" class="ma-10 mt-15 d-flex flex-column" @submit.prevent="handleSubmit">
          <v-row class="ma-10">
            <v-text class="text-h2">Hoje</v-text>
          </v-row>
          <div>
            <v-table density="compact">
              <tbody v-if="loaded">
                <tr v-for="treinosDia in exerciciosFiltrados" :key="treinosDia.id">
                  <p><input class="ma-2" type="checkbox" @click="postItens(treinosDia.id, studentId, treinosDia.day)" />{{
                    treinosDia.exercise_description }} | {{ treinosDia.weight }}KG | {{ treinosDia.repetitions
  }}repetições | {{ treinosDia.break_time }} segundos de pausa</p>
                </tr>
              </tbody>
            </v-table>
          </div>

          <div id="app">
            <div class="ma-10">
              <v-btn variant="text" @click="visualizarDadosCard('Segunda')">
                Segunda
              </v-btn>
              <v-btn variant="text" @click="visualizarDadosCard('Terça')">
                Terça
              </v-btn>
              <v-btn variant="text" @click="visualizarDadosCard('Quarta')">
                Quarta
              </v-btn>
              <v-btn variant="text" @click="visualizarDadosCard('Quinta')">
                Quinta
              </v-btn>
              <v-btn variant="text" @click="visualizarDadosCard('Sexta')">
                Sexta
              </v-btn>
              <v-btn variant="text" @click="visualizarDadosCard('Sábado')">
                Sábado
              </v-btn>
              <v-btn variant="text" @click="visualizarDadosCard('Domingo')">
                Domingo
              </v-btn>
            </div>

            <v-card class="pa-10" v-model="informacoesDia">
              <div class="pa-1" v-for="exerciciosDia of exerciciosDia">
                <p>{{ exerciciosDia.nome }} | {{ exerciciosDia.peso }}KG | {{ exerciciosDia.repeticoes }} repetições | {{
                  exerciciosDia.descanso }} segundos de pausa</p>
              </div>
            </v-card>
          </div>
        </v-form>
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
      el: "#app",
      studentsName: {},
      userInfo: {},
      isDrawerOpen: false,
      studentId: this.$route.params.id,
      loaded: "",
      workout_id: "",
      informacoesDia: "",
      exerciciosDia: []

    }
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.studentId}`);
      this.studentsName = response.data.workouts;

      this.loaded = true;

      this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null
    } catch (error) {
      console.error('Erro ao carregar os dados da API', error);
    }

  },
  computed: {
    exerciciosFiltrados() {
      const data = new Date()
      const day = data.getDay()
      const week = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
      const exercises = this.studentsName
      return exercises.filter(nome =>
        nome.day.toLowerCase().includes(week[day - 1].toLowerCase()))
    },
  },
  methods: {

    visualizarDadosCard(diaSelecionado) {
      this.exerciciosDia = []
      const daySelect = this.studentsName
      const diaSemana = daySelect.filter(clientes =>
        clientes.day === diaSelecionado)
      for (let index = 0; index < diaSemana.length; index++) {
        this.exerciciosDia.push({
          nome: diaSemana[index].exercise_description,
          peso: diaSemana[index].weight, repeticoes: diaSemana[index].repetitions,
          descanso: diaSemana[index].break_time, dia: diaSemana[index].day
        })
      }
    },
    postItens(workout_id, student_id, day_of_week) {
      axios({
        url: 'http://localhost:3000/workouts/check',
        method: 'POST',
        data: {
          workout_id: workout_id,
          student_id: student_id,
          day_of_week: day_of_week
        }
      })
    }
  },


}
</script>