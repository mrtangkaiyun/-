export default {
  data () {
    return {
      treeData: [], // 数据源
      selectedKeys: [], // 选中的 key
      expandedKeys: [] // 展开的 key
    }
  },
  methods: {
    getTree (tree) {
      tree().then(({ code, data }) => {
        if (code === 0) {
          this.processTree(data)
          this.treeData = data
        }
      })
    },
    processTree (data) {
      const that = this
      function render (arr) {
        arr.forEach(item => {
          item.key = item.id
          item.title = item.title || item.name
          that.list.push(item)
          that.expandedKeys.push(item.id)
          item.children && render(item.children)
        })
      }
      render(data)
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    }
  }
}
