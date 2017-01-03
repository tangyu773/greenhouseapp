Ext.define('Admin.view.ctl.wc.Wc', {
	extend: 'Ext.container.Container',
	xtype: 'ctl_wc_Wc',
	title: false,
	requires: [
        'Admin.view.ctl.wc.WcList',
        'Admin.view.ctl.wc.WcSubList',
		'Admin.view.ctl.wc.WcController',
		'Admin.view.ctl.wc.WcViewModel',
		'Admin.view.ctl.wc.WcAdd',
		'Admin.view.ctl.wc.WcSubAdd',
		'Admin.view.ctl.wc.WcSubEdit',
		'Admin.store.ctl.wc.WcStore',
		'Admin.store.ctl.wc.WcSubStore',

		'Admin.view.ctl.wc.WcTimePeriodList',
		'Admin.view.ctl.wc.WcTimePeriodAdd',
		'Admin.view.ctl.wc.WcTimePeriodEdit'

//		'Admin.view.ctl.timeperiod.TimePeriodList',
//		'Admin.store.ctl.timeperiod.TimePeriodStore',
	],
	cls: 'shadow-panel',
	controller: 'ctl_wc_Wc',
	viewModel: {
		type: 'ctl_wc_Wc'
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
		xtype: 'ctl_wc_WcList'
	}, {
		region: 'center',
		layout: 'border',
		defaults: {
	        collapsible: false,
	        split: true,
	    },
	    items: [{
			region: 'center',
			xtype: 'ctl_wc_WcSubList'
		}, {
			region: 'south',
			xtype: 'ctl_wc_WcTimePeriodList'
		}]
	} ],
	margin: '0'
});
