/**
 * @author super
 * @description 大部分页面都需要用到的字段以及默认方法
 */
export default {
  data () {
    return {
      loading: {
        state: false, // 是否显示加载状态
        text: '加载中...' // 加载状态文字
      }
    }
  },
  methods: {
  },
  computed: {
    isMainUser: function () {
      return this.$store.state.user.info.type === 'main'
    },
    userType: function () {
      return this.$store.state.user.info.type
    },
    userName: function () {
      return this.$store.state.user.info.name
    }
  }
}
