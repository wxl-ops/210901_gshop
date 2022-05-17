<template>
  <div class="container">
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  export default {
    name: 'Shop',
    components: {ShopHeader},
    mounted () {
      this.$store.dispatch('shop/getInfo')
      this.$store.dispatch('shop/getRatings')
      this.$store.dispatch('shop/getGoods')
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .container
    width 100%
    overflow hidden
    .tab
      height 40px
      line-height 40px
      background #fff
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        float left
        width: 33.33333%
        text-align center
        font-size 14px
        color rgb(77, 85, 93)
        a
          display block
          position relative
          &.router-link-active
            color #02a774
            &::after
              content ''
              position absolute
              left 50%
              bottom 1px
              width 35px
              height 2px
              transform translateX(-50%)
              background #02a774
</style>
