Ext.define('Admin.store.ctl.sp.SpInfo', {
    extend: 'Ext.data.Store',
    alias: 'store.ctl_sp_SpInfo',
    pageSize: 25,
    autoLoad: true,
    proxy: {
        api: {
        },
        type: 'ajax',
        url: just.getUrl('/sp/spinfo/as10_sp_spinfo_list_l.action'),
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