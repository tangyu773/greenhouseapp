Ext.define('Admin.model.report.verify.Verify', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "code_lv1"  //身份码1级
        },
        {
            name : "code_lv2" //
        },
        {
        	name : "code_lv3" //
        },
        {
        	name : "verifycode" //验证码
        },
        {
        	name : "corpid" //
        },
        {
        	name : "productcode" //商品条码
        },
        {
        	name : "batchno" //关联生产批次id
        },
        {
        	name : "corporderid"  //出货订单号
        },
        {
            name : "sale_region_code" //销售区域
        },
        {
        	name : "querytimes" //查询总次数
        },
        {
        	name : "lastquerytime" //最后查询时间
        },
        {
        	name : "usr_region_code" //用户所在区域
        }
    ]
});