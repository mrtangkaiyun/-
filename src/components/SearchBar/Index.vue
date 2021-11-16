<template>
  <div class="search-bar">
    <slot></slot>
    <template v-if="data && data.length > 0">
      <div class="left-box" v-if="leftVisible">
        <div class="left" v-for="(item, index) in data[0]" :key="index">
          <label>{{ labelText(item) }}</label>
          <template v-if="item.type === 'input'">
            <a-input v-model.trim="query[item.key]" :placeholder="item.placeholder" @keyup.enter.native="process"></a-input>
          </template>
          <template v-else-if="item.type === 'select'">
            <a-select v-model="query[item.key]" :placeholder="item.placeholder" :allowClear="true">
              <a-select-option v-for="sub in item.options" :key="sub.value" :value="sub.value">{{ sub.label }}</a-select-option>
            </a-select>
          </template>
          <template v-else-if="item.type === 'date'">
            <a-date-picker v-model="query[item.key]" :placeholder="item.placeholder" format="YYYY-MM-DD"></a-date-picker>
          </template>
          <template v-else-if="item.type === 'range'">
            <a-range-picker v-model="query[item.key]" class="range-picker" format="YYYY-MM-DD"></a-range-picker>
          </template>
          <template v-else-if="item.type === 'cascader'">
            <a-cascader
              v-model="query[item.key]"
              :placeholder="item.placeholder"
              @change="search"
              expandTrigger="hover"
              :options="item.options"
              :fieldNames="item.fieldNames">
            </a-cascader>
          </template>
          <template v-else-if="item.type === 'search'">
            <a-button @click="search" type="primary">{{ item.name || $t('查询') }}</a-button>
          </template>
          <template v-else-if="item.type === 'reset'">
            <a-button @click="reset">{{ item.name || $t('重置') }}</a-button>
          </template>
        </div>
      </div>
      <template v-if="data.length > 1">
        <div v-if="rightVisible">
          <slot ref="rightFirst" name="rightFirst"></slot>
          <div class="left" v-for="(item, index) in data[1]" :key="index">
            <template v-if="item.type === 'add'">
              <a-button @click="clickAdd">{{ item.name }}</a-button>
            </template>
            <template v-else-if="item.type === 'export'">
              <a-button @click="clickExport">{{ item.name }}</a-button>
            </template>
            <template v-else-if="item.type === 'import'">
              <a-button @click="clickImport">{{ item.name }}</a-button>
            </template>
            <template v-else-if="item.type === 'download'">
              <a-button @click="clickDownload">{{ item.name }}</a-button>
            </template>
            <template v-else-if="item.type && item.name && item.custom">
              <a-button @click="$emit(item.type,index,item)" :icon="item.icon">{{ item.name || $t('重置') }}</a-button>
            </template>
            <template v-else-if="item.type === 'more'">
              <a-dropdown trigger="click">
                <a-button size="small">更多菜单<a-icon type="down" /></a-button>
                <a-menu slot="dropdown">
                  <a-menu-item v-for="label in item.labels" :key="label">{{ label }}</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    data: { // 初始化的数据模型
      type: Array,
      default: () => []
    },
    leftVisible: {
      type: Boolean,
      default: true
    },
    rightVisible: { // 是否需要显示右边区域按钮 默认显示
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      query: {}
    }
  },
  methods: {
    search () { // 处理查询参数
      const query = this.query
      const res = {}
      for (const key in query) {
        const val = query[key]
        console.log('val===' + JSON.stringify(val))
        if (this.isPrimitive(val)) {
          res[key] = val
        } else if (val instanceof Array) {
          if (val.length > 0) {
            // res[key] = val[val.length - 1]
            res[key] = val
          }
        } else if (key.indexOf('-') > -1) {
          const keys = key.split('-')
          keys.forEach((x, i) => { val[i] && (res[x] = val[i].format('YYYY-MM-DD')) })
        } else {
          val && (res[key] = val.format('YYYY-MM-DD'))
        }
      }
      this.$emit('search', res)
      return res
    },
    isPrimitive (val) {
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        return true
      }
      return false
    },
    reset () {
      this.query = {}
      this.$emit('reset')
    },
    clickAdd () {
      this.$emit('add')
    },
    clickExport () { // 导出数据
      this.$emit('export')
    },
    clickImport () {
      this.$emit('import')
    },
    clickDownload () {
      this.$emit('download')
    },
    labelText (item) {
      if (item.type === 'range') {
        return item.label + '：'
      } else if (item.placeholder) {
        return (item.label ? item.label : item.placeholder.substr(3)) + '：'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
