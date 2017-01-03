/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.wc.WcViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_wc_Wc',

    stores: {
        WcGrid: {
            type: 'ctl_wc_WcStore'
        },
        WcSubGrid: {
        	type: 'ctl_wc_WcSubStore'
        }
    },
});
