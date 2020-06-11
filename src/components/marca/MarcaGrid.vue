<template>
  <div>
    <v-btn class="primary" absolute top right title="Nova Marca" @click="add">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-data-table
      item-key="codigo"
      :headers="headers"
      :items="marcas"
      :loading="loading">
      <template v-slot:item.inclusao="{ item }">
        {{ item.inclusao | moment('DD/MM/YYYY HH:mm:ss') }}
      </template>
      <template v-slot:item.ativo="{ item }">
        <v-chip color="primary" small v-if="item.ativo">Sim</v-chip>
        <v-chip color="secondary" small v-else>Não</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon small @click="remove(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <MarcaEdit
      :marca="marca"
      :dialog="dialog"
      @close="close"
      @change="change"></MarcaEdit>
  </div>
</template>

<script>
import MarcaEdit from '@/components/marca/MarcaEdit'
import { mapMutations } from 'vuex'

export default {
  created () {
    this.$http.get('/marcas').then(response => {
      this.marcas = response.data
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.showError({ error, message: 'Houve um problema ao consultar as marcas.' })
    })
  },
  data () {
    return {
      loading: true,
      marcas: [],
      headers: [
        { text: 'Código', value: 'codigo' },
        { text: 'Nome', value: 'nome' },
        { text: 'Ativo', value: 'ativo', sortable: false },
        { text: 'Inclusão', value: 'inclusao', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      index: -1,
      marca: { nome: null, ativo: false },
      dialog: false
    }
  },
  methods: {
    ...mapMutations(['showSnackbar', 'showError']),
    add () {
      this.marca = { nome: null, ativo: true }
      this.dialog = true
    },
    edit (marca) {
      this.marca = marca
      this.index = this.marcas.indexOf(marca)
      this.dialog = true
    },
    remove (marca) {
      const index = this.marcas.indexOf(marca)

      if (confirm('Tem certeza que deseja remover esta marca?')) {
        this.$http.delete(`/marcas/${marca.codigo}`).then(response => {
          this.marcas.splice(index, 1)
          this.showSnackbar({ type: 'success', message: 'Marca removida com sucesso.' })
        }).catch(error => {
          this.showError({ error, message: 'Houve um problema ao remover esta marca.' })
        })
      }
    },
    close () {
      this.marca = { nome: null, ativo: false }
      this.index = -1
      this.dialog = false
    },
    change (marca) {
      if (this.index > -1) {
        this.marcas.splice(this.index, 1, marca)
      } else {
        this.marcas.push(marca)
      }
    }
  },
  components: { MarcaEdit }
}
</script>
