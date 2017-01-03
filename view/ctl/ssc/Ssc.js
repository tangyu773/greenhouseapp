Ext.define('Admin.view.ctl.ssc.Ssc', {
	extend: 'Ext.container.Container',
	xtype: 'ctl_ssc_Ssc',
	title: false,
	requires: [ 
        'Admin.view.ctl.ssc.SscList',
        'Admin.view.ctl.ssc.SscSubList',
		'Admin.view.ctl.ssc.SscController',
		'Admin.view.ctl.ssc.SscViewModel',
		'Admin.view.ctl.ssc.SscAdd',
		'Admin.view.ctl.ssc.SscSubAdd',
		'Admin.view.ctl.ssc.SscSubEdit',
		'Admin.store.ctl.ssc.SscStore',
		'Admin.store.ctl.ssc.SscSubStore',
	],
	cls: 'shadow-panel',
	controller: 'ctl_ssc_Ssc',
	viewModel: {
		type: 'ctl_ssc_Ssc'
	},
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: false,
        split: true,
    },
	itemId: 'ctl_ssc_Ssc',
	layout: 'border',
	items: [ {
		region: 'west',
		width: 420,
		xtype: 'ctl_ssc_SscList'
	}, {
		region: 'center',
		xtype: 'ctl_ssc_SscSubList'
	} ],
	margin: '0'
});
