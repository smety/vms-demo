<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" v-for="item in navigation" :key="item['url']">
        <nuxt-link :to="{ path: item['url'] }" class="nav-link">
          <i :class="[item['ico'], 'mr-1']"></i> {{ $t(item['title']) }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountHeader',

  data() {
    return {
      navigation: [
        {
          title: 'Contact information',
          url: '/account/contact-information',
          ico: 'icon-user'
        },
        {
          title: 'Change password',
          url: '/account/change-password',
          ico: 'icon-lock'
        }
      ]
    }
  }
}
</script>

<style scoped>
.accountNavigation a {
  display: block;
  line-height: 32px;
}
</style>
