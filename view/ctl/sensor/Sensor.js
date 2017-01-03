Ext.define('Admin.view.ctl.sensor.Sensor', {
	extend: 'Ext.container.Container',
	xtype: 'ctl_sensor_Sensor',
	title: false,
	requires: [ 
        'Admin.view.ctl.sensor.SensorList',
        'Admin.view.ctl.sensor.SensorSubList',
		'Admin.view.ctl.sensor.SensorController',
		'Admin.view.ctl.sensor.SensorViewModel',
		'Admin.view.ctl.sensor.SensorAdd',
		'Admin.view.ctl.sensor.SensorSubAdd',
		'Admin.view.ctl.sensor.SensorSubEdit',
		'Admin.store.ctl.sensor.SensorStore',
		'Admin.store.ctl.sensor.SensorSubStore',
	],
	cls: 'shadow-panel',
	controller: 'ctl_sensor_Sensor',
	viewModel: {
		type: 'ctl_sensor_Sensor'
	},
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: false,
        split: true,
    },
	itemId: 'ctl_sensor_Sensor',
	layout: 'border',
	items: [ {
		region: 'west',
		width: 420,
		xtype: 'ctl_sensor_SensorList'
	}, {
		region: 'center',
		xtype: 'ctl_sensor_SensorSubList'
	} ],
	margin: '0'
});
