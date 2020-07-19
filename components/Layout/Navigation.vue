<template>
  <div class="sidebar-top">
    <div class="sidebar-nav">
      <section>
        <ul class="nav" v-for="(segment, index) in menu" :key="index">
          <li class="nav-title">
            {{ $t(segment['header']) }}
          </li>

          <li
            :class="[
              openBlocks.includes(1) ? 'open' : '',
              'nav-item nav-dropdown'
            ]"
            disabled="disabled"
            v-for="(item, indexMenu) in menu"
            :key="indexMenu"
          >
            <a class="nav-link nav-dropdown-toggle" @click="openBlock(1)">
              <i :class="['nav-icon  text-white', item['icon']]"></i>
              {{ $t(item['masterLink']) }}
            </a>

            <ul class="nav-dropdown-items" v-if="item['subLinks']['link']">
              <li
                class="nav-item"
                v-for="(subLink, indexSub) in item['subLinks']['link']"
                :key="indexSub"
              >
                <div>
                  <nuxt-link :to="{ path: subLink['slug'] }" class="nav-link">
                    <i :class="['nav-icon  text-white', subLink['icon']]"></i>
                    {{ $t(subLink['title']) }}
                  </nuxt-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav" v-for="(segment, index) in admin" :key="index">
          <li class="nav-title">
            {{ $t(segment['header']) }}
          </li>

          <li v-for="(item, index) in segment['link']" :key="index">
            <nuxt-link :to="{ path: item['slug'] }" class="nav-link">
              <i :class="['nav-icon  text-white', item['icon']]"></i>
              {{ $t(item['title']) }}
            </nuxt-link>
          </li>
        </ul>

        <ul class="nav" v-for="(segment, index) in company" :key="index">
          <li
            :class="[
              openBlocks.includes(2) ? 'open' : '',
              'nav-item nav-dropdown'
            ]"
            disabled="disabled"
            v-for="(item, indexMenu) in company"
            :key="indexMenu"
          >
            <a class="nav-link nav-dropdown-toggle" @click="openBlock(2)">
              <i :class="['nav-icon  text-white', item['icon']]"></i>
              {{ $t(item['masterLink']) }}
            </a>

            <ul class="nav-dropdown-items" v-if="item['subLinks']['link']">
              <li
                class="nav-item"
                v-for="(subLink, indexSub) in item['subLinks']['link']"
                :key="indexSub"
              >
                <div>
                  <nuxt-link :to="{ path: subLink['slug'] }" class="nav-link">
                    <i :class="['nav-icon  text-white', subLink['icon']]"></i>
                    {{ $t(subLink['title']) }}
                  </nuxt-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="nav nav-bottom">
          <li class="nav-title text-uppercase">
            Account manager
          </li>

          <li class="nav-link">
            <img src="~/assets/img/hynek-vrana.png" class="nav-icon " />
            <i class="nav-icon text-white icon-cursor mr-1 d-none"></i>
            Hynek Vrána
          </li>

          <li class="nav-link">
            <i class="nav-icon  text-white icon-phone mr-1"></i> 123 456 789
          </li>

          <li class="nav-link">
            <i class="nav-icon  text-white icon-cursor mr-1"></i>
            vrana@pilulka.cz
          </li>

          <li class="nav-title text-uppercase">
            {{ $t('Contact') }}
          </li>

          <li class="nav-link">
            <i class="nav-icon  text-white icon-phone mr-1"></i> 222 703 000
          </li>

          <li class="nav-link">
            <i class="nav-icon  text-white icon-cursor mr-1"></i>
            vendor@pilulka.cz
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',

  data() {
    return {
      openBlocks: [],
      menu: [
        {
          masterLink: 'My account',
          icon: 'icon-user',
          isOpen: false,

          subLinks: {
            link: [
              {
                title: 'Contact information',
                slug: '/account/contact-information',
                icon: 'icon-info'
              },
              {
                title: 'Change password',
                slug: '/account/change-password',
                icon: 'icon-key'
              }
            ]
          }
        }
      ],
      company: [
        {
          header: 'My company',
          masterLink: 'My company',
          icon: 'fa fa-clone',
          isOpen: false,

          subLinks: {
            link: [
              {
                title: 'Billing information',
                slug: '/company/info',
                icon: null
              }
            ]
          }
        }
      ],
      admin: [
        {
          header: 'Admin',
          link: [
            {
              title: 'User management',
              slug: '/admin/user/list',
              icon: 'icon-user'
            },

            {
              title: 'Company overview',
              slug: '/admin/company/list',
              icon: 'fa fa-tty'
            }
          ]
        }
      ]
    }
  },

  methods: {
    openBlock(index) {
      if (this.openBlocks.includes(index)) {
        const indexArray = this.openBlocks.indexOf(index)
        if (indexArray > -1) {
          this.openBlocks.splice(indexArray, 1)
        }
      } else {
        this.openBlocks.push(index)
      }
    }
  }
}
</script>

<style scoped>
.nav-bottom {
  font-size: 14px;
}
</style>
