<template>
  <div>
    <Header title="Empresas">
      As empresas são nossos clientes primários; é através delas que nossos clientes finais adquirem nossos produtos.
    </Header>

    <EmpresaSearch></EmpresaSearch>

    <EmpresaInfo v-if="empresa"></EmpresaInfo>
  </div>
</template>

<script>
import Header from '@/components/template/Header'
import EmpresaSearch from '@/components/empresa/EmpresaSearch'
import EmpresaInfo from '@/components/empresa/EmpresaInfo'

export default {
  computed: {
    empresa () {
      return this.$store.getters.empresa
    }
  },
  components: { Header, EmpresaSearch, EmpresaInfo }
}
</script>
