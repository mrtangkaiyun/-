<template>
  <div>
    <a-upload
      :placeholder="$t('form.pleaseUpload')"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :custom-request="fileUpload"
    >
      <img
        class="image"
        @mouseover="onFocus"
        v-if="!isDocumentType && upload.imageUrl"
        :src="upload.imageUrl"
        alt="avatar"
      />
      <img
        class="image"
        @mouseover="onFocus"
        v-else-if="isDocumentType && upload.imageUrl"
        src="/document.png"
        alt="avatar"
      />
      <div v-else>
        <a-icon :type="upload.loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传</div>
      </div>
      <div class="mask" v-if="showMask" @mouseleave="onBlur" @click.stop="clickMask($event)">
        <div class="mask-icon">
          <a-icon @click="handlePreview" :style="{ color: '#fff' }" type="eye" />
          <a-icon @click="handleRemove" :style="{ color: '#fff', marginLeft: '10px' }" type="delete" />
        </div>
      </div>
      <div class="box" v-if="upload.loading">
        <div class="boxactive" :style="'width:' + uploadWidth"></div>
      </div>
    </a-upload>
    <a-modal :visible="upload.previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="upload.previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { uploadPic } from '@/api/up'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: null
    },
    thumbnair: {
      type: String,
      default: ''
    },
    accepts: {
      type: String,
      default: 'png;jpg;jpeg;bmp;'
    },
    hint: {
      type: String,
      default: 'form.defaultUptips'
    },
    size: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: 'image',
      validator: value => {
        return ['image', 'video', 'document'].includes(value)
      }
    }
  },
  data () {
    return {
      upload: {
        loading: false,
        imageUrl: null,
        file: null,
        previewVisible: false,
        previewImage: null
      },
      videoUrl: null,
      showMask: false,
      uploadWidth: 0,
      setInter: ''
    }
  },
  computed: {
    isDocumentType () {
      return this.type === 'document'
    }
  },
  created () {},
  watch: {
    value: {
      immediate: true,
      handler () {
        this.upload.imageUrl = this.value
      }
    }
  },
  methods: {
    beforeUpload (file) {
      this.upload.file = null
      const suffix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
      const isAllowType = this.accepts.split(';').includes(suffix)
      if (!isAllowType) {
        this.$message.error(this.$t(this.hint))
      }
      const isLtSize = file.size / 1024 / 1024 < this.size
      if (!isLtSize) {
        this.$message.error(`${this.$t('form.notFileExceedxxxM')}${this.size}M!`)
      }
      if (isAllowType && isLtSize) {
        this.upload.file = file
        return true
      }
      return false
    },
    fileUpload () {
      const self = this
      const { file } = this.upload
      self.upload.loading = true
            const form = new FormData()
            form.append('files', file)
            uploadPic(form).then(({ data, code }) => {
              if (code === 1) {
                if (typeof data === 'string') {
                  self.upload.imageUrl = data
                  self.$emit('change', data)
                } else {
                  self.upload.imageUrl = data[0]
                  self.$emit('change', data[0])
                }
              }
              self.upload.loading = false
            })
    },
    async handlePreview () {
      this.upload.previewImage = this.upload.imageUrl
      this.upload.previewVisible = true
    },
    handleCancel () {
      this.upload.previewVisible = false
    },
    handleRemove () {
      this.upload.imageUrl = null
      this.showMask = false
      this.$emit('change', null)
    },
    clickMask (e) {
      try {
        e.stopPropagation()
      } catch (e) {
        window.event.cancelBubble = true
      }
    },
    onBlur () {
      this.showMask = false
    },
    onFocus () {
      this.showMask = true
    }
  }
}
</script>
<style scoped>
.image {
  width: 96px;
  height: 96px;
}
.avatar-uploader {
  position: relative;
}
.mask {
  position: absolute;
  z-index: 1;
  width: 112px;
  height: 112px;
  left: 4px;
  top: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.mask-icon {
  width: 100%;
  height: 20px;
  margin-top: 45px;
}
.box {
  width: 100%;
  height: 3px;
  border-radius: 3px;
  position: relative;
}
.box .boxactive {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 3px;
  background: #1890ff;
}
</style>
