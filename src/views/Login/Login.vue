<template>
      <v-app>
        <v-main>
          <h1 class="text-h2 pt-2 text-center">Training System</h1>
          <v-container class="d-flex justify-center h-screen align-center">
            <v-form ref="form" class="d-flex flex-column w-50 border rounded elevation-2 pa-5" @submit.prevent="handleSubmit">
              <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxrUmpDP6a9V7ZBXWH8X0zWhq19tXMe7q2V-TTqQyeS_X9S0mxQibS2c4iLWPgzPAEF8&usqp=CAU" class="w-50 ma-auto"></v-img>
              <v-text-field  v-model="usuario.email" :rules="[value => !!value || 'O e-mail é obrigatório']" variant="outlined" type="email" label="Email" placeholder="Email"/>
              <v-text-field v-model="usuario.password" :rules="[value => !!value || 'A senha é obrigatória!']" variant="outlined" type="password" label="Senha" placeholder="Senha"/>
               <v-btn class="w-25" type="submit">Entrar</v-btn>
               <div class="border-b w-75 mt-10 ma-auto"></div>
               <p class="ma-auto mt-3">Ainda não tem conta? <router-link class="text-decoration-none text-black font-weight-bold" to="/cadastrar-usuario">Cadastre-se</router-link></p>
             </v-form>
          </v-container>
        </v-main>
      </v-app> 
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        usuario: {
        email: "",
        password: ""
      },
      }
    },
    methods: {
      async handleSubmit() {
        const {valid} = await this.$refs.form.validate()

        if(!valid) {
          alert("Preencha todos os dados!")
          return
        }

        try {
          const resultado = await axios.post('http://localhost:3000/sessions', this.usuario)

          if(resultado.status == 200) {
            localStorage.setItem("user-info", JSON.stringify(resultado.data))
            this.$router.push('/dashboard')
          }
        } catch(error) {
          alert('Usuário não cadastrado')
          this.$refs.form.reset()
        }
      }
    }
  }
</script>