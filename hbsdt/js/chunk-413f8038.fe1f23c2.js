(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-413f8038"],{"47f9":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("page-header-wrapper",[a("a-card",{attrs:{bordered:!1}},[a("div",{staticClass:"table-page-search-wrapper"},[a("search-bar",{ref:"searchbar",attrs:{data:t.searchData},on:{search:t.clickSearch,taskStart:function(e){return t.taskStartAndEnd(2)},taskEnd:function(e){return t.taskStartAndEnd(3)}}}),a("a-table",{attrs:{columns:t.columns,dataSource:t.table.data,rowKey:"id",size:t.table.size,loading:t.table.loading,pagination:t.pagination,"row-selection":{type:"radio",selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange},scroll:{x:900}},on:{change:t.handleTabChange},scopedSlots:t._u([{key:"index",fn:function(e,a,n){return[t._v(" "+t._s(n+1)+" ")]}},{key:"action",fn:function(e,n){return a("span",{},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"form"},on:{click:function(e){return t.clickUpdate(n)}}}),a("a-divider",{attrs:{type:"vertical"}}),a("a-button",{attrs:{type:"primary",shape:"circle",icon:"info"},on:{click:function(e){return t.clickDetail(n)}}}),a("a-divider",{attrs:{type:"vertical"}}),a("popconfirm-button",{attrs:{custom:"",data:n},on:{click:t.clickDelete}},[a("a-button",{attrs:{type:"danger",shape:"circle",icon:"delete"}})],1)],1)}}])})],1)]),t.add.visiable?a("add",{attrs:{data:t.add.data},on:{add:t.refresh,edit:t.fetchData},model:{value:t.add.visiable,callback:function(e){t.$set(t.add,"visiable",e)},expression:"add.visiable"}}):t._e()],1)},i=[],s=(a("7db0"),[{title:"序号",dataIndex:"index",width:80,scopedSlots:{customRender:"index"}},{title:"任务名称",dataIndex:"taskName",width:120,key:"taskName"},{title:"任务发布日期",dataIndex:"startTime",width:150,key:"startTime"},{title:"任务截止时间",dataIndex:"endTime",width:150,key:"endTime"},{title:"任务执行人",dataIndex:"taskExecutorName",width:150,key:"taskExecutorName"},{title:"任务状态",dataIndex:"taskStatus",width:90,key:"taskStatus"},{title:"操作",key:"action",fixed:"right",width:180,scopedSlots:{customRender:"action"}}]),o=[[],[{type:"taskStart",name:"任务开始",custom:!0,icon:"clock-circle"},{type:"taskEnd",name:"任务结束",custom:!0,icon:"stop"}]],r=a("7eae"),d=a("5ff1"),c=a("cf2e"),l={name:"Implement",mixins:[d["a"]],components:{Add:c["a"]},data:function(){return{id:null,columns:s,searchData:o,listObj:{visiable:!1,data:null}}},created:function(){this.id=this.$route.query.id,this.fetchData()},methods:{taskStartAndEnd:function(t){var e=this;if(this.selectedRowKeys&&this.selectedRowKeys.length>=1){var a=this.selectedRowKeys[0];this.table.data.find((function(t){return t.id===a}));Object(r["j"])({id:a,state:t}).then((function(t){var a=t.code,n=t.message;0===a&&(e.$message.success(n||"操作成功"),e.conditionPage(),e.fetchData(e.params),e.selectedRowKeys=[])}))}else this.$message.warning("请选择一条数据")},fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.table.loading){var a=this.pagination,n=a.current,i=a.pageSize;e.pageNum=n,e.pageSize=i,e.id=this.id,this.table.loading=!0,Object(r["c"])(e).then((function(e){var a=e.code,n=e.data;t.table.loading=!1,0===a&&(t.pagination.total=n.total,t.table.data=n.rows)}))}},clickDelete:function(t){var e=this;Object(r["d"])({id:t.id}).then((function(t){var a=t.code;0===a&&(e.$message.success("删除成功"),e.conditionPage(),e.fetchData(e.params))}))},clickDetail:function(t){this.$setKeyValue(this.add,{visiable:!0,data:{type:"detail",obj:t}})},clickListRecord:function(t){this.$setKeyValue(this.listObj,{visiable:!0,data:{type:"list",obj:t}})}}},u=l,m=a("2877"),f=Object(m["a"])(u,n,i,!1,null,"5efdec3c",null);e["default"]=f.exports},"7eae":function(t,e,a){"use strict";a.d(e,"k",(function(){return s})),a.d(e,"e",(function(){return o})),a.d(e,"h",(function(){return r})),a.d(e,"i",(function(){return d})),a.d(e,"d",(function(){return c})),a.d(e,"c",(function(){return l})),a.d(e,"j",(function(){return u})),a.d(e,"f",(function(){return m})),a.d(e,"a",(function(){return f})),a.d(e,"g",(function(){return b})),a.d(e,"b",(function(){return p}));var n=a("b775"),i="/skill/apprenticeship/task";function s(t){return Object(n["b"])({url:"".concat(i,"/taskList"),method:"get",params:t})}function o(t){return Object(n["b"])({url:"".concat(i,"/queryInfo?id=").concat(t),method:"get"})}function r(t){return Object(n["b"])({url:"".concat(i,"/add"),method:"post",data:t})}function d(t){return Object(n["b"])({url:"".concat(i,"/update"),method:"post",data:t})}function c(t){return Object(n["b"])({url:"".concat(i,"/deleteById"),method:"get",params:t})}function l(t){return Object(n["b"])({url:"".concat(i,"/list"),method:"get",params:t})}function u(t){return Object(n["b"])({url:"".concat(i,"/updateById"),method:"get",params:t})}function m(t){return Object(n["b"])({url:"".concat(i,"/updateTask"),method:"post",data:t})}function f(t){return Object(n["b"])({url:"".concat(i,"/upload"),method:"post",data:t,headers:{"Content-Type":"multipart/form-data"}})}function b(t){return Object(n["b"])({url:"".concat(i,"/deleteWordName"),method:"get",params:t})}function p(t){return Object(n["b"])({url:"".concat(i,"/download"),method:"post",params:t,responseType:"blob"})}},"982d":function(t,e,a){"use strict";a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return r})),a.d(e,"d",(function(){return d}));var n=a("b775"),i="/skill/relationship";function s(t){return Object(n["b"])({url:"".concat(i,"/list"),method:"get",params:t})}function o(t){return Object(n["b"])({url:"".concat(i,"/deleteById"),method:"get",params:t})}function r(t){return Object(n["b"])({url:"".concat(i,"/add"),method:"post",data:t})}function d(t){return Object(n["b"])({url:"".concat(i,"/updateById"),method:"get",params:t})}},c053:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-modal",{staticClass:"page-modal",attrs:{afterClose:t.closeDialog,title:t.dialog.title,footer:null,keyboard:!1,maskClosable:!1,width:"800px"},model:{value:t.dialog.visiable,callback:function(e){t.$set(t.dialog,"visiable",e)},expression:"dialog.visiable"}},[a("div",[a("a-radio-group",{attrs:{"default-value":t.studentId,"button-style":"solid"},model:{value:t.studentId,callback:function(e){t.studentId=e},expression:"studentId"}},t._l(t.list,(function(e){return a("a-radio-button",{key:e.id,staticStyle:{margin:"15px"},attrs:{value:e.studentId}},[t._v(" "+t._s(e.studentName)+" ")])})),1)],1),a("div",{staticClass:"text-center padding-t-50"},[a("a-button",{on:{click:t.confirm}},[t._v(" 确定 ")])],1)])],1)},i=[],s=(a("7db0"),a("ffcb")),o=a("982d"),r={mixins:[s["a"]],data:function(){return{studentId:null,list:[]}},created:function(){var t=this.data.obj;this.studentId=t?t.studentId:null;var e="任务执行人";this.$setKeyValue(this.dialog,{title:e,visiable:!0}),this.fetchInfo()},methods:{fetchInfo:function(){var t=this,e=this.data.maaId,a={maaId:e,pageSize:2e3,pageNum:1};Object(o["b"])(a).then((function(e){var a=e.code,n=e.data;0===a&&(t.list=n.rows)}))},confirm:function(){var t=this;if(!this.studentId)return this.$message.warning("请选择执行人");var e=this.list.find((function(e){return e.studentId===t.studentId}));this.$emit("confirm",e),this.closeDialog()}}},d=r,c=a("2877"),l=Object(c["a"])(d,n,i,!1,null,"8f6bc1d8",null);e["a"]=l.exports},cf2e:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-modal",{staticClass:"page-modal",attrs:{afterClose:t.closeDialog,title:t.dialog.title,footer:null,keyboard:!1,maskClosable:!1,width:"1000px"},model:{value:t.dialog.visiable,callback:function(e){t.$set(t.dialog,"visiable",e)},expression:"dialog.visiable"}},[a("a-form-model",{ref:"form",attrs:{model:t.formInit,loading:"","wrapper-col":{span:22}}},[a("a-row",[a("a-col",{attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"任务名称",prop:"taskName"}},[a("a-input",{attrs:{placeholder:"请输入"},model:{value:t.formInit.taskName,callback:function(e){t.$set(t.formInit,"taskName",e)},expression:"formInit.taskName"}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-model-item",{attrs:{label:"任务截至日期",prop:"endTime"}},[a("a-date-picker",{model:{value:t.formInit.endTime,callback:function(e){t.$set(t.formInit,"endTime",e)},expression:"formInit.endTime"}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-model-item",{attrs:{label:"发布日期",prop:"startTime"}},[a("a-date-picker",{model:{value:t.formInit.startTime,callback:function(e){t.$set(t.formInit,"startTime",e)},expression:"formInit.startTime"}})],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"发布人",prop:"publisher"}},[a("a-input",{staticStyle:{display:"none"},attrs:{placeholder:"请输入"},model:{value:t.formInit.publisher,callback:function(e){t.$set(t.formInit,"publisher",e)},expression:"formInit.publisher"}}),a("a-input",{attrs:{disabled:"",placeholder:"请输入",value:t.publisherName}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-model-item",{attrs:{label:"任务执行人",prop:"taskExecutor"}},[a("a-input",{staticStyle:{display:"none"},attrs:{placeholder:"请输入"},model:{value:t.formInit.taskExecutor,callback:function(e){t.$set(t.formInit,"taskExecutor",e)},expression:"formInit.taskExecutor"}}),t.formInit.taskExecutor?a("a-radio-group",{attrs:{"button-style":"solid"}},[a("a-radio-button",{staticStyle:{margin:"15px"},attrs:{disabled:"",value:t.formInit.taskExecutor}},[t._v(" "+t._s(t.taskExecutorObj.studentName)+" ")])],1):t._e()],1)],1)],1),a("a-row",[a("a-col",{attrs:{span:15}},[a("a-form-model-item",{attrs:{label:"任务要求",prop:"taskDemand"}},[a("a-textarea",{staticStyle:{width:"98%"},attrs:{placeholder:"请输入文本...",autosize:{maxRows:5,minRows:5}},model:{value:t.formInit.taskDemand,callback:function(e){t.$set(t.formInit,"taskDemand",e)},expression:"formInit.taskDemand"}})],1)],1)],1),t.isEdit||t.isDetail?a("a-row",[a("a-col",{attrs:{span:15}},[a("a-form-model-item",{attrs:{label:"执行反馈说明"}},[a("a-textarea",{staticStyle:{width:"98%"},attrs:{disabled:"",placeholder:"请输入文本...",autosize:{maxRows:5,minRows:5}},model:{value:t.formInitInfo.feedback,callback:function(e){t.$set(t.formInitInfo,"feedback",e)},expression:"formInitInfo.feedback"}})],1)],1)],1):t._e(),t.isEdit||t.isDetail?a("a-row",[a("a-col",{attrs:{span:15}},[a("a-form-model-item",{attrs:{label:"结果资料"}},[a("div",{staticStyle:{width:"98%"}},[a("a-table",{attrs:{columns:t.columns,dataSource:t.table.data,rowKey:"id",loading:t.table.loading},scopedSlots:t._u([{key:"index",fn:function(e,a,n){return[t._v(" "+t._s(n+1)+" ")]}},{key:"action",fn:function(e,n){return a("span",{},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.clickDownLoad(n)}}},[t._v("下载")])])}}],null,!1,620440405)})],1)])],1)],1):t._e(),t.isDetail?t._e():a("div",{staticClass:"text-center"},[a("a-button",{on:{click:t.closeDialog}},[t._v(" 取消 ")]),a("a-button",{staticClass:"margin-l-20",attrs:{type:"primary",loading:t.button.loading},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1),t.listObj.visiable?a("list-modal",{attrs:{data:t.listObj.data},on:{confirm:t.confirmSelected},model:{value:t.listObj.visiable,callback:function(e){t.$set(t.listObj,"visiable",e)},expression:"listObj.visiable"}}):t._e()],1)],1)},i=[],s=a("5530"),o=(a("d81d"),a("b0c0"),a("c1df")),r=a.n(o),d=a("ffcb"),c=a("4fb8"),l=a("5ff1"),u=a("7eae"),m=[{title:"序号",dataIndex:"idx",width:80,key:"idx"},{title:"文件名称",dataIndex:"name",width:200,key:"name"},{title:"操作",key:"action",fixed:"right",width:160,scopedSlots:{customRender:"action"}}],f=a("ca00"),b=a("6a8e"),p=a("c053"),h={mixins:[d["a"],c["a"],l["a"]],components:{ListModal:p["a"]},data:function(){return{taskExecutorObj:{},publisherName:null,formInit:{taskName:null,endTime:null,publisher:null,startTime:null,taskExecutor:null,taskDemand:null},formInitInfo:{},columns:m,issuerOptions:b["e"],listObj:{visiable:!1,data:null}}},computed:{isDetail:function(){var t=this.data.type;return"detail"===t},isEdit:function(){var t=this.data.type;return"edit"===t}},created:function(){var t=this.data,e=t.type,a=t.obj,n="add"===e?"任务发布":"edit"===e?"任务编辑":"任务详情";this.$setKeyValue(this.dialog,{title:n,visiable:!0}),"edit"===e||"detail"===e?this.fetchInfo():a&&(this.publisherName=a.masterName,this.formInit.publisher=a.masterId,this.taskExecutorObj={studentName:a.studentName,studentId:a.studentId},this.formInit.taskExecutor=a.studentId)},methods:{fetchInfo:function(){var t=this,e=this.data.obj;Object(u["e"])(e.id).then((function(a){var n=a.code,i=a.data;0===n&&(t.table.data=i.wordNames?i.wordNames.map((function(t,e){return{idx:e+1,name:t}})):[],t.taskExecutorObj={studentName:i.taskExecutorName||e.studentName,studentId:i.taskExecutor||e.studentId},i.taskExecutor||(i.taskExecutor=e.studentId),t.originalData=t.$copy(i),t.formInitInfo=t.$copy(i),t.$setOriginalKV(t.formInit,i))}))},clickListModal:function(){var t=this.data.obj,e=t?t.masterId:null,a=null;this.formInit.taskExecutor&&(a=this.$copy(this.taskExecutorObj)),this.$setKeyValue(this.listObj,{visiable:!0,data:{type:"select",maaId:e,obj:a}})},confirmSelected:function(t){this.taskExecutorObj=t,this.formInit.taskExecutor=t.studentId},clickDownLoad:function(t){var e=this.data.obj;Object(u["b"])({id:e.id,row:t.idx}).then((function(e){if(e){var a=t.name;Object(f["a"])(e,a).then((function(){}))}}))},handleSubmit:function(t){var e=this;t.preventDefault(),this.$refs.form.validate((function(t){if(t){var a=e.data,n=a.type,i=a.obj,o=Object(s["a"])({},e.formInit);if("edit"===n&&e.$compareObjValue(e.originalData,o))return void e.$message.warning("数据没有任何修改");o.startTime=r()(o.startTime).format("YYYY-MM-DD"),o.endTime=r()(o.endTime).format("YYYY-MM-DD"),e.$setKeyValue(e.button,{loading:!0,text:"提交中"}),"edit"===n?(o.id=i.id,Object(u["i"])(o).then((function(t){return e.process(t)}))):(o.rspId=i.id,Object(u["h"])(o).then((function(t){return e.process(t)})))}else e.$message.warning("请完善上面必填信息")}))}}},k=h,v=a("2877"),I=Object(v["a"])(k,n,i,!1,null,"682d5d91",null);e["a"]=I.exports}}]);