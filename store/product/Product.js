Ext.define('Admin.store.product.Product', {
    extend: 'Ext.data.Store',
    alias: 'store.product_Product',

    model: 'Admin.model.product.Product',

    pageSize: 50,

    proxy: {
        api: {
        	SAVE: just.getUrl('/sys/user/save.action'),
            ADD: just.getUrl('/sys/product/add.action'),
            UPDATE: just.getUrl('/sys/product/update.action'),
            DELETE: just.getUrl('/sys/user/as10_product_delete_d.action'),
            LIST:just.getUrl('/sys/user/as10_prouct_list_l.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/product/as10_product_query_r.action'),
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
