export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '任务名称',
        dataIndex: 'taskName',
        width: 120,
        key: 'taskName'
    },
    {
        title: '任务发布日期',
        dataIndex: 'startTime',
        width: 150,
        key: 'startTime'
    },
    {
        title: '任务截止时间',
        dataIndex: 'endTime',
        width: 150,
        key: 'endTime'
    },
    {
        title: '任务执行人',
        dataIndex: 'taskExecutorName',
        width: 150,
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
        width: 180,
        scopedSlots: { customRender: 'action' }
    }
]

export const searchData = [
    [

    ],
    [
        { type: 'taskStart', name: '任务开始', custom: true, icon: 'clock-circle' },
        { type: 'taskEnd', name: '任务结束', custom: true, icon: 'stop' }
    ]
]
