<template>
  <div>
    <Header title="Marcas">
      As marcas são responsáveis pela segmentação de nossos clientes.
    </Header>

    <MarcaGrid></MarcaGrid>
  </div>
</template>

<script>
import Header from '@/components/template/Header'
import MarcaGrid from '@/components/marca/MarcaGrid'

export default {
  components: { Header, MarcaGrid }
}
</script>
