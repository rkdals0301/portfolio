<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="sendMessage"
      >
        <v-icon>mdi-message-text</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-snackbar v-model="snackbar" top right>
      <div>{{ notification.title }}</div>
      <div>{{ notification.body }}</div>
      <template #action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',

      snackbar: false,
      notification: {
        title: 'title',
        body: 'body'
      }
    }
  },

  mounted () {
    this.$fire.messaging.onMessage((payload) => {
      console.log('onMessage received: ', payload)
      this.notification.title = payload.notification.title || ''
      this.notification.body = payload.notification.body || ''

      this.snackbar = true
    })
  },

  methods: {
    async sendMessage () {
      const payload = {
        message: {
          token: await this.$fire.messaging.getToken(),
          notification: {
            title: '알림 제목',
            body: '알림 내용'
          }
        }
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ya29.A0ARrdaM_-Otc54JBkXq2no4pU3D0TXcrtbGoIkWo6tPN7iQShOcAgWmzN1T9frtdaVZ0RzYKKMDvISmgzBX4h-W0EWq1Mt3s2KY0zIdQHfsSdX0wVhv_TiSEvvufUv3-NGmGGeKvy72b644DLI3pnjOw7jheN' // OAuth 2.0 Playground Access Token
      }

      const response = await this.$axios.$post('/v1/projects/portfolio-6ba9b/messages:send', JSON.stringify(payload), { headers })
      console.log('response', response)
    }
  }
}
</script>
