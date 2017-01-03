Ext.define('Admin.store.report.rpcode.RpCode', {
    extend: 'Ext.data.Store',
    alias: 'store.report_rpcode_RpCode',

    model: 'Admin.model.report.rpcode.RpCode',

    pageSize: 25,
    
    proxy: {
        api: {
        	SAVE: just.getUrl('/report/rpcode/save.action'),
            ADD: just.getUrl('/report/rpcode/as10_report_rpcode_add_c.action'),
            UPDATE: just.getUrl('/report/rpcode/as10_report_rpcode_update_u.action'),
            DELETE: just.getUrl('/report/rpcode/as10_report_rpcode_delete_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/report/rpcode/as10_report_rpcode_query_r.action'),
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