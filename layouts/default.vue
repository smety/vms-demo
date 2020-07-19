<template>
  <div class="app">
    <Header />
    <div class="app-body">
      <div class="sidebar">
        <navigation />
      </div>
      <main class="main">
        <nuxt />
      </main>
    </div>

    <footer class="app-footer mt-2">
      <div>Pilulka. cz © 2020</div>
    </footer>
  </div>
</template>

<script>
import Header from '~/components/Layout/Header.vue'
import Navigation from '~/components/Layout/Navigation.vue'

export default {
  middleware: 'authenticated',
  components: {
    Header,
    Navigation
  }
}
</script>
