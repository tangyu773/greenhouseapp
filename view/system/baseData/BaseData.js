Ext.define('Admin.view.system.baseData.BaseData', {
	extend : 'Ext.container.Container',
	xtype : 'system_baseData_BaseData',
	title : false,
	requires : [ 
        'Admin.view.system.baseData.BaseDataList',
		'Admin.view.system.baseData.BaseDataController',
		'Admin.view.system.baseData.BaseDataViewModel',
		'Admin.view.system.baseData.BaseDataAdd',
		'Admin.view.system.baseData.BaseDataEdit',
		'Admin.store.system.baseData.BaseData',
	],
	cls : 'shadow-panel',
	controller : 'system_baseData_BaseData',
	viewModel : {
		type : 'system_baseData_BaseData'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
//        bodyPadding: 10
    },
	itemId : 'system_baseData_BaseData',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'system_baseData_BaseDataList'
	} ],
	margin : '5 10 5 10'
});
