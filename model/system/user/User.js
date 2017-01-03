/**
 * 用户数据模型
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.model.system.user.User', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "account"  //账号
        },
        {
            name : "username" //用户名
        },
        {
        	name : "status" //状态
        },
        {
        	name : "user_type" //用户类型
        },
        {
        	name : "schoolid" //待用
        },
        {
        	name : "create_time" //创建时间
        },
        {
        	name : "login_count" //登录次数
        },
        {
        	name : "roleid"  //角色id
        },
        {
            name : "rolename" //角色名称
        },
        {
        	name : "schoolname" //学校名称
        }
    ]
});