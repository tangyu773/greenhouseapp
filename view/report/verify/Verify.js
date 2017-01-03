Ext.define('Admin.view.report.verify.Verify', {
	extend : 'Ext.container.Container',
	xtype : 'report_verify_Verify',
	title : false,
	requires : [ 
        'Admin.view.report.verify.VerifyList',
		'Admin.view.report.verify.VerifyController',
		'Admin.view.report.verify.VerifyViewModel',
		'Admin.store.report.verify.Verify',
	],
	controller : 'report_verify_Verify',
	viewModel : {
		type : 'report_verify_Verify'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        reportlit: true,
    },
	itemId : 'report_verify_Verify',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'report_verify_VerifyList'
	}],
	margin : '5 10 5 10'
});
