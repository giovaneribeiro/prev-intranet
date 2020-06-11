<template>
  <v-card flat tile>
    <v-card-text>
      <v-row align="baseline">
        <v-col cols="2">
          <v-text-field label="Código" hint="Digite o código da empresa"
            v-model.trim="codigo"
            v-mask="'######'"
            :loading="loading"
            :disabled="disabled"
            @keydown.enter="findByCodigo"
            @blur="findByCodigo"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field label="CNPJ"
            v-model="cnpj" disabled></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field label="Razão Social"
            v-model="razaoSocial" disabled></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn x-small color="primary"
            title="Limpar Pesquisa"
            @click="clean">
            <v-icon small>mdi-filter-remove</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created () {
    this.clean()
  },
  data () {
    return {
      codigo: '',
      cnpj: '',
      razaoSocial: null,
      loading: false,
      disabled: false
    }
  },
  methods: {
    ...mapMutations(['showSnackbar', 'showError', 'setEmpresa']),
    findByCodigo () {
      if (this.codigo) {
        this.loading = true
        this.disabled = true
        this.findEmpresa()
      }
    },
    findEmpresa () {
      this.$http.get(`/empresas/${this.codigo}`).then(response => {
        const empresa = response.data
        this.setEmpresa(empresa)

        this.cnpj = empresa.cnpj
        this.razaoSocial = empresa.razaoSocial
      }).catch(error => {
        this.disabled = false
        this.showError({ error, message: 'Houve um problema ao consultar a empresa' })
      }).then(() => {
        this.loading = false
      })
    },
    clean () {
      this.setEmpresa(null)

      this.codigo = ''
      this.cnpj = ''
      this.razaoSocial = ''
      this.disabled = false
    }
  }
}
</script>
