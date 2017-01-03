Ext.define('Admin.view.ctl.at.At', {
	extend: 'Ext.container.Container',
	xtype: 'ctl_at_At',
	title: false,
	requires: [
        'Admin.view.ctl.at.AtList',
        'Admin.view.ctl.at.AtSubList',
		'Admin.view.ctl.at.AtController',
		'Admin.view.ctl.at.AtViewModel',
		'Admin.view.ctl.at.AtAdd',
		'Admin.view.ctl.at.AtSubAdd',
		'Admin.view.ctl.at.AtAutoAdd',
		'Admin.view.ctl.at.AtSubEdit',
		'Admin.store.ctl.at.AtStore',
		'Admin.store.ctl.at.AtSubStore',
		'Admin.store.ctl.at.AtAutoStore',
		'Ext.ux.grid.SubTable',
	],
	cls: 'shadow-panel',
	controller: 'ctl_at_At',
	viewModel: {
		type: 'ctl_at_At'
	},
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: false,
        split: true,
    },
	layout: 'border',
	items: [ {
		region: 'west',
		width: 420,
		xtype: 'ctl_at_AtList'
	}, {
		region: 'center',
		xtype: 'ctl_at_AtSubList'
	} ],
	margin: '0'
});
