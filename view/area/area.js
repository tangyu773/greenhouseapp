Ext.define('Admin.view.area.area', {
	extend : 'Ext.container.Container',
	xtype : 'area_area',
	// title : '用户管理',
	title : false,
	requires : [
    'Admin.view.area.areaList',
		'Admin.view.area.areaController',
		'Admin.view.area.areaViewModel',
		'Admin.view.area.areaAdd',
		'Admin.store.area.area',
	],
	cls : 'shadow-panel',
	controller : 'area_area',
	viewModel : {
		type : 'area_area'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'area_area',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'area_areaList'
	} ],
	margin : '5 10 5 10'
});
