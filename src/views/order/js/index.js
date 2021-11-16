export const columns = [
    {
        title: '订单号',
        dataIndex: 'orderNumber',
        width: 160,
        key: 'orderNumber'
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 120,
        key: 'commodityName',
        scopedSlots: { customRender: 'goodsName' }
    },
    {
        title: '商品图片',
        dataIndex: 'masterImg',
        width: 100,
        key: 'masterImg',
        scopedSlots: { customRender: 'goodsImgUrl' }
    },
    {
        title: '商品规格',
        dataIndex: 'goodsTypeName',
        width: 100,
        key: 'goodsTypeName',
        scopedSlots: { customRender: 'goodsTypeName' }
    },
    {
        title: '商品尺寸',
        dataIndex: 'goodsSizeName',
        width: 100,
        key: 'goodsSizeName',
        scopedSlots: { customRender: 'goodsSizeName' }
    },
    {
        title: '商品数量',
        dataIndex: 'number',
        width: 100,
        key: 'number',
        scopedSlots: { customRender: 'number' }
    },
    {
        title: '实付金额',
        dataIndex: 'amountPaid',
        width: 100,
        key: 'amountPaid'
    },
    {
        title: '订单总金额',
        dataIndex: 'totalMoney',
        width: 100,
        key: 'totalMoney'
    },
    {
        title: '支付状态',
        dataIndex: 'success',
        width: 100,
        key: 'success',
        scopedSlots: { customRender: 'success' }
    }
    // {
    //     title: '操作',
    //     key: 'action',
    //     fixed: 'right',
    //     width: 140,
    //     scopedSlots: { customRender: 'action' }
    // }
]

export const searchData = [
    [
        { type: 'input', key: 'orderNumber', label: '订单号', placeholder: '输入订单号查询' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [ ]
]
