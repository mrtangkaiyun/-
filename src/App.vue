<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  data () {
    return {
    }
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>
<style lang="less">
.ant-layout, .ant-layout-footer {
  background-color: transparent!important;
}
// .ant-pro-page-header-wrap-page-header-warp{
//   background-color: transparent!important;
//   background-image: repeating-linear-gradient(#158E76,#259E82,#31AB89)!important;
// }
.ant-pro-basicLayout .ant-layout-header:not(.ant-pro-top-menu) {
  background-color: transparent!important;
  background:transparent!important;
}
.ant-pro-global-header{
  background-color: transparent!important;
  background:transparent!important;
  background-image: repeating-linear-gradient(#158E76,#259E82,#31AB89)!important;
}
.ant-layout-sider {
   background-color: transparent!important;
  background:transparent!important;
  background-image: repeating-linear-gradient(#158E76,#259E82,#31AB89)!important;
}
.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
  background-color: transparent!important;
  background:transparent!important;
}
.ant-pro-sider-menu-logo{
  background-color: transparent!important;
  background:transparent!important;
}
// .ant-pro-page-header-wrap-children-content{
//   background-color: transparent!important;
//   background:transparent!important;
//   background-image: repeating-linear-gradient(#158E76,#259E82,#31AB89)!important;
// }
// .ant-pro-page-header-wrap-children-content>.ant-card{
//     background-color: transparent!important;
//     background:transparent!important;
//   }
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: transparent !important;
    background-image: repeating-linear-gradient(#158E76,#259E82,#31AB89)!important;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub{
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 10%) inset!important;
   box-shadow: 0 1px 1px rgb(0 0 0 / 10%) inset!important;
}
.ant-breadcrumb, .ant-breadcrumb-separator{
  color: #158E76!important;
}
.ant-breadcrumb > span:last-child{
  color: #158E76!important;
}
.ant-breadcrumb a{
  color: #158E76!important;
}
.ant-page-header-heading-title{
   color: #158E76!important;
}
.ant-modal-header{
  background-color: transparent !important;
  background-image: repeating-linear-gradient(#158E76,#259E82,#31AB89)!important;
  .ant-modal-title{
    color: #ffffff!important;
  }
}
.ant-modal-close,.ant-pro-global-header-trigger,.ant-pro-account-avatar{
  color: #ffffff!important;
}
  .delete-box{
    padding: 10px 0;
  }
  .text-center{
    text-align: center;
  }
  .margin-l-20 {
    margin-left: 20px;
  }
  .padding-t-50 {
    padding-top: 50px;
  }
  .page-modal {
    .ant-form-item-label {
      label::after{
        content: ''!important;
      }
    }
  }
</style>
