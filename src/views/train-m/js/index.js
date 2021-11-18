export const editColumns = [
    {
        title: '序号',
        dataIndex: 'idx',
        width: 80,
        key: 'idx'
    },
    {
        title: '文件名称',
        dataIndex: 'name',
        width: 200,
        key: 'name'
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 160,
        scopedSlots: { customRender: 'action' }
    }
]
