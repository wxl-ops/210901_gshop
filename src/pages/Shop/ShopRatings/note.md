#完成ShopRatings组件1
    引入star组件；
    使用v-for数据动态显示。

#完成ShopRatings组件2
    使用better-scroll实现滑动。
    设计好data存储数据：布尔值来限制是否只显示有文本的；选择评价类型：0满意，1不满意，2全部
    使用getters计算有多少个满意的人。
    难度出现了：
        现在要产生过滤新数组，来完成只看满意评价或者不满意评价。
        开发过程中遇到的难题一般有两种：
            一、流程很长
            二、需要考虑很多可能性（这次的难点属于这个）
        分析如何解决问题：
            条件1：
                selectType（选择哪种评论）：0/1/2
                rateType（哪种评论）：0/1
                条件确定：selectType === 2 || selectType === rateType
            条件2：
                onlyShowText(是否只展示有文本的评论):true/false
                text：有值/没值
                条件确定：!onlyShowText || text.length > 0
