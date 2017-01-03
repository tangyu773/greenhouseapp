Ext.define('Admin.view.gateway.gateway', {
	extend : 'Ext.container.Container',
	xtype : 'gateway_gateway',
	// title : '用户管理',
	title : false,
	requires : [
    'Admin.view.gateway.gatewayList',
		'Admin.view.gateway.gatewayController',
		'Admin.view.gateway.gatewayViewModel',
		'Admin.view.gateway.gatewayAdd',
		'Admin.store.gateway.gateway',
	],
	cls : 'shadow-panel',
	controller : 'gateway_gateway',
	viewModel : {
		type : 'gateway_gateway'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'gateway_gateway',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'gateway_gatewayList'
	} ],
	margin : '5 10 5 10'
});
