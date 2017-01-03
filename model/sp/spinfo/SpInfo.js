Ext.define('Admin.model.sp.spinfo.SpInfo', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "corpid"  //
        },
        {
            name : "corpname" //企业名称
        },
        {
        	name : "address" //地址
        },
        {
        	name : "phone" //企业电话
        },
        {
        	name : "fax" //传真号码
        },
        {
        	name : "contacts" //联系人
        },
        {
        	name : "connum" //联系人电话
        },
        {
        	name : "website"  //企业网站
        },
        {
            name : "email" //邮箱
        },
        {
        	name : "catalog" //企业简介
        },
        {
        	name : "qrcode" //企业二维码公众号地址
        },
        {
        	name : "qrimage" //企业二维码公众号地址二维码路径
        }
    ]
});