/**
 * 模块管理视图
 * Created by xiaozou on 15-10-22.
 */
Ext.define('Admin.view.system.module.Module', {
	extend : 'Ext.container.Container',
	xtype : 'system_module_Module',
	title : '模块管理',
	requires: [
	    'Admin.view.system.module.ModuleList',
	    'Admin.view.system.module.ModuleViewModel',
	    'Admin.view.system.module.ModuleController',
	    'Admin.store.system.module.ModuleTree',
	    'Admin.view.system.module.ModuleAdd',
	    'Admin.view.system.module.ModuleEdit'
    ],
	controller : 'system_module_Module',
	viewModel : {
		type : 'system_module_Module'
	},
	listeners: {
        afterrender: 'initPermission'
    },
	cls: 'shadow-panel',
	// 列表布局
	layout : 'column',
    items: [{
		columnWidth : 1.0,
        xtype: 'system_module_ModuleList'
	}],
	margin : '10 10 5 10'
});
