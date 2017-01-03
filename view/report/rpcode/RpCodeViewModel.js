/**
 * 设置数据模型
 */
Ext.define('Admin.view.report.rpcode.RpCodeViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.report_rpcode_RpCode',

    stores: {
        RpCodeGrid: {
            type: 'report_rpcode_RpCode'
        }
    },
});
