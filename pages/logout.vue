<template>
  <div></div>
</template>

<script>
export default {
  name: 'Logout',
  async mounted() {
    await this.$store.commit('DELETE_TOKEN')
    await this.$cookies.remove('token')
    await this.$cookies.remove('refresh_token')
    await this.$router.push('/')
  }
}
</script>

<style scoped></style>
