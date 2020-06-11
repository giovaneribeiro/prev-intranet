<template>
  <v-card flat tile v-if="empresa">
    <v-card-text>
      <v-tabs dark v-model="currentTab"
        background-color="primary"
        slider-color="grey lighten-3">
        <v-tab href="#dadosGerais">Dados Gerais</v-tab>
        <v-tab href="#planos">Planos</v-tab>
      </v-tabs>

      <v-tabs-items v-model="currentTab">
        <v-tab-item value="dadosGerais">
          <EmpresaDadosGerais></EmpresaDadosGerais>
        </v-tab-item>
        <v-tab-item value="planos">
          <EmpresaPlanos></EmpresaPlanos>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import EmpresaDadosGerais from '@/components/empresa/tabs/EmpresaDadosGerais'
import EmpresaPlanos from '@/components/empresa/tabs/EmpresaPlanos'

export default {
  computed: {
    empresa () {
      return this.$store.getters.empresa
    }
  },
  data () {
    return {
      currentTab: 'dadosGerais'
    }
  },
  components: { EmpresaDadosGerais, EmpresaPlanos }
}
</script>
