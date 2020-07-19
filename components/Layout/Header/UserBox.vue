<template>
  <div>
    <div class="py-3 px-4 shadow user-box">
      <ul class="list-unstyled user-list p-0 m-0">
        <li>
          <nuxt-link
            :to="{ path: '/account/contact-information' }"
            class="text-dark"
          >
            <i class="icon-user mr-1"></i> {{ $t('Contact information') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{ path: '/account/change-password' }"
            class="text-dark"
          >
            <i class="icon-lock mr-1"></i> {{ $t('Change password') }}
          </nuxt-link>
        </li>
        <li>
          <a href="#" @click.prevent="logout()" class="text-dark">
            <i class="icon-logout mr-1"></i> {{ $t('Logout') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBox',
  props: {
    data: {
      type: Object,
      default: null
    }
  },

  methods: {
    async logout() {
      try {
        const { API_AUTH } = process.env
        await this.$axios.get(`${API_AUTH}/auth/logout`).then(response => {
          if (response.status === 200) {
            this.$store.commit('DELETE_TOKEN')
            this.$cookies.remove('token')
            this.$cookies.remove('refresh_token')
            this.$router.push({ path: '/' })
          }
        })
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
</script>

<style scoped>
.user-box {
  width: 250px;
}

.user-list a {
  display: block;
  line-height: 32px;
}

.user-list a:hover {
  text-decoration: none;
}
</style>
