Ext.define('Admin.view.ctl.timeperiod.TimePeriod', {
	extend : 'Ext.container.Container',
	xtype : 'ctl_timeperiod_TimePeriod',
	// title : '用户管理',
	title : false,
	requires : [ 
        'Admin.view.ctl.timeperiod.TimePeriodList',
		'Admin.view.ctl.timeperiod.TimePeriodController',
		'Admin.view.ctl.timeperiod.TimePeriodViewModel',
		'Admin.view.ctl.timeperiod.TimePeriodAdd',
		'Admin.view.ctl.timeperiod.TimePeriodEdit',
		'Admin.store.ctl.timeperiod.TimePeriodStore',
	],
	cls : 'shadow-panel',
	controller : 'ctl_timeperiod_TimePeriod',
	viewModel : {
		type : 'ctl_timeperiod_TimePeriod'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'ctl_timeperiod_TimePeriod',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'ctl_timeperiod_TimePeriodList'
	} ],
	margin : '0'
});
