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
                <v-icon icon="mdi-account-multiple" size="50"></v-icon>
                <v-text class="pa-5 font-weight-bold">Alunos</v-text> 
             </div>
             <v-divider class="my-3"></v-divider>
          <v-card flat class="border mt-15 d-flex flex-column">
            <v-form ref="form" class="ma-10" @submit.prevent="handleSubmit">
                <v-row>
                  <v-col>
                    <v-text-field  v-model="name" :rules="[value => !!value || 'O nome é obrigatório']" variant="outlined" type="text" label="Nome completo" placeholder="Nome completo"/>
                    <v-text-field v-model="contact" :rules="[value => validateContact(value) || 'O número de telefone é obrigatório']" variant="outlined" type="number" label="Contato" placeholder="Contato"></v-text-field>
                  </v-col>               
        
                   <v-col>
                    <v-text-field  v-model="email" :rules="[value => validateEmail(value) || 'E-mail inválido']" variant="outlined" type="email" label="Email" placeholder="Email"/>
                    <VueDatePicker class="larger-date-input" id="dp__theme_dark" v-model="date_birth" :max-date="new Date()" :value="new Date()" locale="pt-BR" cancelText="cancelar" selectText="Selecionar" label="Selecione a data"
                   :format="format" :enable-time-picker="false"/>
                    </v-col>
                  </v-row>
              
                 <v-divider class="my-3 "></v-divider>

                 <v-row>
                    <v-text-field class="pa-5"  v-model="cep" :rules="[value => !!value || 'O CEP é obrigatório', value => value.length  == 8 || 'CEP inválido']" variant="outlined" type="number" label="CEP" placeholder="CEP" @blur="zipCodeRequest"/>
                    <v-text-field class="pa-5"  v-model="street" :rules="[value => !!value || 'O logradouro é obrigatório']" variant="outlined" type="text" label="Logradouro" placeholder="Logradouro"/>
                 </v-row>

                 <v-row>
                    <v-text-field class="pa-5" v-model="number" :rules="[value => !!value || 'O número é obrigatório']" variant="outlined" type="text" label="Número" placeholder="Número"/>
                    <v-select class="pa-5"  v-model="province" :rules="[value => !!value || 'O estado é obrigatório']" variant="outlined" label="Estado" placeholder="Estado"/>
                    <v-text-field class="pa-5"  v-model="neighborhood" :rules="[value => !!value || 'O bairro é obrigatório']" variant="outlined" type="text" label="Bairro" placeholder="Bairro"/>
                    <v-text-field class="pa-5" v-model="city" :rules="[value => !!value || 'A cidade é obrigatória']" variant="outlined" type="text" label="Cidade" placeholder="Cidade"/>
                    <v-text-field class="pa-5"  v-model="complement" variant="outlined" type="text" label="Complemento" placeholder="Complemento"/>
                  
                    
                </v-row>     
            <v-btn class="pl-2" variant="outlined" color="orange" type="submit">Cadastrar</v-btn>
            </v-form> 
           </v-card>
         </v-container>
    </v-main>
   
  </v-app>
</template>

<style>
#dp__theme_dark {
  --dp-background-color: #212121;
}
.larger-date-input input {
  width: 500px; 
  height: 55px;
  
}
</style>

<script>
  import axios from 'axios'
  import moment from "moment"
  import {ref} from 'vue'
  const isDrawerOpen = ref(false)

  export default {
  data() {
    return {
      studentsName: {},
      userInfo: {},
      isDrawerOpen: false,
      name: "",
      email: "",
      contact: "",
      date_birth: "",
      cep: "",
      street: "",
      number: "",
      province: "",
      neighborhood: "",
      city: "",
      complement: "",

    }
  },
  mounted(){

    this.userInfo = JSON.parse(localStorage.getItem('user-info')) || null
    },
    methods: {


      format(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
      validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
      if(emailRegex.test(email)){
        return true
      }else {
        return false
      }
  },
       validateContact(contact) {
        const regexTelefoneBrasileiro = /^(\(\d{2}\)\s?)?\d{4,5}\d{4}$/;

        if(regexTelefoneBrasileiro.test(contact)){
        return true
      }else {
        return false
      }
       },

        async zipCodeRequest() {
         try {
        const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        const responseJson = await response.json();
        this.street = responseJson.logradouro
        this.province = responseJson.uf
        this.neighborhood = responseJson.bairro
        this.city = responseJson.localidade
      }catch(error){
        console.error(error)
      }
      },
    
      async handleSubmit() {
      const {valid} = await this.$refs.form.validate()

     if(!valid) {
          alert("Preencha todos os dados obrigatórios!")
          return
        }      

        let dataFormatada = moment(this.date_birth).format("DD/MM/YYYY")

        axios({
          url: 'http://localhost:3000/students',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            contact: this.contact,
            date_birth: dataFormatada,
            cep: this.cep,
            street: this.street,
            number: this.number,
            province: this.province,
            neighborhood: this.neighborhood,
            city: this.city,
            complement: this.complement
           }
        })
        .then(() => {
            alert('Aluno cadastrado com sucesso')
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