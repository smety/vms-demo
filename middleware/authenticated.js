export default function({ store, redirect }) {
  const { token } = store.state.auth
  if (!token) {
    return redirect('/')
  }
}
