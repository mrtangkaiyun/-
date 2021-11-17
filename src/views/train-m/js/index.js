export const editColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '文件名称',
        dataIndex: 'a',
        width: 120,
        key: 'a'
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 160,
        scopedSlots: { customRender: 'action' }
    }
]
