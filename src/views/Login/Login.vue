<template >
  <v-app theme="dark" id="background-container">
    <v-main>
      <v-container class="d-flex justify-center h-screen align-center">
        <v-form ref="form" style="background-color: rgba(0, 0, 0, 0.627);"
          class="d-flex flex-column w-30 border rounded elevation-2 pa-5" @submit.prevent="handleSubmit">
          <img src="../../img/img-fundo-transparente.png" class="w-50 ma-auto" alt="img-logo">
          <v-text-field v-model="user.email" :rules="[value => !!value || 'O e-mail é obrigatório']" variant="outlined"
            type="email" label="Email" placeholder="Email" />
          <v-text-field v-model="user.password" :rules="[value => !!value || 'A senha é obrigatória!']" variant="outlined"
            type="password" label="Senha" placeholder="Senha" />
          <v-btn variant="outlined" color="orange-accent-3" class="w-25 bg-grey-darken-3" type="submit">Entrar</v-btn>
          <div class="border-b w-75 mt-10 ma-auto"></div>
          <p class="ma-auto mt-3">Ainda não tem conta? <router-link
              class="text-decoration-none text-orange-darken-1 font-weight-bold"
              to="/cadastrar-usuario">Cadastre-se</router-link></p>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
#background-container {
  background-image: url('../../img/img-logo2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}
</style>

<script>
import axios from "axios"
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
    }
  },
  methods: {
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()

      if (!valid) {
        alert("Preencha todos os dados!")
        return
      }

      try {
        const resultado = await axios.post('http://localhost:3000/sessions', this.user)

        if (resultado.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(resultado.data))
          this.$router.push('/dashboard')
        }
      } catch (error) {
        alert('Usuário não encontrado')
        this.$refs.form.reset()
      }
    }
  }
}
</script>