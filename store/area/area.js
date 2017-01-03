Ext.define('Admin.store.area.area', {
    extend: 'Ext.data.Store',
    alias: 'store.area_area',
    pageSize: 25,
    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/gh10_area_add_c.action'),
            DELETE: just.getUrl('/sys/user/gh10_area_del_d.action'),
            LIST:just.getUrl('/sys/user/gh10_gateway_list_l.action'),
            stafflist:just.getUrl('/sys/user/gh10_sysuser_list_l.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_area_query_r.action'),
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
