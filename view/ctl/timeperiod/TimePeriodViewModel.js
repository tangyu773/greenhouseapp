/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.timeperiod.TimePeriodViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_timeperiod_TimePeriod',

    stores: {
        TimePeriodGrid: {
            type: 'ctl_timeperiod_TimePeriodStore'
        }
    },
});
