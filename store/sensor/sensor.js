Ext.define('Admin.store.sensor.sensor', {
    extend: 'Ext.data.Store',
    alias: 'store.sensor_sensor',



    pageSize: 25,

    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/gh10_sensor_add_c.action'),
            DELETE: just.getUrl('/sys/user/gh10_sensor_delete_d.action'),
            upd: just.getUrl('/sys/user/gh10_sensor_upd_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_sensor_query_r.action'),
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
