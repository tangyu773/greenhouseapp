/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.ssc.SscViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_ssc_Ssc',

    stores: {
        SscGrid: {
            type: 'ctl_ssc_SscStore'
        },
        SscSubGrid: {
        	type: 'ctl_ssc_SscSubStore'
        }
    },
});
