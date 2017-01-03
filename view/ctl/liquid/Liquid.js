Ext.define('Admin.view.ctl.liquid.Liquid', {
	extend: 'Ext.container.Container',
	xtype: 'ctl_liquid_Liquid',
	title: false,
	requires: [ 
        'Admin.view.ctl.liquid.LiquidList',
        'Admin.view.ctl.liquid.LiquidSubList',
		'Admin.view.ctl.liquid.LiquidController',
		'Admin.view.ctl.liquid.LiquidViewModel',
		'Admin.view.ctl.liquid.LiquidAdd',
		'Admin.view.ctl.liquid.LiquidSubAdd',
		'Admin.view.ctl.liquid.LiquidSubEdit',
		'Admin.store.ctl.liquid.LiquidStore',
		'Admin.store.ctl.liquid.LiquidSubStore',
		
		'Admin.view.ctl.liquid.LiquidTimePeriodList',
		'Admin.view.ctl.liquid.LiquidTimePeriodAdd',
		'Admin.view.ctl.liquid.LiquidTimePeriodEdit',
		'Admin.store.ctl.timeperiod.TimePeriodStore',
		
	],
	cls: 'shadow-panel',
	controller: 'ctl_liquid_Liquid',
	viewModel: {
		type: 'ctl_liquid_Liquid'
	},
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: false,
        split: true,
    },
	itemId: 'ctl_liquid_Liquid',
	layout: 'border',
	items: [ {
		region: 'west',
		width: 420,
		xtype: 'ctl_liquid_LiquidList'
	}, {
		region: 'center',
		layout: 'border',
		defaults: {
	        collapsible: false,
	        split: true,
	    },
		items: [{
			region: 'center',
			xtype: 'ctl_liquid_LiquidSubList'
		}, {
			region: 'south',
			xtype: 'ctl_liquid_LiquidTimePeriodList'
		}]
		
	} ],
	margin: '0'
});
