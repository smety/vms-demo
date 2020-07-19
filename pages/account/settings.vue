<template>
  <div>
    <Breadcrumb :data="breadcrumb" />
    <aside>
      Account settings...adsas
    </aside>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },

  data() {
    return {
      breadcrumb: [
        {
          title: 'Domů',
          url: '/dashboard'
        },
        {
          title: 'Logout',
          url: '/'
        }
      ]
    }
  },
  head() {
    return {
      title: 'Login'
    }
  }
}
</script>
