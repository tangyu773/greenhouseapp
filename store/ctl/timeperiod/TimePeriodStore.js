Ext.define('Admin.store.ctl.timeperiod.TimePeriodStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ctl_timeperiod_TimePeriodStore',

    pageSize: 25,

    proxy: {
        api: {
        },
        type: 'ajax',
        url: just.getUrl('/sys/ctl/gh10_ctl_timeperiod_query_r.action'),
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
