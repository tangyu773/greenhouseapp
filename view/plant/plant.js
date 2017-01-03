Ext.define('Admin.view.plant.plant', {
	extend : 'Ext.container.Container',
	xtype : 'plant_plant',
	// title : '用户管理',
	title : false,
	requires : [
    'Admin.view.plant.plantList',
		'Admin.view.plant.plantController',
		'Admin.view.plant.plantViewModel',
		'Admin.view.plant.plantAdd',
		'Admin.store.plant.plant',
	],
	cls : 'shadow-panel',
	controller : 'plant_plant',
	viewModel : {
		type : 'plant_plant'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'plant_plant',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'plant_plantList'
	} ],
	margin : '5 10 5 10'
});
