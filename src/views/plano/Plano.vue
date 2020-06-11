<template>
  <div>
    <Header title="Planos">
      Os planos são nossos produtos, cada um deles é customizado para atender as demandas de nossos clientes.
    </Header>

    <PlanoGrid></PlanoGrid>
  </div>
</template>

<script>
import Header from '@/components/template/Header'
import PlanoGrid from '@/components/plano/PlanoGrid'

export default {
  components: { Header, PlanoGrid }
}
</script>
