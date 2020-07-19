<template>
  <div>
    <form class="mt-4" @submit.prevent="onSubmit()" novalidate>
      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="firstName"
            >{{ $t('First name') }}<span class="text-danger">*</span>
          </label>
          <input
            id="firstName"
            v-model="user.firstName"
            type="text"
            name="firstName"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.user.firstName.$error,
              'is-valid': isSubmitted && !$v.user.firstName.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.user.firstName.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.user.firstName.required"
              v-html="$t('Please fill name')"
            />
          </div>
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="lastName"
            >{{ $t('Last name') }}<span class="text-danger">*</span>
          </label>
          <input
            id="lastName"
            v-model="user.lastName"
            type="text"
            name="lastName"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.user.lastName.$error,
              'is-valid': isSubmitted && !$v.user.lastName.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.user.lastName.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.user.lastName.required"
              v-html="$t('Please fill surname')"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="lastName"
            >{{ $t('E-mail') }}<span class="text-danger">*</span>
          </label>
          <input
            id="email"
            v-model="user.email"
            type="text"
            name="email"
            class="form-control"
            :disabled="!isCreate"
          />
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="roleId"
            >{{ $t('Role') }}<span class="text-danger">*</span>
          </label>
          <select
            v-model="user.roleId"
            class="custom-select"
            id="roleId"
            :class="{
              'is-invalid': isSubmitted && $v.user.roleId.$error,
              'is-valid': isSubmitted && !$v.user.roleId.$error
            }"
          >
            <option
              v-for="(item, index) in roles"
              :value="item['id']"
              :key="index"
            >
              {{ item['name'] }}
            </option>
          </select>

          <div
            v-if="isSubmitted && $v.user.roleId.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.user.roleId.required"
              v-html="$t('Please select the roleId')"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12">
          <label for="vendorId"
            >{{ $t('Company') }}<span class="text-danger">*</span>
          </label>

          <model-select
            :options="vendors"
            v-model="user.vendorId"
            id="vendorId"
            :placeholder="$t('Find company ...')"
          >
          </model-select>

          <div
            v-if="isSubmitted && $v.user.vendorId.$error"
            class="invalid-feedback d-block"
          >
            <span
              v-if="!$v.user.vendorId.required"
              v-html="$t('Please select the the company')"
            />
          </div>
        </div>
      </div>

      <div class="pt-2">
        <button
          class="btn btn-primary btn-md text-uppercase btn-pill"
          :disabled="$v.user.$error"
        >
          {{ $t('Save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { ModelSelect } from 'vue-search-select'

export default {
  name: 'UserCreate',
  props: ['data', 'roles', 'vendors', 'id'],
  data() {
    const { firstName, lastName, roleId, email, vendorId } = this.data
    return {
      user: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        roleId: roleId,
        vendorId: vendorId
      },
      isSubmitted: false,
      isCreate: Object.keys(this.data).length === 0,
      showErrorMessage: false
    }
  },

  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      roleId: { required },
      vendorId: { required }
    }
  },

  components: {
    ModelSelect
  },

  methods: {
    async onSubmit({ $axios, $toast, $v, user, isCreate, $router, id } = this) {
      this.isSubmitted = true
      $v.$touch()

      if ($v.$invalid) {
        return
      }

      if (isCreate) {
        // Create
        await $axios
          .$post('/api/v1/user', user)
          .then(response => {
            $toast.success(response['msg'])
            $router.push('/admin/user/list')
          })
          .catch(error => {
            $toast.error(error['msg'] ? error['msg'] : error)
          })
      } else {
        // Edit
        delete user['email']
        await $axios
          .$put(`/api/v1/user/${id}`, user)
          .then(response => {
            $toast.success(response['msg'])
            $router.push('/admin/user/list')
          })
          .catch(error => {
            $toast.error(error['msg'] ? error['msg'] : error)
          })
      }
    }
  }
}
</script>

<style scoped></style>
