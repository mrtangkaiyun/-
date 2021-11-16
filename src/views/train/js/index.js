export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '师傅名称',
        dataIndex: 'commodityName',
        width: 120,
        key: 'commodityName'
    },
    {
        title: '徒弟名称',
        dataIndex: 'a',
        width: 100,
        key: 'a'
    },
    {
        title: '师徒状态',
        dataIndex: 'currentPrice',
        width: 100,
        key: 'currentPrice'
    },
    {
        title: '师徒配对日期',
        dataIndex: 'originalPrice',
        width: 100,
        key: 'originalPrice'
    },
    {
        title: '任务个数',
        dataIndex: 'rr',
        width: 90,
        key: 'rr',
        scopedSlots: { customRender: 'rr' }
    }
    // ,
    // {
    //     title: '操作',
    //     key: 'action',
    //     fixed: 'right',
    //     width: 240,
    //     scopedSlots: { customRender: 'action' }
    // }
]

export const searchData = [
    [
        { type: 'input', key: 'commodityName', label: '师傅姓名', placeholder: '请输入姓名' },
        { type: 'input', key: 'commodityName', label: '徒弟姓名', placeholder: '请输入姓名' },
        { type: 'select', key: 'status', label: '师徒状态', placeholder: '请选择', options: [{ label: '是', value: 'Y' }, { label: '否', value: 'N' }] },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [
        { type: 'graduation', name: '已出师', custom: true, icon: 'user' },
        { type: 'task', name: '任务发布', custom: true, icon: 'solution' }
    ]
]

export const listColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '姓名',
        dataIndex: 'a',
        width: 80,
        key: 'a'
    },
    {
        title: '所属单位',
        dataIndex: 'b',
        width: 120,
        key: 'b'
    },
    {
        title: '学历',
        dataIndex: 'c',
        width: 80,
        key: 'c'
    },
    {
        title: '配对日期',
        dataIndex: 'c',
        width: 80,
        key: 'c'
    },
    {
        title: '师徒状态',
        dataIndex: 'c',
        width: 80,
        key: 'c'
    }
]
