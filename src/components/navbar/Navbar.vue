<template>
  <div id="nav" class="navbar">
    <router-link exact to="/" class="navbar-link">
      {{ $t('navigation.home') }}
    </router-link>
    <router-link to="/events" class="navbar-link">
      {{ $t('navigation.events') }}
    </router-link>
    <router-link to="/about" class="navbar-link">
      {{ $t('navigation.about') }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
