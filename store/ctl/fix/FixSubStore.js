Ext.define('Admin.store.ctl.fix.FixSubStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ctl_fix_FixSubStore',
    pageSize: 25,
    proxy: {
        api: {
        },
        type: 'ajax',
        url: just.getUrl('/sys/ctl/gh10_ctl_sub_fix_query_r.action'),
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
