Ext.define('Admin.store.Order', {
    extend: 'Ext.data.Store',
    alias: 'store.order_order',

/*    model: 'Admin.model.system.user.User',*/

    pageSize: 1000,

    proxy: {
        api: {
            STATION: just.getUrl('/sys/user/station_query_r.action'),
            CONTACT: just.getUrl('/sys/user/generalcontact_query_r.action'),
            ADDORDER: just.getUrl('/sys/user/order_add_c.action')
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/order_query_r.action'),
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
