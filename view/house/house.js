Ext.define('Admin.view.house.house', {
	extend : 'Ext.container.Container',
	xtype : 'house_house',
	// title : '用户管理',
	title : false,
	requires : [
    'Admin.view.house.houseList',
		'Admin.view.house.houseController',
		'Admin.view.house.houseViewModel',
		'Admin.view.house.houseAdd',
		'Admin.store.house.house',
		'Admin.view.house.housedetail',
		'Admin.view.dashboard.dp_sensor',
		'Admin.view.house.lsensoradd',
		'Admin.view.main.Window',
		'Admin.view.house.trigid',
		'Admin.view.ctl.Ctl',
		//'Admin.store.ctl.sp.SpInfo',
		'Admin.view.house.testwin',
		'Admin.view.widgets.Widgets',
		'Admin.view.house.dpdetail',
		'Admin.view.house.tabp_house',
		'Admin.view.house.house_tab'
	],
	//cls : 'shadow-panel',
	controller : 'house_house',
	viewModel : {
		type : 'house_house'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'house_house',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'house_houseList'
	} ],
	margin : '5 10 5 10'
});
