Ext.define('Admin.store.ctl.at.AtAutoStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ctl_at_AtAutoStore',
    pageSize: 100,
    autoLoad:true,
    proxy: {
        api: {
        	QUERY_BY_ID: just.getUrl('/sys/ctl/gh10_ctl_at_auto1_query_r.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_query_r.action'),
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
