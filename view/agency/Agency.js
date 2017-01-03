Ext.define('Admin.view.agency.Agency', {
	extend : 'Ext.container.Container',
	xtype : 'agency_Agency',
	// title : '用户管理',
	title : false,
	requires : [ 
        'Admin.view.agency.AgencyList',
		'Admin.view.agency.AgencyController',
		'Admin.view.agency.AgencyViewModel',
		'Admin.view.agency.AgencyAdd',
		'Admin.view.agency.AgencyEdit',
		'Admin.store.agency.Agency',
	],
	cls : 'shadow-panel',
	controller : 'agency_Agency',
	viewModel : {
		type : 'agency_Agency'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'agency_Agency',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'agency_AgencyList'
	} ],
	margin : '5 10 5 10'
});
