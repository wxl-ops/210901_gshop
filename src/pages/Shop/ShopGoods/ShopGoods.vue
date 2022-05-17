<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
<!--          完成左侧列表的展示-->
<!--          完成左侧列表的类名选择-->
          <li class="menu-item"
              :class="{current: index === currentIndex}"
              v-for="(good,index) in goods" :key="index"
              @click="toggleMenu(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
<!--      完成右侧列表的展示-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(food,index) in good.foods" :key="index"
                  @click="showInfo(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food ref="showInfo" :food="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    name: 'ShopGoods',
    components:{
      ShopCart,
      Food,
      CartControl
    },
    data(){
      return {
        //存储右侧当前滚动条的y值
        scrollY: 0,
        //存储右侧食物列表每个种类的top值
        tops:[],
        //存储当前点击的food信息
        food:{}
      }
    },
    //计算属性会在浏览器刷新后执行一次
    computed:{
      ...mapState('shop',['goods']),
      currentIndex(){
        const {scrollY,tops} = this;
        //使用数组的方法findIndex，找出符合return的条件的下标
        const index = tops.findIndex((top,index)=>{
          return scrollY >= top && scrollY < tops[index + 1]
        })
        return index;
      }
    },
    methods:{
      //展示食品详情
      showInfo(food){
        this.food = food;
        this.$refs.showInfo.changeShow()
      },
      //完成点击选项到指定位置
      toggleMenu(index){
        //获取当前点击类别的做对应的右面食品列表的top值
          let top = this.tops[index]
        //立即让滚动值变为当前值，立马展现效果，对客户友好
          this.scrollY = top
        //better-scroll的方法
          this.scrollMove.scrollTo(0,-top,300)
      },
      _initScroll(){
        //overflow: hidden具有继承性
        //使用这个滚动库时，注意使用nextTick，否则会报错，他需要列表中的数据。
        //使用这个库的方式，new+对应类名
        new BScroll('.menu-wrapper',{
          scrollY:true,
          click:true
        });
        this.scrollMove = new BScroll('.foods-wrapper',{
          click:true,
          probeType:2
        });
        //better-scroll的方法
        this.scrollMove.on('scroll',({y})=>{
          this.scrollY = Math.abs(y)
        })
        this.scrollMove.on('scrollEnd',({y})=>{
          this.scrollY = Math.abs(y)
        })
      },
      _initTops(){
        let top = 0;
        let tops = [];
        tops.push(top);
        //获取食品列表每个分类的标签
        let lis = this.$refs.foodUl.getElementsByClassName('food-list-hook');
        //转为数组，获取高度，最终确定top值
        Array.prototype.slice.call(lis).forEach((item,index)=>{
          top += item.clientHeight
          tops.push(top)
        });
        this.tops = tops
      }
    },
    //浏览器刷新会触发这个函数
    mounted () {
      this.$store.dispatch('shop/getGoods',()=>{
        //但是这个nextTick不一样，他总是会当数据更新后的下一次执行（所以才会被戏称为生命周期钩子）。
        this.$nextTick(()=>{
          //把方法提取出去，让代码整洁
          this._initScroll();
          this._initTops();
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden;
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
