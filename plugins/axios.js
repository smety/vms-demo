export default function({ $axios, redirect, store, $toast }) {
  $axios.onRequest(config => {
    if (store.state.auth.token) {
      config.headers.common[
        'Authorization'
      ] = `Bearer ${store.state.auth.token}`
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    // Not found
    if (code === 404) {
      return redirect('/404')
    }

    // Unauthorized
    if (code === 401) {
      return redirect('/logout')
    }
  })
}
