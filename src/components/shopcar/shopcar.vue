<template>
  <div class="shopcar">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div v-show="totalCount>0" class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="payClass">{{payDesc}}</div>
      </div>
      <div class="ball-container">
        <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
    },
    computed: {
      totalPrice() {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        });
        return price;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      drop(el) {
        // console.log(el);
        for (var i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return; // 找到一个ball.show为false的就跳出循环
          };
        };
      }
    },
    // Vue.transition('drop', {
    //   beforeEnter: function (el) {}
    // })
    transitions: {
      drop: {
        beforeEnter(el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - 22 - rect.top);
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            };
          };
        },
        enter(el) {
          // 将小球位置重置
          /* eslint-disable no-unused-vars */
          // ES6规范: 变量申明后未被调用会报错
          let rf = el.offsetHeight;
          // 触发浏览器重排
          this.$nextTick(() => { // 异步执行
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
          });
        },
        afterEnter(el) {
          // 取到做完动画的球，再置为false，即重置，它还可以接着被利用
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          };
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcar
    position: fixed
    left: 0
    bottom: 0
    width: 100%;
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 8px
          padding: 6px
          border-radius: 50%
          background: #141d27
          .logo
            text-align: center
            width: 40px 
            height: 40px
            background: #2b343c
            border-radius: 50%
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 40px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4) 
        .price
          display: inline-block
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          padding: 6px 10px 6px 0
          border-right: 1px solid rgba(255,255,255,0.1)
          vertical-align: top;
          margin-top: 12px;
          &.highlight
            color: #fff
        .desc
          display: inline-block
          font-size: 10px
          color: rgba(255,255,255,0.4)
          vertical-align: top;
          margin: 14px 0 0 10px;
          line-height: 24px;
      .content-right
        flex: 0 0 105px
        width: 105px
        font-size: 12px 
        font-weight: 700
        color: rgba(255,255,255,0.4)
        text-align: center
        line-height: 52px
        background: #2b333b
        &.not-enough
            background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-transition
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
</style>