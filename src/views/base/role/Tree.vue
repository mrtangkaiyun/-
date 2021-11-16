<template>
  <div>
    <a-modal
      class="page-modal"
      v-model="dialog.visiable"
      :afterClose="closeDialog"
      :title="dialog.title"
      :footer="null"
      :keyboard="false"
      :maskClosable="false"
      width="500px"
    >
      {{ checkedKeys }}
      <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
      />
      <div class="text-center">
        <a-button @click="closeDialog"> 取消 </a-button>
        <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import { load } from '@/api/goods'
import { treeData } from '@/utils/auth'
export default {
  mixins: [model],
  data () {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0', '0-0-0'],
      selectedKeys: [],
      treeData
    }
  },
  created () {
    console.log(123456)
    const title = '勾选权限'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    // this.fetchInfo()
  },
  methods: {
    // fetchInfo() {
    //   const { obj } = this.data
    //   load(obj.id).then(({ code, data }) => {
    //     if (code === 1) {
    //       data.imgDtos = data.imgDtos.map((e) => e.imgPath)
    //       this.originalData = this.$copy(data)
    //       this.$setOriginalKV(this.formInit, data)
    //     }
    //   })
    // },
    handleSubmit () {},
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    }
  }
}
</script>
<style lang="less" scoped>
</style>
