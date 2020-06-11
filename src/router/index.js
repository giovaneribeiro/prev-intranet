import Vue from 'vue'
import VueRouter from 'vue-router'

import Inicio from '@/views/Inicio.vue'
import NaoEncontrado from '@/views/NaoEncontrado.vue'

const Marca = () => import(/* webpackChunkName: "marcas" */ '@/views/marca/Marca.vue')
const Plano = () => import(/* webpackChunkName: "planos" */ '@/views/plano/Plano.vue')
const Empresa = () => import(/* webpackChunkName: "empresas" */ '@/views/empresa/Empresa.vue')

Vue.use(VueRouter)

const routes = [{
  path: '*',
  component: NaoEncontrado
}, {
  path: '/',
  component: Inicio
}, {
  path: '/marca',
  component: Marca
}, {
  path: '/plano',
  component: Plano
}, {
  path: '/empresa',
  component: Empresa
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
