Ext.define('Admin.view.order.Order', {
	extend : 'Ext.container.Container',
	xtype : 'order_order',
	title : '用户管理',
	name:'container_order_main',
	requires: [
	    'Admin.view.order.OrderViewModel',
	    'Admin.view.order.OrderController',
	    'Admin.view.order.OrderAdd'
    ],
     cls: 'shadow-panel',
	controller : 'order_order',
	viewModel : {
		type : 'order_order'
	},
	// 列表布局
	height:Math.floor(Ext.Element.getViewportHeight()-90),
	layout : 'fit',
	items: [{
    	xtype:'panel',


        layout: 'fit',

        id: 'training_grief_rep_tab_4',
        border: false,
        deferredRender: false,
        //items : new TrainingBriefSummaryItem({sunmmaryId: tariningId}),
        autoScroll : true,
        html:' <iframe scrolling="auto" frameborder="0" width="100%" height="99%" src="'+'effectScatter-map.html'+'"> </iframe>'

    }

	],
	margin : '10 10 5 10'
});
