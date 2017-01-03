/**
 * 模块管理视图
 * Created by xiaozou on 15-10-22.
 */
Ext.define('Admin.view.system.role.Role', {
    extend : 'Ext.container.Container',
    xtype : 'system_role_Role',
    title : '权限管理',
    requires: [
            'Admin.view.system.role.RoleLeft',
            'Admin.view.system.role.RoleRight',
            'Admin.view.system.role.RoleController',
            'Admin.view.system.role.RoleViewModel',
            'Admin.store.system.role.Role',
            'Admin.view.system.role.RoleAdd',
            'Admin.view.system.role.RoleEdit',
            'Admin.store.system.module.Module'
    ],
    cls: 'shadow-panel',
    controller : 'system_role_Role',
    
    viewModel : {
        type : 'system_role_Role'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    margin: '10 0 0 10',

    items: [
        {
            xtype: 'system_role_RoleLeft',
            itemId: 'roleContent',
            width: 380,
            margin: '0 5 10 0',
            flex:1
        },
        {
            xtype: 'system_role_RoleRight',
            itemId: 'moduleContent',
            margin: '0 10 10 5',
            flex: 1
        }
    ]
});