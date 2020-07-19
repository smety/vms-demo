<template>
  <div>
    <form class="mt-4" data-cy="form" @submit.prevent="onSubmit()" novalidate>
      <div class="form-group">
        <label for="email">E-mail <span class="text-danger">*</span> </label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          name="email"
          class="form-control"
          data-cy="form-email"
          :class="{
            'is-invalid': isSubmitted && $v.user.email.$error,
            'is-valid': isSubmitted && !$v.user.email.$error
          }"
        />
        <div
          v-if="isSubmitted && $v.user.email.$error"
          class="invalid-feedback"
        >
          <span
            v-if="!$v.user.email.required"
            v-html="$t('Please fill in the email')"
          />
          <span
            v-else-if="!$v.user.email.email"
            v-html="$t('Email is invalid')"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="password"
          >{{ $t('Password') }}<span class="text-danger">*</span>
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
            v-if="!$v.user.password.required"
            v-html="$t('Please fill in the password')"
          />
        </div>
      </div>
      <div class="pt-2">
        <button class="btn btn-primary btn-block btn-pill">
          {{ $t('Login') }}
        </button>
      </div>

      <div class="text-center pt-3 fs-12">
        {{
          $t('If you do not have a login or do not work, please contact us at')
        }}
        <a :href="'mailto:' + $t('supportEmail')">{{ $t('supportEmail') }}</a>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import jwt_decode from 'jwt-decode'

export default {
  name: 'FormUserLogin',

  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      isSubmitted: false
    }
  },

  validations: {
    user: {
      email: { required /*email*/ },
      password: { required }
    }
  },

  methods: {
    async onSubmit({ $axios, $toast } = this) {
      this.isSubmitted = true
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      try {
        const { API_AUTH } = process.env
        const { email, password } = this.user
        await $axios
          .$post(`${API_AUTH}/auth`, {
            username: email,
            password: password
          })
          .then(response => {
            const { token, refresh_token } = response
            const user = jwt_decode(token)
            const { username } = user
            if (username === email && token && refresh_token) {
              this.$store.commit('SET_TOKEN', { token, refresh_token })
              this.$store.commit('SET_USER', user)
              this.$cookies.set('token', token)
              this.$cookies.set('refresh_token', refresh_token)
              this.$router.push('/dashboard')
              $toast.success(
                this.$t('We have successfully registered you to VMS')
              )
            } else {
              $toast.error(this.$t('Incorrect login or password'))
            }
          })
          .catch(error => {
            if (error.response.status === 403) {
              $toast.error(this.$t('Error request'))
            }
          })
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
</script>
