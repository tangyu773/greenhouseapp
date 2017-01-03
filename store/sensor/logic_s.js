Ext.define('Admin.store.sensor.logic_s', {
    extend: 'Ext.data.Store',
    alias: 'store.sensor_logic_s',



    pageSize: 100,
    autoLoad:true,
    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/gh10_sensor_add_c.action'),
            DELETE: just.getUrl('/sys/user/gh10_sensor_delete_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_sensorlogic_query_r.action'),
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
