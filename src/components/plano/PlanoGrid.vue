<template>
  <div>
    <v-btn class="primary" absolute top right title="Novo Plano" @click="add">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-data-table
      item-key="codigo"
      :headers="headers"
      :items="planos"
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

    <PlanoEdit
      :plano="plano"
      :dialog="dialog"
      @close="close"
      @change="change"></PlanoEdit>
  </div>
</template>

<script>
import PlanoEdit from '@/components/plano/PlanoEdit'
import { mapMutations } from 'vuex'

export default {
  created () {
    this.$http.get('/planos').then(response => {
      this.planos = response.data
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.showError({ error, message: 'Houve um problema ao consultar os planos.' })
    })
  },
  data () {
    return {
      loading: true,
      planos: [],
      headers: [
        { text: 'Código', value: 'codigo' },
        { text: 'Nome', value: 'nome' },
        { text: 'Ativo', value: 'ativo', sortable: false },
        { text: 'Inclusão', value: 'inclusao', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      index: -1,
      plano: { nome: null, ativo: false },
      dialog: false
    }
  },
  methods: {
    ...mapMutations(['showSnackbar', 'showError']),
    add () {
      this.plano = { nome: null, ativo: true }
      this.dialog = true
    },
    edit (plano) {
      this.plano = plano
      this.index = this.planos.indexOf(plano)
      this.dialog = true
    },
    remove (plano) {
      const index = this.planos.indexOf(plano)

      if (confirm('Tem certeza que deseja remover este plano?')) {
        this.$http.delete(`/planos/${plano.codigo}`).then(response => {
          this.planos.splice(index, 1)
          this.showSnackbar({ type: 'success', message: 'Plano removido com sucesso.' })
        }).catch(error => {
          this.showError({ error, message: 'Houve um problema ao remover este plano.' })
        })
      }
    },
    close () {
      this.plano = { nome: null, ativo: false }
      this.index = -1
      this.dialog = false
    },
    change (plano) {
      if (this.index > -1) {
        this.planos.splice(this.index, 1, plano)
      } else {
        this.planos.push(plano)
      }
    }
  },
  components: { PlanoEdit }
}
</script>
