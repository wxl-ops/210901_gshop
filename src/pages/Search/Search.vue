<template>
  <section class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="keyword">
      <input type="submit" name="submit" class="search_submit">
    </form>
    <section class="list" v-show="!noSearchShops">
      <ul class="list_container" >
        <router-link to="/shop" class="list_li" tag="li" v-for="(searchShop, index) in searchShops" :key="index">
          <section class="item_left">
            <img class="restaurant_img" :src="imgBaseUrl+searchShop.image_path">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{searchShop.name}}</span>
              </p>
              <p>月售 {{searchShop.recent_order_num}} 单</p>
              <p> {{searchShop.float_delivery_fee}}元起送 / 距离 {{searchShop.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>

    <div class="search_none" v-show="noSearchShops">很抱歉！无搜索结果</div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop';
  import {mapState} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return {
        keyword:'',
        imgBaseUrl: 'http://cangdu.org:8001/img/',
        noSearchShops:false
      }
    },
    components: {HeaderTop},
    computed:{
      ...mapState('search',['searchShops'])
    },
    watch:{
      //监视搜索框是否有内容，没有内容就把搜索记录也清空
      keyword(){
        if(!this.keyword){
          this.$store.commit('search/CLEAR_SEARCH_SHOPS')
        }
      },
      searchShops(){
        //这里为了完成搜不到和搜到的列表相互切换功能
        //条件的含义是：当存搜索数据的数组没有内容，且搜索框有value时，把状态置为true，使未搜索显示出来。
        if (!this.searchShops.length && this.keyword){
          this.noSearchShops = true
        }else {
          //这里是为了解决：输入能搜索到的，然后再搜索搜不到的，然后再搜索搜得到的。最后出现的是“抱歉没搜到”；当数组有内容时，置为false使列表展示。
          this.noSearchShops = false
        }
      }
    },
    methods:{
      search () {
        // 得到搜索关键字
        const keyword = this.keyword.trim()
        // 进行搜索
        if(keyword) {
          this.$store.dispatch('search/searchShop', keyword);
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
