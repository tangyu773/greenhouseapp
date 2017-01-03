Ext.define('Admin.view.sp.spinfo.SpInfo', {
	extend : 'Ext.container.Container',
	xtype : 'sp_spinfo_SpInfo',
	title : false,
	requires : [ 
        'Admin.view.sp.spinfo.SpInfoList',
		'Admin.view.sp.spinfo.SpInfoController',
		'Admin.view.sp.spinfo.SpInfoEdit',
		'Admin.view.sp.spinfo.SpInfoViewModel',
		'Admin.store.sp.spinfo.SpInfo',
	],
	controller : 'sp_spinfo_SpInfo',
	viewModel : {
		type : 'sp_spinfo_SpInfo'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'sp_spinfo_SpInfo',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'sp_spinfo_SpInfoList'
	}, {
		region : 'west',
		width : 450,
	 	maxWidth: 450,
	 	bodyPadding: 10,
		xtype : 'sp_spinfo_SpInfoEdit'
	} ],
	margin : '5 10 5 10'
});
