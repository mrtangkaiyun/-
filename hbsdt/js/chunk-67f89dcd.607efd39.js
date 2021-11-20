(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67f89dcd"],{"3a96":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("page-header-wrapper",[a("a-card",{attrs:{bordered:!1}},[a("div",{staticClass:"table-page-search-wrapper"},[a("search-bar",{ref:"searchbar",attrs:{data:t.searchData},on:{search:t.clickSearch,graduation:t.graduation,task:t.task}}),a("a-table",{attrs:{columns:t.columns,dataSource:t.table.data,rowKey:"id",size:t.table.size,loading:t.table.loading,pagination:t.pagination,"row-selection":{type:"radio",selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange},scroll:{x:900}},on:{change:t.handleTabChange},scopedSlots:t._u([{key:"index",fn:function(e,a,i){return[t._v(" "+t._s(i+1)+" ")]}},{key:"action",fn:function(e,i){return[a("a-button",{attrs:{type:"primary",size:"small",shape:"circle",icon:"menu"},on:{click:function(e){return t.clickListRecord(i)}}})]}}])})],1)]),t.add.visiable?a("add",{attrs:{data:t.add.data},on:{add:t.refresh,edit:t.fetchData},model:{value:t.add.visiable,callback:function(e){t.$set(t.add,"visiable",e)},expression:"add.visiable"}}):t._e(),t.listObj.visiable?a("list-modal",{attrs:{data:t.listObj.data},on:{add:t.refresh,edit:t.fetchData},model:{value:t.listObj.visiable,callback:function(e){t.$set(t.listObj,"visiable",e)},expression:"listObj.visiable"}}):t._e()],1)},n=[],s=a("5530"),o=(a("7db0"),[{title:"序号",dataIndex:"index",width:80,scopedSlots:{customRender:"index"}},{title:"师傅名称",dataIndex:"masterName",width:120,key:"masterName"},{title:"徒弟名称",dataIndex:"studentName",width:100,key:"studentName"},{title:"师徒状态",dataIndex:"isGraduation",width:100,key:"isGraduation"},{title:"师徒匹配日期",dataIndex:"foundTime",width:100,key:"foundTime"},{title:"任务个数",dataIndex:"action",width:90,key:"action",scopedSlots:{customRender:"action"}}]),r=[[{type:"input",key:"masterName",label:"师傅姓名",placeholder:"请输入姓名"},{type:"input",key:"studentName",label:"徒弟姓名",placeholder:"请输入姓名"},{type:"select",key:"isGraduationVo",label:"师徒状态",placeholder:"请选择",options:[{label:"已出师",value:"1"},{label:"未出师",value:"2"}]},{type:"search",name:"查询"},{type:"reset",name:"重置"}],[{type:"graduation",name:"已出师",custom:!0,icon:"user"},{type:"task",name:"任务发布",custom:!0,icon:"solution"}]],l=a("982d"),d=a("5ff1"),c=a("c053"),u=a("cf2e"),m=a("5880"),f={name:"Master",mixins:[d["a"]],components:{Add:u["a"],ListModal:c["a"]},data:function(){return{columns:o,searchData:r,listObj:{visiable:!1,data:null}}},computed:Object(s["a"])({},Object(m["mapGetters"])(["userInfo"])),created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.table.loading){var a=this.pagination,i=a.current,n=a.pageSize;e.pageNum=i,e.pageSize=n,e.maaId=this.userInfo.maaId,this.table.loading=!0,Object(l["b"])(e).then((function(e){var a=e.code,i=e.data;t.table.loading=!1,0===a&&(t.pagination.total=i.total,t.table.data=i.rows)}))}},graduation:function(){var t=this;if(this.selectedRowKeys&&this.selectedRowKeys.length>=1){var e=this.selectedRowKeys[0];Object(l["d"])({id:e}).then((function(e){var a=e.code,i=e.message;0===a&&(t.$message.success(i||"操作成功"),t.conditionPage(),t.fetchData(t.params),t.selectedRowKeys=[])}))}else this.$message.warning("请选择一条数据")},task:function(){if(this.selectedRowKeys&&1===this.selectedRowKeys.length){var t=this.selectedRowKeys[0],e=this.table.data.find((function(e){return e.id===t}));this.$setKeyValue(this.add,{visiable:!0,data:{type:"add",obj:e}})}else this.$message.warning("请选择一条数据")},clickListRecord:function(t){this.$router.push({path:"/implement",query:{id:t.studentId}})}}},b=f,p=a("2877"),h=Object(p["a"])(b,i,n,!1,null,"3ce9db84",null);e["default"]=h.exports},"7eae":function(t,e,a){"use strict";a.d(e,"j",(function(){return s})),a.d(e,"d",(function(){return o})),a.d(e,"g",(function(){return r})),a.d(e,"h",(function(){return l})),a.d(e,"c",(function(){return d})),a.d(e,"i",(function(){return c})),a.d(e,"e",(function(){return u})),a.d(e,"a",(function(){return m})),a.d(e,"f",(function(){return f})),a.d(e,"b",(function(){return b}));var i=a("b775"),n="/skill/apprenticeship/task";function s(t){return Object(i["b"])({url:"".concat(n,"/taskList"),method:"get",params:t})}function o(t){return Object(i["b"])({url:"".concat(n,"/queryInfo?id=").concat(t),method:"get"})}function r(t){return Object(i["b"])({url:"".concat(n,"/add"),method:"post",data:t})}function l(t){return Object(i["b"])({url:"".concat(n,"/update"),method:"post",data:t})}function d(t){return Object(i["b"])({url:"".concat(n,"/deleteById"),method:"get",params:t})}function c(t){return Object(i["b"])({url:"".concat(n,"/updateById"),method:"get",params:t})}function u(t){return Object(i["b"])({url:"".concat(n,"/updateTask"),method:"post",params:t})}function m(t){return Object(i["b"])({url:"".concat(n,"/upload"),method:"post",data:t,headers:{"Content-Type":"multipart/form-data"}})}function f(t){return Object(i["b"])({url:"".concat(n,"/deleteWordName"),method:"get",params:t})}function b(t){return Object(i["b"])({url:"".concat(n,"/download"),method:"post",params:t,responseType:"blob"})}},"982d":function(t,e,a){"use strict";a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return r})),a.d(e,"d",(function(){return l}));var i=a("b775"),n="/skill/relationship";function s(t){return Object(i["b"])({url:"".concat(n,"/list"),method:"get",params:t})}function o(t){return Object(i["b"])({url:"".concat(n,"/deleteById"),method:"get",params:t})}function r(t){return Object(i["b"])({url:"".concat(n,"/add"),method:"post",data:t})}function l(t){return Object(i["b"])({url:"".concat(n,"/updateById"),method:"get",params:t})}},c053:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-modal",{staticClass:"page-modal",attrs:{afterClose:t.closeDialog,title:t.dialog.title,footer:null,keyboard:!1,maskClosable:!1,width:"800px"},model:{value:t.dialog.visiable,callback:function(e){t.$set(t.dialog,"visiable",e)},expression:"dialog.visiable"}},[a("div",[a("a-radio-group",{attrs:{"default-value":t.studentId,"button-style":"solid"},model:{value:t.studentId,callback:function(e){t.studentId=e},expression:"studentId"}},t._l(t.list,(function(e){return a("a-radio-button",{key:e.id,staticStyle:{margin:"15px"},attrs:{value:e.studentId}},[t._v(" "+t._s(e.studentName)+" ")])})),1)],1),a("div",{staticClass:"text-center padding-t-50"},[a("a-button",{on:{click:t.confirm}},[t._v(" 确定 ")])],1)])],1)},n=[],s=(a("7db0"),a("ffcb")),o=a("982d"),r={mixins:[s["a"]],data:function(){return{studentId:null,list:[]}},created:function(){var t=this.data.obj;this.studentId=t?t.studentId:null;var e="任务执行人";this.$setKeyValue(this.dialog,{title:e,visiable:!0}),this.fetchInfo()},methods:{fetchInfo:function(){var t=this,e=this.data.maaId,a={maaId:e,pageSize:2e3,pageNum:1};Object(o["b"])(a).then((function(e){var a=e.code,i=e.data;0===a&&(t.list=i.rows)}))},confirm:function(){var t=this;if(!this.studentId)return this.$message.warning("请选择执行人");var e=this.list.find((function(e){return e.studentId===t.studentId}));this.$emit("confirm",e),this.closeDialog()}}},l=r,d=a("2877"),c=Object(d["a"])(l,i,n,!1,null,"8f6bc1d8",null);e["a"]=c.exports},cf2e:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-modal",{staticClass:"page-modal",attrs:{afterClose:t.closeDialog,title:t.dialog.title,footer:null,keyboard:!1,maskClosable:!1,width:"1000px"},model:{value:t.dialog.visiable,callback:function(e){t.$set(t.dialog,"visiable",e)},expression:"dialog.visiable"}},[a("a-form-model",{ref:"form",attrs:{model:t.formInit,loading:"","wrapper-col":{span:22}}},[a("a-row",[a("a-col",{attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"任务名称",prop:"taskName"}},[a("a-input",{attrs:{placeholder:"请输入"},model:{value:t.formInit.taskName,callback:function(e){t.$set(t.formInit,"taskName",e)},expression:"formInit.taskName"}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-model-item",{attrs:{label:"任务截至日期",prop:"endTime"}},[a("a-date-picker",{model:{value:t.formInit.endTime,callback:function(e){t.$set(t.formInit,"endTime",e)},expression:"formInit.endTime"}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-model-item",{attrs:{label:"发布日期",prop:"startTime"}},[a("a-date-picker",{model:{value:t.formInit.startTime,callback:function(e){t.$set(t.formInit,"startTime",e)},expression:"formInit.startTime"}})],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"发布人",prop:"publisher"}},[a("a-input",{staticStyle:{display:"none"},attrs:{placeholder:"请输入"},model:{value:t.formInit.publisher,callback:function(e){t.$set(t.formInit,"publisher",e)},expression:"formInit.publisher"}}),a("a-input",{attrs:{disabled:"",placeholder:"请输入",value:t.publisherName}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-model-item",{attrs:{label:"任务执行人",prop:"taskExecutor"}},[a("a-input",{staticStyle:{display:"none"},attrs:{placeholder:"请输入"},model:{value:t.formInit.taskExecutor,callback:function(e){t.$set(t.formInit,"taskExecutor",e)},expression:"formInit.taskExecutor"}}),t.formInit.taskExecutor?a("a-radio-group",{attrs:{"button-style":"solid"}},[a("a-radio-button",{staticStyle:{margin:"15px"},attrs:{disabled:"",value:t.formInit.taskExecutor}},[t._v(" "+t._s(t.taskExecutorObj.studentName)+" ")])],1):t._e(),t.isDetail||t.isEdit?t._e():a("a-button",{on:{click:function(e){return t.clickListModal()}}},[a("a-icon",{attrs:{type:"plus"}}),t._v("点击选择 ")],1)],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:15}},[a("a-form-model-item",{attrs:{label:"任务要求",prop:"taskDemand"}},[a("a-textarea",{staticStyle:{width:"98%"},attrs:{placeholder:"请输入文本...",autosize:{maxRows:5,minRows:5}},model:{value:t.formInit.taskDemand,callback:function(e){t.$set(t.formInit,"taskDemand",e)},expression:"formInit.taskDemand"}})],1)],1)],1),t.isEdit||t.isDetail?a("a-row",[a("a-col",{attrs:{span:15}},[a("a-form-model-item",{attrs:{label:"执行反馈说明"}},[a("a-textarea",{staticStyle:{width:"98%"},attrs:{disabled:"",placeholder:"请输入文本...",autosize:{maxRows:5,minRows:5}},model:{value:t.formInitInfo.feedback,callback:function(e){t.$set(t.formInitInfo,"feedback",e)},expression:"formInitInfo.feedback"}})],1)],1)],1):t._e(),t.isEdit||t.isDetail?a("a-row",[a("a-col",{attrs:{span:15}},[a("a-form-model-item",{attrs:{label:"结果资料"}},[a("div",{staticStyle:{width:"98%"}},[a("a-table",{attrs:{columns:t.columns,dataSource:t.table.data,rowKey:"id",loading:t.table.loading},scopedSlots:t._u([{key:"index",fn:function(e,a,i){return[t._v(" "+t._s(i+1)+" ")]}},{key:"action",fn:function(e,i){return a("span",{},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.clickDownLoad(i)}}},[t._v("下载")])])}}],null,!1,620440405)})],1)])],1)],1):t._e(),t.isDetail?t._e():a("div",{staticClass:"text-center"},[a("a-button",{on:{click:t.closeDialog}},[t._v(" 取消 ")]),a("a-button",{staticClass:"margin-l-20",attrs:{type:"primary",loading:t.button.loading},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1),t.listObj.visiable?a("list-modal",{attrs:{data:t.listObj.data},on:{confirm:t.confirmSelected},model:{value:t.listObj.visiable,callback:function(e){t.$set(t.listObj,"visiable",e)},expression:"listObj.visiable"}}):t._e()],1)],1)},n=[],s=a("5530"),o=(a("d81d"),a("c1df")),r=a.n(o),l=a("ffcb"),d=a("4fb8"),c=a("5ff1"),u=a("7eae"),m=[{title:"序号",dataIndex:"idx",width:80,key:"idx"},{title:"文件名称",dataIndex:"name",width:200,key:"name"},{title:"操作",key:"action",fixed:"right",width:160,scopedSlots:{customRender:"action"}}],f=a("ca00"),b=a("6a8e"),p=a("c053"),h={mixins:[l["a"],d["a"],c["a"]],components:{ListModal:p["a"]},data:function(){return{taskExecutorObj:{},publisherName:null,formInit:{taskName:null,endTime:null,publisher:null,startTime:null,taskExecutor:null,taskDemand:null},formInitInfo:{},columns:m,issuerOptions:b["e"],listObj:{visiable:!1,data:null}}},computed:{isDetail:function(){var t=this.data.type;return"detail"===t},isEdit:function(){var t=this.data.type;return"edit"===t}},created:function(){var t=this.data,e=t.type,a=t.obj,i="add"===e?"任务发布":"edit"===e?"任务编辑":"任务详情";this.$setKeyValue(this.dialog,{title:i,visiable:!0}),"edit"===e||"detail"===e?this.fetchInfo():a&&(this.publisherName=a.masterName,this.formInit.publisher=a.masterId)},methods:{fetchInfo:function(){var t=this,e=this.data.obj;Object(u["d"])(e.id).then((function(a){var i=a.code,n=a.data;0===i&&(t.table.data=n.wordNames?n.wordNames.map((function(t,e){return{idx:e+1,name:t}})):[],t.taskExecutorObj={studentName:n.taskExecutorName||e.studentName,studentId:n.taskExecutor||e.studentId},n.taskExecutor||(n.taskExecutor=e.studentId),t.originalData=t.$copy(n),t.formInitInfo=t.$copy(n),t.$setOriginalKV(t.formInit,n))}))},clickListModal:function(){var t=this.data.obj,e=t?t.masterId:null,a=null;this.formInit.taskExecutor&&(a=this.$copy(this.taskExecutorObj)),this.$setKeyValue(this.listObj,{visiable:!0,data:{type:"select",maaId:e,obj:a}})},confirmSelected:function(t){this.taskExecutorObj=t,this.formInit.taskExecutor=t.studentId},clickDownLoad:function(t){var e=this.data.obj;Object(u["b"])({id:e.id,row:t.idx}).then((function(t){if(t){var e="结果资料";Object(f["a"])(t,e).then((function(){}))}}))},handleSubmit:function(t){var e=this;t.preventDefault(),this.$refs.form.validate((function(t){if(t){var a=e.data,i=a.type,n=a.obj,o=Object(s["a"])({},e.formInit);if("edit"===i&&e.$compareObjValue(e.originalData,o))return void e.$message.warning("数据没有任何修改");o.startTime=r()(o.startTime).format("YYYY-MM-DD"),o.endTime=r()(o.endTime).format("YYYY-MM-DD"),e.$setKeyValue(e.button,{loading:!0,text:"提交中"}),"edit"===i?(o.id=n.id,Object(u["h"])(o).then((function(t){return e.process(t)}))):(o.rspId=n.id,Object(u["g"])(o).then((function(t){return e.process(t)})))}else e.$message.warning("请完善上面必填信息")}))}}},v=h,k=a("2877"),g=Object(k["a"])(v,i,n,!1,null,"4042dcc4",null);e["a"]=g.exports}}]);