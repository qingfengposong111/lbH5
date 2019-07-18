<template>
    <div class="search">
        <x-icon class="icon_search" type="ios-search" size="16"></x-icon>
        <input type="text"  :value='msg' @change='inputMsg' :placeholder="placeholder ">
      <x-icon v-if="msg" type="ios-close-empty" size="16" @click.native="cancel"></x-icon>
    </div>
</template>

<script>
  export default {
  name: "c-search",
  components: {},
  props: {
    placeholder: String
  },
  data() {
    return {
    };
  },
  watch: {},
    computed: {
      msg () {
        return this.$store.state.user_val
      }
    },

    directives: {
      focus: {
// 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
  methods: {
    inputMsg:function(e){
      this.$store.commit('SET_MSG',e.target.value);
    },
    cancel () {
      this.$store.state.user_val = ''
    }
  },
  created() {
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
    .search {
    position: relative;
    }
    .search .vux-x-icon-ios-search {
    position: absolute;
    left: 8px;
    top: 7px;
    line-height: 29px;
    fill:#999;
    }
    .search .vux-x-icon-ios-close-empty{
      position: absolute;
      right: 5px;
      top: 7px;
      line-height: 29px;
      fill:#999;
      background: #ccc;
      border-radius:50%;
    }
    input[type="text"] {
    padding-left: 25px;
    width: 100%;
    height: 29px;
      font-size: 14px;
    border: none;
    border-radius: 5px;
    background: #f6f5f5;
    color: #666666;
    }
    input::placeholder {
    color: #999;
    }

</style>
