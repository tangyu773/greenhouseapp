Ext.define('Admin.store.sensor.devaddr', {
    extend: 'Ext.data.Store',
    alias: 'store.devaddr_decaddr',


    autoLoad :false,
    pageSize: 50,

    proxy: {
        api: {

        },
        extraParams : {gwid:0},
        type: 'ajax',
        url: just.getUrl('/sys/product/searchdevaddr.action'),
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
