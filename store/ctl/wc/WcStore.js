Ext.define('Admin.store.ctl.wc.WcStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ctl_wc_WcStore',
    pageSize: 25,
    proxy: {
        api: {
        },
        type: 'ajax',
        url: just.getUrl('/sys/ctl/gh10_ctl_wc_query_r.action'),
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
