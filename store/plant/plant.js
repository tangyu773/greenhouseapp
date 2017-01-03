Ext.define('Admin.store.plant.plant', {
    extend: 'Ext.data.Store',
    alias: 'store.plant_plant',
    pageSize: 25,
    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/gh10_plant_add_c.action'),
            DELETE: just.getUrl('/sys/user/gh10_plant_del_d.action'),
            LIST:just.getUrl('/sys/user/gh10_plant_list_l.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_plant_query_r.action'),
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
