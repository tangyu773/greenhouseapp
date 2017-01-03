Ext.define('Admin.model.agency.Agency', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "agencyid"  //
        },
        {
            name : "agencyname" //经销商名称
        },
        {
        	name : "agencyaddress" //地址
        },
        {
        	name : "phone" //联系电话
        },
        {
        	name : "fax" //传真号码
        },
        {
        	name : "contacts" //责任人
        },
        {
        	name : "connum" //责任人电话
        },
        {
        	name : "website"  //公司网址
        },
        {
            name : "email" //邮箱
        },
        {
        	name : "corpid" //所属公司
        }
    ]
});