<template>
  <div class="clearfix">
    <a-upload
      :placeholder="$t('form.pleaseUpload')"
      v-decorator="['imageUrl']"
      list-type="picture-card"
      :file-list="upload.fileList"
      @preview="handlePreview"
      @change="handleChange"
      :before-upload="beforeUpload"
      :custom-request="fileUpload"
    >
      <div v-if="upload.fileList.length < 100">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="upload.previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="upload.previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { uploadPic } from '@/api/up'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    len: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      upload: {
        file: null,
        previewVisible: false,
        previewImage: '',
        fileList: []
      },
      first: 1
    }
  },
  created () {},
  methods: {
    handleCancel () {
      this.upload.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      if (file.url) {
        file.url = file.url.split('?')[0]
      }
      this.upload.previewImage = file.url || file.preview
      this.upload.previewVisible = true
    },
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        this.upload.file = null
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error(this.$t('请上传jpeg, png图片'))
          return false
        }
        if (this.upload.fileList.length >= this.len) {
           this.$message.error(this.$t(`最多可上传${this.len}张图片`))
           return false
        }
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
          this.$message.error(this.$t('上传图片不能大于5M'))
        }
        if (isJpgOrPng && isLt5M) {
          this.upload.file = file
          return resolve(true)
        }
        return false
      })
    },
    handleChange ({ fileList }) {
      this.upload.fileList = fileList
    },
    async fileUpload () {
      const { file } = this.upload
      const self = this
            const form = new FormData()
            form.append('files', file)
            uploadPic(form).then(({ data, code }) => {
              const length = this.upload.fileList.length - 1
              if (code === 1) {
                if (typeof data === 'string') {
                  const item = self.upload.fileList[length]
                  item.status = 'done'
                  item.url = data
                  self.upload.fileList.splice(length, 1, item)
                } else {
                  const item = self.upload.fileList[length]
                  item.status = 'done'
                  item.url = data[0]
                  self.upload.fileList.splice(length, 1, item)
                }
              } else {
                self.upload.fileList.splice(length, 1)
              }
            })
      return true
    }
  },
  watch: {
    data: {
      immediate: true,
      handler (arr) {
        if (arr !== undefined && arr !== null && arr.length > 0 && this.first === 1) {
          this.first++
          const fileList = []
          let index = 0
          arr.forEach((item) => {
            // item = item.split('?')[0]
            // item += '?imageMogr2/thumbnail/!30p'
            const image = {
              uid: index,
              status: 'done',
              url: item,
              name: 'img' + index
            }
            index += 1
            fileList.push(image)
          })
          this.upload.fileList = fileList
        }
      }
    },
    'upload.fileList': {
      handler (val) {
        const urls = []
        val.forEach((item) => {
          if (item.status === 'done') {
            item.url = item.url.split('?')[0]
            urls.push(item.url)
          }
        })
        this.$emit('change', urls)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-list-picture-card-container {
  width: 95px;
  height: 95px;
}
.ant-upload-list-picture-card-container:not(:first-child) {
  margin-left: 5px;
}
.ant-upload.ant-upload-select-picture-card {
  width: 104px;
  height: 104px;
}
.ant-upload-picture-card-wrapper {
  .ant-upload.ant-upload-select-picture-card:last-child {
    margin-left: 5px;
  }
}
</style>
