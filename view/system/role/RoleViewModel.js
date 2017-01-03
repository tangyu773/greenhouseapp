/**
 * 设置数据模型
 */
Ext.define('Admin.view.system.role.RoleViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.system_role_Role',

    stores: {
       roleGrid: {
            type: 'system_role_Role'
        },
       moduleGrid: {
         type: 'system_module_Module'
       }
    }
});
