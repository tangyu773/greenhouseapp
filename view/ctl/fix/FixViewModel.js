/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.fix.FixViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_fix_Fix',

    stores: {
        FixGrid: {
            type: 'ctl_fix_FixStore'
        },
        FixSubGrid: {
        	type: 'ctl_fix_FixSubStore'
        }
    },
});
