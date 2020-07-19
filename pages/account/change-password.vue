<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('Change password'),
          url: '/account/change-password'
        }
      ]"
    />
    <div class="page-account">
      <AccountHeader />

      <div class="tab-content">
        <div class="tab-pane active">
          <h2>{{ $t('Change password') }}</h2>
          <ChangePassword />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountHeader from '../../components/Page/Account/AccountHeader'
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
import ChangePassword from '../../components/Form/User/ChangePassword'

export default {
  name: 'change-password',
  components: { ChangePassword, AccountHeader, Breadcrumb },

  head() {
    return {
      title: this.$t('Change password')
    }
  }
}
</script>
