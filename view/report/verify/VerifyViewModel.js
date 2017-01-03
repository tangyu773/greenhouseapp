/**
 * 设置数据模型
 */
Ext.define('Admin.view.report.verify.VerifyViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.report_verify_Verify',

    stores: {
        VerifyGrid: {
            type: 'report_verify_Verify'
        }
    },
});
