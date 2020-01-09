<template lang="html">
  <div id="wrapper">
    <div class="content-page">
      <div class="content">
        <!-- Start Content-->
        <nuxt />
        <div class="container-fluid">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
  }
</script>
