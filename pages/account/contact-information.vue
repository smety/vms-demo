<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('Contact information'),
          url: '/account/contact-information'
        }
      ]"
    />
    <div class="page-account">
      <AccountHeader />

      <div class="tab-content">
        <div class="tab-pane active">
          <h2>{{ $t('Contact information') }}</h2>
          <PersonalInfo :data="company" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
import PersonalInfo from '../../components/Form/User/PersonalInfo'
import AccountHeader from '../../components/Page/Account/AccountHeader'

export default {
  async asyncData({ $axios }) {
    try {
      const company = await $axios.$get('/api/v1/user/contact-details')
      return { company }
    } catch (e) {
      return { company: {} }
    }
  },

  data() {
    return {
      company: Object
    }
  },

  components: {
    Breadcrumb,
    PersonalInfo,
    AccountHeader
  },

  head() {
    return {
      title: this.$t('Contact information')
    }
  }
}
</script>
