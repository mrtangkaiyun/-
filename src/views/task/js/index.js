export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '师傅姓名',
        dataIndex: 'publisherName',
        width: 120,
        key: 'publisherName'
    },
    {
        title: '任务名称',
        dataIndex: 'taskName',
        width: 100,
        key: 'taskName'
    },
    {
        title: '任务发布日期',
        dataIndex: 'startTime',
        width: 150,
        key: 'startTime'
    },
    {
        title: '任务截止日期',
        dataIndex: 'endTime',
        width: 150,
        key: 'endTime'
    },
    {
        title: '任务执行人',
        dataIndex: 'taskExecutorName',
        width: 100,
        key: 'taskExecutorName'
    },
    {
        title: '任务状态',
        dataIndex: 'taskStatus',
        width: 90,
        key: 'taskStatus'
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 160,
        scopedSlots: { customRender: 'action' }
    }
]

export const searchData = [
    [
        { type: 'input', key: 'taskName', label: '任务名称', placeholder: '请输入' },
        { type: 'select', key: 'taskStatusVo', label: '任务状态', placeholder: '请选择', options: [{ label: '未开始', value: '1' }, { label: '已开始', value: '2' }, { label: '已结束', value: '3' }] },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [ ]
]

export const editColumns = [
    {
        title: '序号',
        dataIndex: 'idx',
        width: 80,
        scopedSlots: { customRender: 'idx' }
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
