<template>
  <v-app theme="dark" id="background">
    <v-main>
      <v-container class="d-flex justify-center justify-md-end h-screen align-center">
        <v-form id="form-container" ref="form" style="width: 40%; background-color: rgba(97, 90, 90, 0);"
          class="d-flex flex-column border rounded elevation-2 pa-10 mt-5" @submit.prevent="handleSubmit">
          <h1 class="text-h4 mb-5 pt-2 text-center text-orange-accent-3">Crie sua conta</h1>
          <v-text-field class="pt-2" v-model="name" :rules="[value => validateName(value) || 'Nome inválido']"
            variant="outlined" type="text" label="Nome completo" placeholder="Nome completo" />
          <v-text-field class="pt-2" v-model="email" :rules="[value => validateEmail(value) || 'E-mail inválido']"
            variant="outlined" type="email" label="E-mail" placeholder="E-mail" />
          <v-text-field class="pt-2" v-model="password"
            :rules="[value => value.length >= 8 || 'A senha deve ter no mínimo 8 caracteres!', value => value.length <= 20 || 'A senha deve ter no máximo 20 caracteres!']"
            variant="outlined" type="password" label="Senha" placeholder="Senha" />
          <v-text-field class="pt-2" v-model="confirmPassword"
            :rules="[value => value == password || 'As senhas devem ser iguais!']" variant="outlined" type="password"
            label="Confirmar Senha" placeholder="Confirmar senha" />
          <v-select item-title="Bronza" v-model="type_plan" label="Escolha o plano" placeholder="Escolha o plano"
            variant="outlined" :items="items"></v-select>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  variant="outlined" color="orange-accent-3" type="submit">Cadastrar</v-btn>
            <div class="pa-2">
               <router-link
                  class="text-decoration-none text-orange" to="/"><v-btn variant="outlined" color="orange-accent-3" type="button">Voltar</v-btn></router-link>
            </div>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-main>

  </v-app>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#background {
  background-image: url('../../img/img-cadastro-usuario.png');
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}

@media (max-width: 960px) {
  #background {
    background-image: none;
  }

  #form-container {
    min-width: 400px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
<script>
import axios from "axios"
export default {

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type_plan: "Bronze",
      items: ['Bronze', 'Silver', 'Gold']
    }
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (emailRegex.test(email)) {
        return true
      } else {
        return false
      }
    },
    validateName(name) {
      const nameRegex = /^(?!\s)[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/;

      if (nameRegex.test(name)) {
        return true
      } else {
        return false
      }
    },

    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()

      if (!valid) {
        alert("Preencha os dados corretamente!")
        return
      }
      axios({
        url: 'http://localhost:3000/users',
        method: 'POST',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          type_plan: this.type_plan
        }
      })
        .then(() => {
          alert('Cadastrado com sucesso')
          this.$router.push('/')
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