<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <v-text-field label="Código"
          :value="empresaEdit.codigo"
          disabled></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field label="CNPJ"
          :value="empresaEdit.cnpj"
          :readonly="!editable"></v-text-field>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field label="Razão Social"
          :value="empresaEdit.razaoSocial"
          :readonly="!editable"></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field label="Data de Inclusão"
          :value="empresaEdit.inclusao | moment('DD/MM/YYYY HH:mm:ss')"
          disabled></v-text-field>
      </v-col>
      <v-col cols="12" md="1">
        <v-switch label="Ativo"
          :input-value="empresaEdit.ativo"
          :readonly="!editable"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2">
        <v-select label="Marca"
          :items="marcas"
          item-key="codigo"
          item-value="codigo"
          item-text="nome"
          v-model="empresaEdit.marca.codigo"
          :readonly="!editable"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created () {
    this.$http.get('/marcas?active=true').then(response => {
      this.marcas = response.data
    }).catch(error => {
      this.setEmpresa(null)
      this.showError({ error, message: 'Houve um problema ao consultar as marca da empresa.' })
    })
  },
  data () {
    return {
      editable: false,
      marcas: []
    }
  },
  computed: {
    empresaEdit () {
      return Object.assign({}, this.$store.getters.empresa)
    }
  },
  methods: {
    ...mapMutations(['showError', 'setEmpresa'])
  }
}
</script>
