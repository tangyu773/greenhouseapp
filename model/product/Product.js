Ext.define('Admin.model.product.Product', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "productcode"  //商品条码
        },
        {
            name : "prodname" //产品名称
        },
        {
        	name : "saleprice" //建议零售价
        },
        {
        	name : "productinnercode" //产品内码
        },
        {
        	name : "cascade1" //包装比例1级
        },
        {
        	name : "cascade2" //包装比例2级
        },
        {
        	name : "cascade3" //包装比例3级
        },
        {
        	name : "packagespec"  //包装内容
        },
        {
            name : "comment" //标注
        },
        {
        	name : "corpid" //生产企业
        },
        {
            name : "instruse" //使用说明
        },
        {
        	name : "staffid" //操作员
        },
        {
            name : "createtime" //建立时间
        },
        {
        	name : "approval" //批文
        },
        {
            name : "subtypeno" //产品分类
        },
        {
        	name : "cls1" //大类
        },
        {
            name : "cls2" //小类
        },
        {
        	name : "dosageform" //剂型
        },
        {
            name : "usetype" //服用类型
        },
        {
        	name : "timesday" //每日服用次数
        },
        {
            name : "dose" //剂量
        },
        {
        	name : "storage" //保存方式
        },
        {
            name : "ingredients" //成分
        },
        {
        	name : "functions" //产治功能
        },
        {
            name : "reactions" //不良反应
        },
        {
        	name : "contraindication" //禁忌
        },
        {
            name : "interaction" //药物相互作用
        },
        {
        	name : "verifyflag" //是否支持有奖举报
        },
        {
        	name : "stateid" //审核状态
        },
        {
        	name : "reactions_limit" //不良反应显示控制
        },
        {
        	name : "contraindication_limit" //禁忌显示控制
        },
        {
        	name : "interaction_limit" //药物相互作用显示控制
        }
    ]
});