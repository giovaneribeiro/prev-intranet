<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="">Plano</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form" v-on:submit.prevent>
            <v-text-field label="Código" v-model="planoEdit.codigo"
              v-if="!isNew" :disabled="!isNew">
            </v-text-field>
            <v-text-field label="Nome" autofocus v-model="planoEdit.nome"
              :rules="nameRules">
            </v-text-field>
            <v-switch label="Ativo" v-model="planoEdit.ativo"
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
    plano: {
      type: Object,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    plano: function (plano) {
      this.planoEdit = Object.assign({}, plano)
    }
  },
  data () {
    return {
      valid: false,
      planoEdit: Object.assign({}, this.plano),
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length >= 4 && v.length <= 32) || 'Nome deve conter entre 4 e 32 caracteres'
      ]
    }
  },
  computed: {
    isNew () {
      return !('codigo' in this.planoEdit)
    },
    hasChanges () {
      return !(
        this.plano.nome === this.planoEdit.nome &&
        this.plano.ativo === this.planoEdit.ativo
      )
    }
  },
  methods: {
    ...mapMutations(['showSnackbar', 'showError']),
    save () {
      if (this.$refs.form.validate()) {
        const plano = {
          nome: this.planoEdit.nome,
          ativo: this.planoEdit.ativo
        }

        const method = this.isNew ? 'post' : 'put'
        const url = this.isNew ? '/planos' : `/planos/${this.planoEdit.codigo}`

        this.$http[method](url, plano).then(response => {
          this.$emit('change', response.data)
          this.close()
          this.showSnackbar({ type: 'success', message: `Plano ${this.isNew ? 'incluído' : 'alterado'} com sucesso` })
        }).catch(error => {
          this.showError({ error, message: 'Houve um problema ao salvar este plano.' })
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
