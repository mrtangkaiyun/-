<template>
  <a-upload
    name="file"
    :file-list="fileList"
    @change="handleChange"
    :before-upload="beforeUpload"
    :custom-request="fileUpload"
    :accept="accepts"
  >
    <a-button> <a-icon type="upload" /> {{ $t('form.clickUpload') }} </a-button>
  </a-upload>
</template>
<script>
import { getCredential } from '@/api/txCloudConfig'
import { uuid, getFileName } from '@/utils/util'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    data: {
      type: String,
      default: null
    },
    accepts: {
      type: String,
      default: 'ppt;pptx;pdf'
    },
    size: {
      type: Number,
      default: 5
    },
    hint: {
      type: String,
      default: 'form.defaultUptips'
    }
  },
  data () {
    return {
      fileList: [],
      upload: {
        loading: false,
        file: null,
        fileUrl: null
      }
    }
  },
  created () {
    if (this.data !== undefined && this.data !== null) {
      this.upload.fileUrl = this.data
      const fileName = getFileName(this.data)
      const file = {
        uid: 1,
        status: 'done',
        name: fileName,
        url: this.data
      }
      this.fileList = [file]
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file, info.fileList)
        this.$emit('change', null)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
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
   async fileUpload () {
      const curI = await this.$store.dispatch('GET_CERCONFIG', 'FileServerHost')
      const curIfolder = await this.$store.dispatch('GET_CERCONFIG', 'FilePath')
      const { file } = this.upload
      const self = this
      var COS = require('cos-js-sdk-v5')
      var cos = new COS({
        // 必选参数
        getAuthorization: function (options, callback) {
          getCredential('FILE').then(result => {
            const data = result.data
            var credentials = data && data.credentials
            if (!data || !credentials) return console.error('credentials invalid')
            if (callback) {
              const parameter = {
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                XCosSecurityToken: credentials.sessionToken,
                StartTime: data.startTime,
                ExpiredTime: data.expiredTime,
                ScopeLimit: true
              }
              callback(parameter)
            }
          })
        }
      })

      let fileName = ''
      const fileExtension = file.name.substring(fileName.lastIndexOf('.') + 1, file.name.length)
      if (process.env.NODE_ENV === 'development') {
        fileName = curIfolder.value + uuid() + '.' + fileExtension
      } else {
        fileName = curIfolder.value + uuid() + '.' + fileExtension
      }
      cos.putObject({
        Bucket: 'exhibition-file-1304008446',
        Region: 'ap-guangzhou',
        Key: fileName,
        StorageClass: 'STANDARD',
        Body: file,
        onProgress: function (progressData) {
        }
      }, function (err, data) {
        self.upload.loading = false
        console.log(err || data)
        if (data.statusCode === 200) {
          self.upload.fileUrl = curI.value + fileName
          const file = {
            uid: 1,
            status: 'done',
            name: fileName,
            url: self.upload.fileUrl
          }
          self.fileList = [file]
          self.$emit('change', self.upload.fileUrl)
        }
      })
    }
  },
  watch: {
    data: {
      handler: function (newVal, oldVal) {
        if (!newVal) {
          this.upload.fileUrl = null
          this.fileList = []
        } else if (oldVal !== newVal) {
          this.upload.fileUrl = newVal
          const fileName = getFileName(newVal)
          const file = {
            uid: 1,
            status: 'done',
            name: fileName,
            url: this.data
          }
          this.fileList = [file]
        }
      }
    }
  }
}
</script>
