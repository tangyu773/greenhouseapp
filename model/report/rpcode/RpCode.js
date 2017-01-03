Ext.define('Admin.model.report.rpcode.RpCode', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "reqid"  //
        },
        {
            name : "corpid" //
        },
        {
        	name : "productcode" //商品条码
        },
        {
        	name : "staffid" //
        },
        {
        	name : "lv1_num" //身份码一级数量
        },
        {
        	name : "lv2_num" //
        },
        {
        	name : "lv3_num" //
        },
        {
        	name : "lv1_actnum"  //身份码一级激活数
        },
        {
            name : "lv2_actnum" //
        },
        {
        	name : "lv3_actnum" //
        },
        {
        	name : "lv1_filepath" //身份码一级路径
        },
        {
        	name : "lv2_filepath" //
        },
        {
        	name : "lv3_filepath" //
        },
        {
        	name : "type" //类型
        },
        {
        	name : "reqdate" //操作日期
        },
        {
        	name : "desc" //备注
        }
    ]
});