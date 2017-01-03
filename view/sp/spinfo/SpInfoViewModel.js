/**
 * 设置数据模型
 */
Ext.define('Admin.view.sp.spinfo.SpInfoViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sp_spinfo_SpInfo',

    stores: {
        SpInfoGrid: {
            type: 'sp_spinfo_SpInfo'
        }
    },
});
