<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('My company'),
          url: '/account/change-password'
        }
      ]"
    />

    <div class="page-account">
      <CompanyHeader />

      <div class="tab-content">
        <div class="tab-pane active">
          <h2>{{ $t('My company') }}</h2>
          <CompanyInfo :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyInfo from '../../components/Form/Company/CompanyInfo'
import Breadcrumb from '../../components/Layout/Breadcrumb'
import CompanyHeader from '../../components/Page/Company/CompanyHeader'

export default {
  name: 'info',
  components: { CompanyHeader, CompanyInfo, Breadcrumb },

  async asyncData({ $axios }) {
    try {
      const data = await $axios.$get('/api/v1/vendor/invoice-details')
      return { data }
    } catch (e) {
      return { data: {} }
    }
  },

  data() {
    return {
      data: null
    }
  },

  head() {
    return {
      title: this.$t('Billing information')
    }
  }
}
</script>

<style scoped></style>
