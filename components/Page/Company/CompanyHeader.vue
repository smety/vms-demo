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
  name: 'CompanyHeader',

  data() {
    return {
      navigation: [
        {
          title: 'My company',
          url: '/company/info',
          ico: 'icon-user'
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
