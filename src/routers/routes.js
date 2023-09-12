import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login/Login.vue'
import CadastrarUsuario from '../views/CadastrarUsuario/CadastrarUsuario.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import GerenciarExercicios from '../views/GerenciarExercicios/GerenciarExercicios.vue'
import GerenciarAlunos from '../views/GerenciarAlunos/GerenciarAlunos.vue'
import CadastrarAluno from '../views/CadastrarAluno/CadastrarAluno.vue'
import CadastrarTreino from '../views/CadastrarTreino/CadastrarTreino.vue'
import VisualizarTreino from '../views/VisualizarTreino/VisualizarTreino.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
         path: '/',
         name: 'Login',
         component: Login
      },
      {
         path: '/cadastrar-usuario',
         name: 'CadastrarUsuario',
         component: CadastrarUsuario
      },
      {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
      },
      {
          path: '/gerenciar-exercicios',
          name: 'GerenciarExercicios',
          component: GerenciarExercicios 
      },
      {
          path: '/gerenciar-alunos/',
          name: 'GerenciarAlunos',
          component: GerenciarAlunos
      },
      {
        path: '/cadastrar-aluno/',
        name: 'CadastrarAluno',
        component: CadastrarAluno
    },
    {
        path: '/cadastrar-treino/:id',
        props: true,
        name: 'CadastrarTreino',
        component: CadastrarTreino
    },
    {
        path: '/visualizar-treino/:id',
        name: 'VisualizarTreino',
        component: VisualizarTreino
    }
  ]
})

export default router