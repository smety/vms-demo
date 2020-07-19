<template>
  <div>
    <header class="app-header navbar">
      <a class="d-lg-none navbar-toggler" @click.prevent="toggleNavigation()">
        <span class="navbar-toggler-icon" />
      </a>

      <nuxt-link :to="{ path: '/dashboard' }" class="navbar-brand">
        <img src="~/assets/logo-cs.svg" width="140" class="navbar-brand-full" />
        <img
          src="~/assets/logo-cs.svg"
          width="30"
          height="30"
          class="navbar-brand-minimized"
        />
      </nuxt-link>

      <button
        type="button"
        class="d-md-down-none navbar-toggler"
        @click.prevent="toggleNavigation()"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <ul class="navbar-nav ml-auto pr-2">
        <li
          class="nav-item b-nav-dropdown dropdown"
          v-click-outside="closeAllComponents"
        >
          <a
            href="#"
            class="nav-link dropdown-toggle-no-caret p-2 text-dark"
            @click.prevent="toggleUserBox()"
          >
            {{ user['username'] }} <i class="icon-user ml-1"></i>
          </a>

          <ul
            :class="[
              isUserBoxOpen ? 'show' : '',
              'dropdown-menu dropdown-menu-right'
            ]"
          >
            <UserBox :data="user" />
          </ul>
        </li>
      </ul>
    </header>
  </div>
</template>
<script>
import UserBox from './Header/UserBox'
import vClickOutside from 'v-click-outside'

export default {
  name: 'Header',

  directives: {
    clickOutside: vClickOutside.directive
  },

  data() {
    return {
      isNavigationOpen: false,
      isUserBoxOpen: false,
      bodyAttrs: {
        class: `sidebar-lg-show`
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters.user
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.closeAllComponents()
    })
  },

  methods: {
    toggleNavigation() {
      this.isNavigationOpen = !this.isNavigationOpen
    },

    toggleUserBox() {
      this.isUserBoxOpen = !this.isUserBoxOpen
    },

    closeAllComponents() {
      this.isUserBoxOpen = false
    }
  },

  head() {
    let resolvedClass
    if (process.client) {
      const { innerWidth } = window
      resolvedClass =
        innerWidth > 990
          ? !this.isNavigationOpen
            ? 'sidebar-lg-show'
            : ''
          : this.isNavigationOpen
          ? 'sidebar-show'
          : ''
    } else {
      resolvedClass = 'sidebar-lg-show'
    }

    return {
      bodyAttrs: {
        class: `${resolvedClass} header-fixed sidebar-fixed aside-menu-fixed aside-menu-off-canvas`
      }
    }
  },

  components: {
    UserBox
  }
}
</script>
