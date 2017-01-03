/**
 * 设置数据模型
 */
Ext.define('Admin.view.product.ProductViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.product_Product',

    stores: {
        ProductGrid: {
            type: 'product_Product'
        }
    },
});
