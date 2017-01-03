Ext.define('Admin.view.product.Product', {
	extend : 'Ext.container.Container',
	xtype : 'product_Product',
	title : false,
	requires : [ 
        'Admin.view.product.ProductList',
		'Admin.view.product.ProductController',
		'Admin.view.product.ProductViewModel',
		'Admin.view.product.ProductAdd',
		'Admin.view.product.ProductEdit',
		'Admin.view.product.ProductDetails',
		'Admin.store.product.Product',
	],
	cls : 'shadow-panel',
	controller : 'product_Product',
	viewModel : {
		type : 'product_Product'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
    },
	itemId : 'product_Product',
	layout : 'border',
	items : [ {
		region : 'center',
		collapsible: false,
		xtype : 'product_ProductList'
	} ],
	margin : '5 10 5 10'
});
