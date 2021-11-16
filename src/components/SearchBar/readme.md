## 搜索栏

#### 用法一
```
export const search = [
  [
    { type: 'input', key: 'name', placeholder: '请输入账号名称' },
    { type: 'select', key: 'shopId', placeholder: '请选择所属门店', options: [{ label: '深圳', value: 1 }, { label: '惠州', value: 2 }] },
    { type: 'date', key: 'date', placeholder: '请选择日期' },
    { type: 'range', key: 'beginTime-endTime', placeholder: ['请选择起始时间', '请选择结束时间'] },
    { type: 'search', name: '查询' },
    { type: 'reset', name: '重置' }
  ], [
    { type: 'add', name: '添加' }
  ]
]
```

#### 用法二
```
export const search = [
  [
    { type: 'input', key: 'name', placeholder: '请输入账号名称' },
    { type: 'select', key: 'shopId', placeholder: '请选择所属门店', options: [] },
    { type: 'date', key: 'date', placeholder: '请选择日期' },
    { type: 'range', key: 'beginTime-endTime', placeholder: ['请选择起始时间', '请选择结束时间'] },
    { type: 'search', name: '查询' },
    { type: 'reset', name: '重置' }
  ], [
    { type: 'add', name: '添加' }
  ]
]

this.assignOptions (search, key, list) { // 给下拉框的 options 赋值
```
