Ext.define('Admin.model.sp.dept.Department', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "departid"  //
        },
        {
            name : "departname" //部门名称
        },
        {
        	name : "telno" //联系电话
        },
        {
        	name : "contacts" //联系人
        },
        {
        	name : "parentid" //上级部门
        },
        {
        	name : "corpid" //
        }
    ]
});