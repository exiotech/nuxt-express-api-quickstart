
export default async function({ $auth, $axios }) {
  if (!$auth.loggedIn) {
    return;
  }
  try {
    if ($auth.strategy.name !== 'local') {
      const token = $auth.getToken($auth.strategy.name);
      const url = `/auth/oauth/${$auth.strategy.name}`;
      const { data } = await $axios.post(url, { token });
      $auth.setToken('local', `Bearer ${data.token}`);
      $auth.setStrategy('local');
      await $auth.fetchUser();
    }
  } catch (e) {
    console.error(e);
    $auth.logout();
  }
}
