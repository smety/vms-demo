<template>
  <div>
    <form class="mt-4" @submit.prevent="onSubmit()" novalidate>
      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="companyName">
            {{ $t('Company name') }}<span class="text-danger">*</span>
          </label>
          <input
            id="companyName"
            v-model="company.companyName"
            type="text"
            name="companyName"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.companyName.$error,
              'is-valid': isSubmitted && !$v.company.companyName.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.companyName.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.companyName.required"
              v-html="$t('Please fill company name')"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="companyId">
            {{ $t('IC') }}<span class="text-danger">*</span>
          </label>
          <input
            id="companyId"
            v-model="company.companyId"
            type="text"
            name="companyId"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.companyId.$error,
              'is-valid': isSubmitted && !$v.company.companyId.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.companyId.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.companyId.required"
              v-html="$t('Please fill IC')"
            />
          </div>
        </div>

        <div class="form-group col-12 col-md-6">
          <label for="taxId">
            {{ $t('DIC') }}<span class="text-danger">*</span>
          </label>
          <input
            id="taxId"
            v-model="company.taxId"
            type="text"
            name="taxId"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.taxId.$error,
              'is-valid': isSubmitted && !$v.company.taxId.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.taxId.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.taxId.required"
              v-html="$t('Please fill DIC')"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="street">
            {{ $t('Street') }}<span class="text-danger">*</span>
          </label>
          <input
            id="street"
            v-model="company.street"
            type="text"
            name="street"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.street.$error,
              'is-valid': isSubmitted && !$v.company.street.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.street.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.street.required"
              v-html="$t('Please fill street')"
            />
          </div>
        </div>

        <div class="form-group col-12 col-md-6">
          <label for="city">
            {{ $t('City') }}<span class="text-danger">*</span>
          </label>
          <input
            id="city"
            v-model="company.city"
            type="text"
            name="city"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.city.$error,
              'is-valid': isSubmitted && !$v.company.city.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.city.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.city.required"
              v-html="$t('Please fill city')"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="zip">
            {{ $t('Zip code') }}<span class="text-danger">*</span>
          </label>
          <input
            id="zip"
            v-model="company.zip"
            type="text"
            name="zip"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.zip.$error,
              'is-valid': isSubmitted && !$v.company.zip.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.zip.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.zip.required"
              v-html="$t('Please fill Zip')"
            />

            <span
              v-if="!$v.company.zip.minLength"
              v-html="$t('Zip is invalid')"
            />

            <span
              v-if="!$v.company.zip.maxLength"
              v-html="$t('Zip is invalid')"
            />
          </div>
        </div>

        <div class="form-group col-12 col-md-6">
          <label for="zip">
            {{ $t('State') }}<span class="text-danger">*</span>
          </label>
          <input
            id="state"
            v-model="company.state"
            type="text"
            name="zip"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && $v.company.state.$error,
              'is-valid': isSubmitted && !$v.company.state.$error
            }"
          />
          <div
            v-if="isSubmitted && $v.company.state.$error"
            class="invalid-feedback"
          >
            <span
              v-if="!$v.company.state.required"
              v-html="$t('Please fill state')"
            />
          </div>
        </div>
      </div>
      <div class="pt-2">
        <button
          class="btn btn-primary btn-md text-uppercase btn-pill"
          :disabled="$v.company.$error"
        >
          {{ $t('Save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  numeric,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  props: ['data'],
  name: 'CompanyInfo',

  data() {
    const {
      companyName,
      companyId,
      street,
      streetNumber,
      city,
      zip,
      taxId,
      state
    } = this.data

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      company: {
        companyName: companyName,
        companyId: companyId,
        street: street,
        streetNumber: streetNumber,
        city: city,
        zip: zip,
        taxId: taxId,
        state: state,
        accountNumber: '',
        bankCode: ''
      },
      isSubmitted: false
    }
  },

  validations: {
    company: {
      companyName: { required },
      companyId: { required, numeric },
      taxId: { required },
      street: { required },
      streetNumber: { numeric },
      city: { required },
      zip: {
        required,
        numeric,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      state: { required }
    }
  },

  methods: {
    async onSubmit({ $axios, $toast, company, data } = this) {
      this.isSubmitted = true
      this.$v.$touch()

      try {
        if (Object.keys(data).length === 0) {
          // Create
          await $axios
            .$post('/api/v1/vendor/invoice-details', company)
            .then(() => {
              $toast.success(this.$t('Saved'))
            })
        } else {
          // Edit
          await $axios
            .$put('/api/v1/vendor/invoice-details', company)
            .then(() => {
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
