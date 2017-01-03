Ext.define('Admin.view.sensor.sensor', {
	extend : 'Ext.container.Container',
	xtype : 'sensor_sensor',
	// title : '用户管理',
	title : false,
	requires : [
    'Admin.view.sensor.sensorList',
		'Admin.view.sensor.sensorController',
		'Admin.view.sensor.sensorViewModel',
		'Admin.view.sensor.sensorAdd',
		'Admin.store.sensor.sensor',
		'Admin.store.sensor.logic_s',
		'Ext.ux.grid.SubTable',
		'Admin.store.sensor.sensortl',
		'Admin.store.gateway.gateway',
	],
	cls : 'shadow-panel',
	controller : 'sensor_sensor',
	viewModel : {
		type : 'sensor_sensor'
	},
	listeners : {
	//	afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'sensor_sensor',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'sensor_sensorList'
	} ],
	margin : '5 10 5 10'
});
