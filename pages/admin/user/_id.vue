<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('User management'),
          url: '/admin/user/list'
        },
        {
          title: $t('User edit'),
          url: `/admin/user/${$route.params.id}`
        }
      ]"
    />

    <div class="page-account">
      <div class="tab-content">
        <div class="tab-pane active">
          <h2>
            {{ $t('User edit') }} {{ user['firstName'] }} {{ user['lastName'] }}
          </h2>
          <CreateForm
            :data="user"
            :vendors="vendorsList"
            :roles="roles"
            :id="id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
import CreateForm from '../../../components/Form/User/Create'

export default {
  components: {
    Breadcrumb,
    CreateForm
  },
  async asyncData({ params, $axios }) {
    try {
      const { id } = params
      const roles = await $axios.$get('/api/v1/system/roles')
      const vendors = await $axios.$get('/api/v1/system/vendors')
      const user = await $axios.$get(`/api/v1/user/${id}`)

      let vendorsList = []
      vendors.forEach(item => {
        vendorsList.push({ value: item['id'], text: item['companyName'] })
      })

      return { roles, vendorsList, user, id }
    } catch (e) {
      return {}
    }
  },

  data() {
    return {
      roles: null,
      vendorsList: null,
      user: null,
      id: null
    }
  },

  methods: {},

  head() {
    return {
      title: this.$t('User management')
    }
  }
}
</script>
