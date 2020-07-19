<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('Company overview'),
          url: '/admin/company/list'
        }
      ]"
    />
    <aside>
      <h1>{{ $t('Company overview') }}</h1>
      <v-client-table
        :data="company"
        :columns="[
          'name',
          'contactName',
          'email',
          'phoneNumber',
          'saleManager',
          'edit',
          'delete'
        ]"
        :options="options"
      >
        <div slot="lastActivity" slot-scope="props">
          {{ props.row.lastActivity | dateFormat }}
        </div>

        <nuxt-link
          slot="edit"
          slot-scope="props"
          :to="{ path: `/admin/user/${props.row.id}` }"
          class="btn btn-info text-white px-2"
        >
          <i class="fa fa-pencil"></i>
        </nuxt-link>

        <a
          slot="delete"
          v-b-modal.confirm-delete
          slot-scope="props"
          @click="showConfirm(props.row.id)"
          class="btn btn-danger text-white px-2"
        >
          <i class="fa fa-trash"></i>
        </a>
      </v-client-table>
    </aside>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'
import FakeData from '../../../static/mock/company'
export default {
  components: {
    Breadcrumb
  },
  async asyncData({ $axios }) {
    try {
      const company = await $axios.$get(
        'http://localhost:3030/mock/company.json'
      )
      return { company }
    } catch {
      return {}
    }
  },

  data() {
    return {
      confirmModel: false,
      company: FakeData,
      options: {
        skin: 'table table-striped',
        filterByColumn: true,
        headings: {
          name: this.$t('Name'),
          contactName: this.$t('Contact person'),
          email: this.$t('E-mail'),
          phoneNumber: this.$t('Phone'),
          saleManager: this.$t('Category sale manager'),
          edit: null,
          delete: null
        },
        sortable: [
          'name',
          'contactName',
          'email',
          'phoneNumber',
          'saleManager'
        ],
        filterable: [
          'name',
          'contactName',
          'email',
          'phoneNumber',
          'saleManager'
        ],
        sortIcon: {
          base: 'fa',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc',
          is: 'fa-sort'
        },
        pagination: {
          chunk: 10,
          edge: false,
          nav: 'scroll'
        }
      }
    }
  },

  methods: {
    async handleDelete() {
      this.confirmModel = false
      this.$toast.success(this.$t('Deleted'))
    },

    showConfirm() {
      this.confirmModel = true
    },

    closeConfirm() {
      this.confirmModel = false
    }
  },

  head() {
    return {
      title: this.$t('Company overview')
    }
  }
}
</script>
