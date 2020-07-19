<template>
  <div>
    <Breadcrumb
      :data="[
        {
          title: $t('User management'),
          url: '/admin/user/list'
        }
      ]"
    />
    <aside>
      <div class="row pb-2">
        <div class="col-6">
          <h1>{{ $t('User management') }}</h1>
        </div>
        <div class="col-6 text-right">
          <nuxt-link
            :to="{ path: '/admin/user/create' }"
            class="btn btn-primary btn-pill btn-upr"
          >
            <i class="fa fa-pencil mr-2 ml-0"></i> {{ $t('New user') }}
          </nuxt-link>
        </div>
      </div>

      <v-client-table
        :data="data"
        :columns="[
          'firstName',
          'lastName',
          'email',
          'role',
          'company',
          'lastActivity',
          'edit',
          'delete'
        ]"
        :options="options"
      >
        <div slot="lastActivity" slot-scope="props">
          {{ props.row.lastActivity | dateFormat }}
        </div>

        <!-- props.row.id -->
        <nuxt-link
          slot="edit"
          slot-scope="props"
          :to="{ path: `/admin/user/${props.row.id}` }"
          class="btn btn-info text-white px-2"
        >
          <i class="fa fa-pencil"></i>
        </nuxt-link>

        <!-- props.row.id -->
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

    <div>
      <b-modal :title="$t('Delete user')" v-model="confirmModel">
        <p class="m-0 p-0 text-center">
          Opravdu si přejete smazat tohoto uživatele?
        </p>

        <div slot="modal-footer">
          <div class="d-flex">
            <div>
              <a
                href="#"
                @click.prevent="closeConfirm()"
                class="btn btn-link text-dark mr-2 "
                >Nemazat</a
              >
            </div>
            <div>
              <a
                href="#"
                @click.prevent="handleDelete()"
                class="btn btn-danger btn-pill"
                ><i class="fa fa-trash"></i> {{ $t('Delete') }}</a
              >
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/Layout/Breadcrumb.vue'

export default {
  name: 'UserList',
  components: {
    Breadcrumb
  },
  async asyncData({ $axios, error }) {
    try {
      const data = await $axios.$get('/api/v1/user')
      return { data }
    } catch {
      error({ statusCode: 404, message: 'Bohužel k této sekci nemáte přístup' })
    }
  },

  data() {
    return {
      confirmModel: false,
      selectedPrepareDeleteUser: null,
      data: null,
      options: {
        skin: 'table table-striped',
        filterByColumn: true,
        headings: {
          firstName: this.$t('First name'),
          lastName: this.$t('Last name'),
          role: this.$t('Role'),
          company: this.$t('Company'),
          lastActivity: this.$t('Last activity'),
          edit: null,
          delete: null
        },
        sortable: ['firstName', 'lastName', 'email', 'role', 'company'],
        filterable: ['firstName', 'lastName', 'email', 'role', 'company'],
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
    async handleDelete({ $axios } = this) {
      await $axios
        .$delete(`/api/v1/user/${this.selectedPrepareDeleteUser}`)
        .then(response => {
          this.$toast.success(response['msg'])
          this.confirmModel = false
        })

      this.data = await $axios.$get('/api/v1/user')
    },

    showConfirm(id) {
      this.selectedPrepareDeleteUser = id
      this.confirmModel = true
    },

    closeConfirm() {
      this.confirmModel = false
    }
  },

  head() {
    return {
      title: this.$t('User management')
    }
  }
}
</script>
