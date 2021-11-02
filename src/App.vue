<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>

  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name: 'App',
    components: {FooterGuide},
    mounted () {
      this.$store.dispatch('login/getUserInfo')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
