<template>
  <div>
    <v-navigation-drawer app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp">
      <v-list>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading">
            <v-col cols="6">
              <v-subheader>{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>
          <v-list-group v-else-if="item.children" :key="item.text">
            <template v-slot:activator>
              <v-list-item-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.to">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary white--text"
      :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text" />
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">prev</span>develop
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="white--text">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        { icon: 'mdi-home', text: 'Início', to: '/' },
        { icon: 'mdi-palette', text: 'Marcas', to: '/marca' },
        { icon: 'mdi-script-text', text: 'Planos', to: '/plano' },
        {
          icon: 'mdi-home-modern',
          text: 'Empresas',
          children: [
            { text: 'Visualizar Empresa', to: '/empresa' }
          ]
        },
        { icon: 'mdi-account-group', text: 'Clientes', to: '/cliente' },
        { icon: 'mdi-account-tie', text: 'Profissionais', to: '/profissional' },
        { icon: 'mdi-home-account', text: 'Usuários', to: '/usuario' }
      ]
    }
  }
}
</script>
