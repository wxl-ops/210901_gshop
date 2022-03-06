<template>
  <div class="cartcontrol">
    <transition name="move" >
      <div class="iconfont icon-remove_circle_outline" @click.stop="updateFoodCount(false)" v-if="food.count"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
  export default {
    name: 'CartControl',
    props:['food'],
    methods:{
      updateFoodCount(boolean){
        let food = this.food
        this.$store.dispatch('shop/updateFoodCount',{boolean,food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .enter-active-move,&.leave-active-move
      transtions all .3s
    .enter-move,&.leave-to-move
      opacity 0
      transform translateX(15px) rotate(180deg)
    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
