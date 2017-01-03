/**
 * 用户管理数据模型
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.model.system.auth.Role', {
    extend: "Ext.data.Model",
    fields: [{
            name : "roleid"	 //角色id
        },
        {
            name : "rolename" //角色名字
        },
        {
            name : "status" //状态
        },
        {
            name : "relateid" //关联id
        },
        {
        	name : 'role_type' //角色类型
        }
    ]
});