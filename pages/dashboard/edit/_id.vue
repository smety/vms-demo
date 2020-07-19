<template>
  <div>
    <Breadcrumb :data="breadcrumb" />
    <aside>
      <h1>
        {{ comments.name }}
      </h1>

      <ul>
        <li><strong>Email</strong>: {{ comments.email }}</li>
        <li><strong>Name</strong>: {{ comments.name }}</li>
        <li><strong>ID</strong>: {{ comments.id }}</li>
      </ul>
    </aside>
  </div>
</template>

<script>
// @see coreui/src/views/tables/DataTable.vue
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  async asyncData({ params, $axios }) {
    try {
      const comments = await $axios.$get(
        `https://jsonplaceholder.typicode.com/comments/${params.id}`
      )
      return { id: params.id, comments }
    } catch (e) {
      return {}
    }
  },

  data({ $route }) {
    return {
      id: null,
      comments: null,
      breadcrumb: [
        {
          title: 'Domů',
          url: '/dashboard'
        },
        {
          title: 'Logout',
          url: `/dashboard/edit/${$route.params.id}`
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
