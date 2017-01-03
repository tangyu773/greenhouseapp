/**
 * 设置数据模型
 */
Ext.define('Admin.view.system.user.UserViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.system_user_User',

    stores: {
        UserGrid: {
            type: 'system_user_User'
        },
        RoleGrid: {
        	type: 'system_auth_Role'
        },
        // fileGrid: {
        //     type: 'UserTree'
        // },
        bureaumod: {
            type: 'system_user_User'
        }



    },
});
