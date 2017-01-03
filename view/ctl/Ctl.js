Ext.define('Admin.view.ctl.Ctl', {
	extend: 'Ext.tab.Panel',
	xtype: 'ctl_CtlViewTab',
	title: false,
	requires: [ 
        'Admin.view.ctl.sensor.Sensor',
//        'Admin.view.ctl.timeperiod.TimePeriod',
        'Admin.view.ctl.ssc.Ssc',
        'Admin.view.ctl.at.At',
        'Admin.view.ctl.wc.Wc',
        'Admin.view.ctl.liquid.Liquid',
        'Admin.view.ctl.fix.Fix',
        'Admin.store.ctl.sp.SpInfo',
	],
//	cls: 'shadow-panel',
//	controller: 'agency_Agency',
//	viewModel: {
//		type: 'agency_Agency'
//	},
//	listeners: {
//		afterrender: 'initPermission'
//	},
	activeTab: 0,
	height: Math.floor(Ext.Element.getViewportHeight()-80),
//	tabPosition: 'bottom',
	items: [ {
		xtype: 'ctl_sensor_Sensor',
		title: "采集调度",
	}, {
		xtype: 'ctl_at_At',
		title: "风机",
	}, {
		xtype: 'ctl_ssc_Ssc',
		title: "遮阳帘",
	}, {
		xtype: 'ctl_wc_Wc',
		title: "营养液循环泵",
	}, {
		xtype: 'ctl_liquid_Liquid',
		title: "自动滴灌",
	}, {
		xtype: 'ctl_fix_Fix',
		title: "自动滴灌补水",
	}/*, {
		xtype: 'ctl_timeperiod_TimePeriod',
		title: "时间段配置",
	}*/],
	margin: '5 10 5 10'
});
