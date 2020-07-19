<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('User management'),
          url: '/admin/user/list'
        },

        {
          title: $t('New user'),
          url: '/admin/user/create'
        }
      ]"
    />

    <div class="page-account">
      <div class="tab-content">
        <div class="tab-pane active">
          <h2>{{ $t('New user') }}</h2>
          <CreateForm :data="[]" :vendors="vendorsList" :roles="roles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
import CreateForm from '../../../components/Form/User/Create'

export default {
  name: 'create',
  components: {
    Breadcrumb,
    CreateForm
  },

  async asyncData({ $axios }) {
    try {
      const roles = await $axios.$get('/api/v1/system/roles')
      const vendors = await $axios.$get('/api/v1/system/vendors')

      let vendorsList = []
      vendors.forEach(item => {
        vendorsList.push({ value: item['id'], text: item['companyName'] })
      })

      return { roles, vendorsList }
    } catch (e) {
      return {}
    }
  },

  data() {
    return {
      roles: null,
      vendorsList: null
    }
  },

  head() {
    return {
      title: this.$t('New user')
    }
  }
}
</script>

<style scoped></style>
