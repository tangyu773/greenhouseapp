Ext.define('Admin.store.sensor.sensortl', {
    extend: 'Ext.data.Store',
    alias: 'store.sensor_sensortl',



    pageSize: 100,

    proxy: {
        api: {

        },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_sensortl_list_l.action'),
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
