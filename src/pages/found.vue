<template>
    <div>
      <c-head>
        <div slot='left'>
          <div  class="return" @click='turnUp'>
            <img src="/static/btn_return.png" alt="">
          </div>
        </div>
        <div slot='center' class="head-title" >
          <span>发现</span>
        </div>
      </c-head>
      <group :gutter="50">
        <cell is-link @click.native="findIn">
          <p slot='title' class="sch">
            优学圈
          </p>
          <img slot="icon" style="display:block;margin-right:10px;" width="20" src="/static/find1.png" alt="">
        </cell>
        <cell is-link @click.native="tipoff">
          <p slot='title' class="sch">
            爆料圈
          </p>
          <img slot="icon" style="display:block;margin-right:10px;" width="20" src="/static/icon_fact.png" alt="">
        </cell>
        <cell is-link @click.native="yls">
          <p slot='title' class="sch">
            娱乐圈
          </p>
          <img slot="icon" style="display:block;margin-right:10px;" width="20" src="/static/yl.png" alt="">
        </cell>
      </group>
    </div>
</template>

<script>
    export default {
        methods: {
          findIn () {
            this.$router.push('/find')
          },
          turnUp: function() {
            this.$router.push('/home');
          },
          tipoff: function() {
            this.$router.push("/tipoff")
          },
          yls:function(){
              window.location.href='http://u.dgkangfei.com/m2c/?order_cust_id=2274127&user_id=lbyx2019'
          }
        }
    }
</script>

<style scoped>
.sch{

  color:#666;
  font-size: 16px;
}
</style>
