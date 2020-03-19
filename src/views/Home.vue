<template>
  <div class="homepage">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      loading="eager"
      width="609"
      height="177"
    />
    <h1>Vue.js & GraphQL & Appolo test project</h1>

    <p>Server with GraphQL is powered by Apollo under the hood</p>
    <p>
      All the created content on
      <strong>'Events'</strong>
      page pushes into its database and gets back with GraphQL immediately,
      could be tested in another browser tab or separate browser
    </p>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>
