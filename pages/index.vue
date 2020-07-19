<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="py-3 my-2 text-center">
            <img src="~/assets/logo-cs.svg" alt="" width="312" />
          </div>
          <div class="p-5 bg-white rounded">
            <div class="card-body">
              <h1 class="h4 font-weight-bold text-center">
                {{
                  $t(
                    'The system serves to streamline cooperation with Pilulka projects'
                  )
                }}
              </h1>
              <FormUserLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormUserLogin from '../components/Form/User/Login'

export default {
  layout: 'login',

  head() {
    return {
      title: 'Login'
    }
  },

  components: {
    FormUserLogin
  }
}
</script>
