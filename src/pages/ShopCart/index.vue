<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">

        <ul class="cart-list" v-for="(cart,index) of cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked"
                   @change="updateChecked(cart,$event)">{{cart.isChecked}}
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>

          <!-- 商品数量 -->
          <li class="cart-list-con5">
            <a @click="handler('mins',cart)" class="mins">-</a>
            <input @change="handler('change',cart,$event.target.value*1)"
                   autocomplete="off"
                   type="text"
                   minnum="1"
                   class="itxt"
                   :value="cart.skuNum">
            <a @click="handler('add',cart)" class="plus">+</a>
          </li>
          <!-- 小计 -->
          <li class="cart-list-con6">
            <span class="sum">{{subtotal[index]}}</span>
          </li>
          <!-- 删除/收藏 -->
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0"
               @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{total}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle';
export default {
  name: 'ShopCart',
  computed: {
    ...mapGetters('shopCart', ['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 每项产品小计
    subtotal() {
      let sum = [];
      this.cartInfoList.map(item => sum.push(item.skuPrice * item.skuNum));
      return sum;
    },
    //共计金额
    total() {
      return this.subtotal.reduce((acc, cur) => acc + cur, 0);
    },
    // 全选
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked);
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('shopCart/getCartList');
    },
    // 修改产品个数,对该方法进行节流
    /*
     * @param {*} type 类型
     * @param {*} cart 商品信息
     */
    handler: throttle(async function (type, cart, input) {
      let disNum = cart.skuNum;
      // 增加数量
      if (type === 'add') {
        disNum = 1;
      }
      // 减少
      if (type === 'mins') {
        disNum = -1;
        if (cart.skuNum <= 1) return;
      }
      // 改输入框
      if (type === 'change') {
        disNum = parseInt(input) - cart.skuNum;
        // 判断非法或有负数
        if (isNaN(input) || input < 1) disNum = 0;
      }

      // 派发action
      try {
        // 获取成功
        await this.$store.dispatch('detail/addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 500),
    // 删除某个产品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('shopCart/deleteCartListBySkuId', cart.skuId);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 修改产品勾选状态
    async updateChecked(cart, event) {
      try {
        // 修改成功，重新获取购物车数据
        let isChecked = event.target.checked ? '1' : '0';
        let skuId = `${cart.skuId}`;
        await this.$store.dispatch('shopCart/updateCartCheckedById', {
          skuId,
          isChecked
        });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    async deleteCheckedCart() {
      try {
        await this.$store.dispatch('shopCart/deleteCheckedCartById');
        this.getData();
      } catch (error) {
        console.log(error.essage);
      }
      this.getData();
    },
    // 修改全选
    async updateAllCartChecked(e) {
      try {
        let checkedAll = +e.target.checked + '';
        // 派发action
        await this.$store.dispatch('shopCart/updateAllcartIsChecked', checkedAll);
        this.getData();
      } catch (err) {
        console.log(err.message);
      }
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>