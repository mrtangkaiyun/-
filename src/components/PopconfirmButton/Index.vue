<template>
  <a-popconfirm okText="确定" cancelText="取消" @confirm="clickDelete">
    <template slot="title">
      <p>{{ customTip }}</p>
    </template>
    <slot v-if="custom"></slot>
    <a href="javascript:;" v-else>删除</a>
  </a-popconfirm>
</template>

<script>
export default {
  name: 'PopconfirmButton',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    custom: {
      type: Boolean,
      default: false
    },
    customTip: {
      type: String,
      default: '你确定删除？'
    }
  },
  methods: {
    clickDelete () {
      this.$emit('click', this.data, this.index)
    }
  }
}
</script>
