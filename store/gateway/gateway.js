Ext.define('Admin.store.gateway.gateway', {
    extend: 'Ext.data.Store',
    alias: 'store.gateway_gateway',
    pageSize: 25,
    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/gh10_gateway_add_c.action'),
            DELETE: just.getUrl('/sys/user/gh10_gateway_delete_d.action'),
            LIST:just.getUrl('/sys/user/gh10_gateway_list_l.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_gateway_query_r.action'),
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
