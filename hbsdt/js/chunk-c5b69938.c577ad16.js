(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5b69938"],{"78a5":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("page-header-wrapper",[a("a-card",{attrs:{bordered:!1}},[a("div",{staticClass:"table-page-search-wrapper"},[a("search-bar",{ref:"searchbar",attrs:{data:e.searchData},on:{search:e.clickSearch}}),a("a-table",{attrs:{columns:e.columns,dataSource:e.table.data,rowKey:"id",size:e.table.size,loading:e.table.loading,pagination:e.pagination,scroll:{x:600}},on:{change:e.handleTabChange},scopedSlots:e._u([{key:"index",fn:function(t,a,i){return[e._v(" "+e._s(i+1)+" ")]}},{key:"action",fn:function(t,i){return a("span",{},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"form"},on:{click:function(t){return e.clickUpdate(i)}}}),a("a-divider",{attrs:{type:"vertical"}}),a("a-button",{attrs:{type:"primary",shape:"circle",icon:"info"},on:{click:function(t){return e.clickDetail(i)}}})],1)}}])})],1)]),e.add.visiable?a("add",{attrs:{data:e.add.data},on:{add:e.refresh,edit:e.fetchData},model:{value:e.add.visiable,callback:function(t){e.$set(e.add,"visiable",t)},expression:"add.visiable"}}):e._e()],1)},n=[],l=(a("6a8e"),[{title:"序号",dataIndex:"index",width:80,scopedSlots:{customRender:"index"}},{title:"角色名",dataIndex:"roleName",width:120,key:"roleName"},{title:"操作",key:"action",fixed:"right",width:160,scopedSlots:{customRender:"action"}}]),o=[[{type:"input",key:"roleName",label:"角色名称",placeholder:"请输入角色"},{type:"search",name:"查询"},{type:"reset",name:"重置"}],[]],s=a("cc5e"),r=a("5ff1"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-modal",{staticClass:"page-modal",attrs:{afterClose:e.closeDialog,title:e.dialog.title,footer:null,keyboard:!1,maskClosable:!1,width:"700px"},model:{value:e.dialog.visiable,callback:function(t){e.$set(e.dialog,"visiable",t)},expression:"dialog.visiable"}},[a("a-form-model",{ref:"form",attrs:{model:e.formInit,loading:"","label-col":{span:5},"wrapper-col":{span:18}}},[a("a-form-model-item",{attrs:{label:"角色名称",prop:"roleName",rules:e.rules.input}},[a("a-input",{attrs:{disabled:e.isDetail,placeholder:"请输入"},model:{value:e.formInit.roleName,callback:function(t){e.$set(e.formInit,"roleName",t)},expression:"formInit.roleName"}})],1),a("a-form-model-item",{attrs:{label:"权限勾选",prop:"menus"}},[a("a-button",{on:{click:function(t){return e.clickTree()}}},[a("a-icon",{attrs:{type:"plus"}}),e._v("点击勾选 ")],1)],1),e.isDetail?e._e():a("div",{staticClass:"text-center"},[a("a-button",{on:{click:e.closeDialog}},[e._v(" 取消 ")]),a("a-button",{staticClass:"margin-l-20",attrs:{type:"primary",loading:e.button.loading},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1),e.listObj.visiable?a("tree-modal",{attrs:{data:e.listObj.data},on:{confirm:e.confirmTree},model:{value:e.listObj.visiable,callback:function(t){e.$set(e.listObj,"visiable",t)},expression:"listObj.visiable"}}):e._e()],1)],1)},d=[],u=a("5530"),h=(a("a15b"),a("ffcb")),f=a("4fb8"),b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-modal",{staticClass:"page-modal",attrs:{afterClose:e.closeDialog,title:e.dialog.title,footer:null,keyboard:!1,maskClosable:!1,width:"500px"},model:{value:e.dialog.visiable,callback:function(t){e.$set(e.dialog,"visiable",t)},expression:"dialog.visiable"}},[a("br"),a("a-tree",{attrs:{checkable:"","expanded-keys":e.expandedKeys,"auto-expand-parent":e.autoExpandParent,"selected-keys":e.selectedKeys,"tree-data":e.treeData},on:{expand:e.onExpand,select:e.onSelect},model:{value:e.checkedKeys,callback:function(t){e.checkedKeys=t},expression:"checkedKeys"}}),a("div",{staticClass:"text-center"},[a("a-button",{on:{click:e.closeDialog}},[e._v(" 取消 ")]),a("a-button",{staticClass:"margin-l-20",attrs:{type:"primary",loading:e.button.loading},on:{click:e.handleSubmit}},[e._v("确定")])],1)],1)],1)},p=[],m=(a("a434"),a("99af"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("a630"),[{title:"数据分析",key:"Monitor"},{title:"师傅管理",key:"Master"},{title:"徒弟管理",key:"Pupil"},{title:"配对管理",key:"Pair"},{title:"师带徒管理",key:"Train"},{title:"师徒任务",key:"Task"},{title:"系统管理",key:"Base",children:[{title:"用户管理",key:"BaseAccount"},{title:"角色管理",key:"BaseRole"}]}]),y={mixins:[h["a"]],data:function(){return{expandedKeys:[],autoExpandParent:!0,checkedKeys:[],selectedKeys:[],treeData:m}},created:function(){var e="勾选权限";this.$setKeyValue(this.dialog,{title:e,visiable:!0}),this.init()},methods:{init:function(){var e=this.data.obj,t=this.$copy(e),a=[];this.selectParents(this.treeData,t,a);for(var i=function(e){var i=a.some((function(a){return a===t[e]}));i&&(t.splice(e,1),e--),n=e},n=0;n<t.length;n++)i(n);this.checkedKeys=t,console.log(this.checkedKeys,"去掉父级 selectedKeys")},selectParents:function(e,t){for(var a=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=!1,l=function(l){if(n||(n=t.some((function(t){return t===e[l].key}))),e[l].children){var o=a.selectParents(e[l].children,t,i);o&&(n=o,i.push(e[l].key))}},o=0;o<e.length;o++)l(o);return n},selectParentsTwo:function(e,t){for(var a=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=!1,l=function(l){if(n||(n=t.some((function(t){return t===e[l].key}))),e[l].children){var o=a.selectParentsTwo(e[l].children,t,i);o&&(n=o,i.push(e[l].key))}},o=0;o<e.length;o++)l(o);return n},handleSubmit:function(){var e=this.$copy(this.checkedKeys),t=[];this.selectParentsTwo(this.treeData,e,t),e=e.concat(t),e=new Set(e),e=Array.from(e),console.log("选择 key",e),this.$emit("confirm",e),this.closeDialog()},onExpand:function(e){console.log("onExpand",e),this.expandedKeys=e,this.autoExpandParent=!1},onCheck:function(e){console.log("onCheck",e),this.checkedKeys=e},onSelect:function(e,t){console.log("onSelect",t),this.selectedKeys=e}}},v=y,k=a("2877"),g=Object(k["a"])(v,b,p,!1,null,"552a6917",null),x=g.exports,K={mixins:[h["a"],f["a"]],components:{TreeModal:x},data:function(){return{formInit:{id:null,roleName:null,menu:[],menus:[]},listObj:{visiable:!1,data:null}}},computed:{isDetail:function(){var e=this.data.type;return"detail"===e}},created:function(){var e=this.data,t=e.type,a=e.obj,i="edit"===t?"修改":"详情";this.$setKeyValue(this.dialog,{title:i,visiable:!0}),"edit"!==t&&"detail"!==t||this.$setOriginalKV(this.formInit,a)},methods:{confirmTree:function(e){this.formInit.menus=this.$copy(e),this.formInit.menu=this.$copy(e).join(",")},clickTree:function(){this.$setKeyValue(this.listObj,{visiable:!0,data:{type:"tree",obj:this.formInit.menus}})},handleSubmit:function(e){var t=this;e.preventDefault(),this.$refs.form.validate((function(e){if(e){var a=t.data,i=a.type,n=a.obj,l=Object(u["a"])({},t.formInit);"edit"===i&&(l.id=n.id),t.$setKeyValue(t.button,{loading:!0,text:"提交中"}),Object(s["b"])(l).then((function(e){return t.process(e)}))}else t.$message.warning("请完善上面必填信息")}))}}},j=K,w=Object(k["a"])(j,c,d,!1,null,"2b2b7926",null),$=w.exports,D={name:"Role",mixins:[r["a"]],components:{Add:$},data:function(){return{columns:l,searchData:o}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.table.loading){var a=this.pagination,i=a.current,n=a.pageSize;t.pageNum=i,t.pageSize=n,this.table.loading=!0,Object(s["a"])(t).then((function(t){var a=t.code,i=t.data;e.table.loading=!1,0===a&&(e.pagination.total=i.total,e.table.data=i.rows)}))}},clickDetail:function(e){this.$setKeyValue(this.add,{visiable:!0,data:{type:"detail",obj:e}})}}},_=D,O=Object(k["a"])(_,i,n,!1,null,"3ab6ef3f",null);t["default"]=O.exports},cc5e:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return o}));var i=a("b775"),n="/skill/role";function l(e){return Object(i["b"])({url:"".concat(n,"/list"),method:"get",params:e})}function o(e){return Object(i["b"])({url:"".concat(n,"/update"),method:"post",data:e})}}}]);