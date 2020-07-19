<template>
  <div>
    <form class="mt-4" data-cy="form" @submit.prevent="onSubmit()" novalidate>
      <div class="form-group">
        <label for="password"
          >{{ $t('Old password') }}<span class="text-danger">*</span>
        </label>
        <input
          id="passwordOld"
          v-model="user.passwordOld"
          type="password"
          name="passwordOld"
          class="form-control"
          :class="{
            'is-invalid': isSubmitted && $v.user.passwordOld.$error,
            'is-valid': isSubmitted && !$v.user.passwordOld.$error
          }"
        />
        <div
          v-if="isSubmitted && $v.user.passwordOld.$error"
          class="invalid-feedback"
        >
          <span
            v-if="!$v.user.passwordOld.minLength"
            v-html="$t('The password must be at least 6 characters long')"
          />

          <span
            v-if="!$v.user.passwordOld.required"
            v-html="$t('Please fill in the new password')"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password"
          >{{ $t('New password') }}<span class="text-danger">*</span>
        </label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          name="password"
          data-cy="form-password"
          class="form-control"
          :class="{
            'is-invalid': isSubmitted && $v.user.password.$error,
            'is-valid': isSubmitted && !$v.user.password.$error
          }"
        />
        <div
          v-if="isSubmitted && $v.user.password.$error"
          class="invalid-feedback"
        >
          <span
            v-if="!$v.user.password.minLength"
            v-html="$t('The password must be at least 6 characters long')"
          />

          <span
            v-if="!$v.user.password.required"
            v-html="$t('Please fill in the new password')"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password2"
          >{{ $t('Confirm new password') }}<span class="text-danger">*</span>
        </label>
        <input
          id="password2"
          v-model="user.password2"
          type="password"
          name="password2"
          class="form-control"
          :class="{
            'is-invalid': isSubmitted && $v.user.password2.$error,
            'is-valid': isSubmitted && !$v.user.password2.$error
          }"
        />
        <div
          v-if="isSubmitted && $v.user.password2.$error"
          class="invalid-feedback"
        >
          <span
            v-if="!$v.user.password2.minLength"
            v-html="$t('The password must be at least 6 characters long')"
          />

          <span
            v-if="!$v.user.password2.required"
            v-html="$t('Please fill in the new password')"
          />

          <span
            v-if="!$v.user.password2.someAsPassword2"
            v-html="$t('New passwords need to be taken')"
          />
        </div>
      </div>
      <div class="pt-2">
        <button
          class="btn btn-primary btn-md text-uppercase btn-pill"
          :disabled="$v.user.$error"
        >
          {{ $t('Save') }} »
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import jwt_decode from 'jwt-decode'

export default {
  name: 'ChangePassword',

  data() {
    return {
      user: {
        passwordOld: '',
        password: '',
        password2: ''
      },
      isSubmitted: false,
      showErrorMessage: false
    }
  },

  validations: {
    user: {
      passwordOld: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(6) },
      password2: {
        required,
        minLength: minLength(6),
        someAsPassword2: sameAs('password')
      }
    }
  },

  methods: {
    async onSubmit() {
      this.isSubmitted = true
      this.$v.$touch()
      const { password } = this.user

      if (this.$v.$invalid) {
        return
      }

      await this.$axios
        .$post('/api/v1/user/change-password', {
          newPassword: password
        })
        .then(() => {
          this.$toast.success(this.$t('Saved'))
        })
        .catch(() => {
          this.$toast.error(this.$t('Error request'))
        })
    }
  }
}
</script>
