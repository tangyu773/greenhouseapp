Ext.define('Admin.view.order.OrderViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.order_order',

    stores: {
        order: {
            type: 'order_order'
        },
        station: {
        	type: 'order_order'
        },
        contact:{
            type:'order_order'
        }
    },
});
