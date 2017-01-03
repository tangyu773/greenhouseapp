Ext.define('Admin.store.bar', {
    extend: 'Ext.data.Store',
    alias: 'store.widget_bar',

/*    model: 'Admin.model.system.user.User',*/

    pageSize: 1000,
    
    proxy: {
        
        type: 'ajax',
        url: just.getUrl('/sys/user/ordernum_q_r.action'),
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