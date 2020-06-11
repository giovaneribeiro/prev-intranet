<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="">Marca</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field label="Código" v-model="marcaEdit.codigo"
              v-if="!isNew" :disabled="!isNew">
            </v-text-field>
            <v-text-field label="Nome" autofocus v-model="marcaEdit.nome"
              :rules="nameRules">
            </v-text-field>
            <v-switch label="Ativo" v-model="marcaEdit.ativo"
              v-if="!isNew">
            </v-switch>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2" text @click="close">Fechar</v-btn>
          <v-btn color="primary" @click="save" :disabled="!valid || !hasChanges">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    marca: {
      type: Object,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    marca: function (marca) {
      this.marcaEdit = Object.assign({}, marca)
    }
  },
  data () {
    return {
      valid: false,
      marcaEdit: Object.assign({}, this.marca),
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length >= 4 && v.length <= 32) || 'Nome deve conter entre 4 e 32 caracteres'
      ]
    }
  },
  computed: {
    isNew () {
      return !('codigo' in this.marcaEdit)
    },
    hasChanges () {
      return !(
        this.marca.nome === this.marcaEdit.nome &&
        this.marca.ativo === this.marcaEdit.ativo
      )
    }
  },
  methods: {
    ...mapMutations(['showSnackbar', 'showError']),
    save () {
      if (this.$refs.form.validate()) {
        const marca = {
          nome: this.marcaEdit.nome,
          ativo: this.marcaEdit.ativo
        }

        const method = this.isNew ? 'post' : 'put'
        const url = this.isNew ? '/marcas' : `/marcas/${this.marcaEdit.codigo}`

        this.$http[method](url, marca).then(response => {
          this.$emit('change', response.data)
          this.close()
          this.showSnackbar({ type: 'success', message: `Marca ${this.isNew ? 'incluída' : 'alterada'} com sucesso` })
        }).catch(error => {
          this.showError({ error, message: 'Houve um problema ao salvar esta marca.' })
        })
      }
    },
    close () {
      this.$refs.form.reset()
      this.$emit('close')
    }
  }
}
</script>
