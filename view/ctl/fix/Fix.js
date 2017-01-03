Ext.define('Admin.view.ctl.fix.Fix', {
	extend: 'Ext.container.Container',
	xtype: 'ctl_fix_Fix',
	title: false,
	requires: [ 
        'Admin.view.ctl.fix.FixList',
        'Admin.view.ctl.fix.FixSubList',
		'Admin.view.ctl.fix.FixController',
		'Admin.view.ctl.fix.FixViewModel',
		'Admin.view.ctl.fix.FixAdd',
		'Admin.view.ctl.fix.FixSubAdd',
		'Admin.view.ctl.fix.FixSubEdit',
		'Admin.store.ctl.fix.FixStore',
		'Admin.store.ctl.fix.FixSubStore',
	],
	cls: 'shadow-panel',
	controller: 'ctl_fix_Fix',
	viewModel: {
		type: 'ctl_fix_Fix'
	},
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: false,
        split: true,
    },
	itemId: 'ctl_fix_Fix',
	layout: 'border',
	items: [ {
		region: 'west',
		width: 420,
		xtype: 'ctl_fix_FixList'
	}, {
		region: 'center',
		xtype: 'ctl_fix_FixSubList'
	} ],
	margin: '0'
});
