<template>
  <div id="app" class="layout-wrapper">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar'

export default {
  components: { Navbar },
}
</script>
