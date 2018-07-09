<!-- v-show="food.count>0" 必须放在外层 放在span.icon-remove_circle_outline 没有效果 -->
<template>
  <div class="cartcontrol">
    <div @click="removeFood($event)" v-show="food.count>0" class="cart-decrease" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div @click="addFood($event)" class="cart-add icon-add_circle"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addFood(event) {
        // 需要在移动端开启点击事件
        // 移动端特有 event._constructed
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // this.food.count = 1;
          // 此时点击并没有效果,vue特性:当给观测对象添加或删除一个不存在的字段时,需用vue.set()接口,否则监测不到变化
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$dispatch('cart.add', event.target);
      },
      removeFood(event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
        console.log(444);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
          display: inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>