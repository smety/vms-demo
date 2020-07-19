<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <nuxt-link :to="{ path: '/dashboard' }" class="active">
        {{ $t('Home') }}
      </nuxt-link>
    </li>
    <li v-for="item in data" :key="item['url']" class="breadcrumb-item">
      <nuxt-link :to="{ path: item['url'] }" class="active">
        {{ item['title'] }}
      </nuxt-link>
    </li>
  </ol>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  }
}
</script>
