<template>
  <div>
    <Breadcrumb :data="breadcrumb" />

    <div>
      Hello world ...
    </div>
  </div>
</template>

<script>
// @see coreui/src/views/tables/DataTable.vue
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },

  data() {
    return {
      breadcrumb: [
        {
          title: 'Logout',
          url: '/'
        }
      ]
    }
  },

  methods: {},

  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
