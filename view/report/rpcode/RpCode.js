Ext.define('Admin.view.report.rpcode.RpCode', {
	extend : 'Ext.container.Container',
	xtype : 'report_rpcode_RpCode',
	title : false,
	requires : [ 
        'Admin.view.report.rpcode.RpCodeList',
		'Admin.view.report.rpcode.RpCodeController',
		'Admin.view.report.rpcode.RpCodeViewModel',
		'Admin.store.report.rpcode.RpCode',
	],
	controller : 'report_rpcode_RpCode',
	viewModel : {
		type : 'report_rpcode_RpCode'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        reportlit: true,
    },
	itemId : 'report_rpcode_RpCode',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'report_rpcode_RpCodeList'
	}],
	margin : '5 10 5 10'
});
