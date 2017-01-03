Ext.define('Admin.store.house.house', {
    extend: 'Ext.data.Store',
    alias: 'store.house_house',
    pageSize: 25,
    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/gh10_house_add_c.action'),
            DELETE: just.getUrl('/sys/user/gh10_house_delete_d.action'),
            LIST:just.getUrl('/sys/user/gh10_gateway_list_l.action'),
            glist:just.getUrl('/sys/user/gh10_house_list_l.action'),
            ADDlsensor:just.getUrl('/sys/user/gh10_house_addlsensor_c.action'),
            Addtrigid:just.getUrl('/sys/user/gh10_house_addtrigid_u.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_house_query_r.action'),
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
