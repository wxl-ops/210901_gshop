#购物车动画
    使用transition包裹使用动画的标签。
    购物车列表他是在整个页面的下方，刚好top值被购物车给挡住了，动画就是让整个列表上移。
#购物车列表滑动
    使用better-scroll库来实现滑动。
    在购物车列表显示时，使用nextTick去new这个第三方库。
    bug：
        1、new这个库时，没有让他变成单例，就是只被new一次，导致购物车被显示隐藏好几次就会有很多个实例，
        后果是，点击添加食物，就会有很多实例响应，导致点一次就会添加好多个食物。
        2、添加一个食物后，点击购物车创建滑动库的实例（实例被创建），因为只有一个内容所以划不动，
        关闭后接着添加很多食物，第一次滑还是划不动，主要是没识别到列表内容增加了，第二次滑动就成功了，应该是监听到滑动自动重新获取数据了

#清空购物车
    使用mint-ui组件库完成清理购物车操作。也就是清空foodcount这个数组就行了（彳亍这个想法错误，只是把内容清空了，但是food中的count值仍然存在，数据被污染了）。
    先清除count，再清空数组。
