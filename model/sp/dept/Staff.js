Ext.define('Admin.model.sp.dept.Staff', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "staffid"  //账号
        },
        {
            name : "staffname" //用户名
        },
        {
        	name : "pwd" //密码
        },
        {
        	name : "departid" //所属部门
        },
        {
        	name : "postname" //职务
        },
        {
        	name : "phone" //电话
        },
        {
        	name : "email" //邮箱
        },
        {
        	name : "useflag"  //状态
        },
        {
            name : "p_staff_id" //
        }
    ]
});