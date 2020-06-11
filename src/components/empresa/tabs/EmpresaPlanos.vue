<template>
  <v-data-table
      item-key="codigo"
      :headers="headers"
      :items="empresaPlano"
      :loading="loading">
    <template v-slot:item.valor="{ item }">
      {{ item.valor | currency }}
    </template>
    <template v-slot:item.inclusao="{ item }">
      {{ item.inclusao | moment('DD/MM/YYYY HH:mm:ss') }}
    </template>
    <template v-slot:item.ativo="{ item }">
      <v-chip color="primary" small v-if="item.ativo">Sim</v-chip>
      <v-chip color="secondary" small v-else>Não</v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created () {
    this.$http.get(`/empresas/${this.empresaEdit.codigo}/planos`).then(response => {
      this.empresaPlano = response.data
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.showError({ error, message: 'Houve um problema ao consultar os planos da empresa.' })
    })
  },
  data () {
    return {
      loading: true,
      empresaPlano: [],
      headers: [
        { text: 'Código', value: 'plano' },
        { text: 'Nome', value: 'nomePlano' },
        { text: 'Valor', value: 'valor' },
        { text: 'Ativo', value: 'ativo', sortable: false },
        { text: 'Inclusão', value: 'inclusao', sortable: false }
      ]
    }
  },
  computed: {
    empresaEdit () {
      return Object.assign({}, this.$store.getters.empresa)
    }
  },
  methods: {
    ...mapMutations(['showError'])
  }
}
</script>
