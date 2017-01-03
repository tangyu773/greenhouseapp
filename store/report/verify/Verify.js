Ext.define('Admin.store.report.verify.Verify', {
    extend: 'Ext.data.Store',
    alias: 'store.report_verify_Verify',

    model: 'Admin.model.report.verify.Verify',

    pageSize: 25,
    
    proxy: {
        api: {
        	SAVE: just.getUrl('/report/verify/save.action'),
            ADD: just.getUrl('/report/verify/as10_report_verify_add_c.action'),
            UPDATE: just.getUrl('/report/verify/as10_report_verify_update_u.action'),
            DELETE: just.getUrl('/report/verify/as10_report_verify_delete_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/report/verify/as10_report_verify_query_r.action'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        writer: {
            type: 'json'
        }
    }
});