import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'VMS_PHARMACY_01',
      paths: []
    })(store)
  })
}
