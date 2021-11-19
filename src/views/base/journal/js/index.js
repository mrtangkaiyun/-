export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '用户名',
        dataIndex: 'name',
        width: 120,
        key: 'name'
    },
    {
        title: '功能模块',
        dataIndex: 'function',
        width: 160,
        key: 'function'
    },
    {
        title: '行为',
        dataIndex: 'action',
        width: 100,
        key: 'action'
    },
    {
        title: '结果',
        dataIndex: 'result',
        width: 100,
        key: 'result'
    },
    {
        title: '操作时间',
        dataIndex: 'time',
        width: 160,
        key: 'time'
    }
]

export const searchData = [
    [
        { type: 'input', key: 'number', label: '用户编号(账号)', placeholder: '请输入' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ]
]
