<template>
  <div>
    <form class="mt-4" data-cy="form" @submit.prevent="onSubmit()" novalidate>
      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="name">
            {{ $t('Name') }}<span class="text-danger">*</span>
          </label>
          <input
            id="name"
            v-model="user.firstName"
            type="text"
            name="name"
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
          <label for="password">
            {{ $t('Surname') }}<span class="text-danger">*</span>
          </label>
          <input
            id="password"
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
              v-html="$t('Please fill lastName')"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="phone">
            {{ $t('Phone') }}<span class="text-danger">*</span>
          </label>
          <input
            id="phone"
            v-model="user.phone"
            type="tel"
            name="phone"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.user.phone.$error,
              'is-valid': isSubmitted && !$v.user.phone.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.user.phone.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.user.phone.required"
              v-html="$t('Please fill phone')"
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

export default {
  props: ['data'],
  name: 'PersonalInfo',

  data() {
    const { firstName, lastName, phone } = this.data
    return {
      user: {
        firstName: firstName,
        lastName: lastName,
        phone: phone
      },
      isSubmitted: false
    }
  },

  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      phone: { required }
    }
  },

  methods: {
    async onSubmit({ $axios, $v, $toast, data, user } = this) {
      this.isSubmitted = true
      $v.$touch()

      if ($v.$invalid) {
        return
      }

      try {
        if (Object.keys(data).length === 0) {
          // Create
          await $axios.$post('/api/v1/user/contact-details', user).then(() => {
            $toast.success(this.$t('Saved'))
          })
        } else {
          // Edit
          await $axios.$put('/api/v1/user/contact-details', user).then(() => {
            $toast.success(this.$t('Saved'))
          })
        }
      } catch (e) {
        $toast.error(this.$t('Error request'))
      }
    }
  }
}
</script>
