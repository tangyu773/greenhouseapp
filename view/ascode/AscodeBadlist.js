Ext.define('Admin.view.ascode.AscodeBadlist', {
	extend : 'Ext.window.Window',
  alias: 'widget.ascodebadlist',
	//id : 'product_ProductAdd_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 600,//窗体宽度
    height : 600,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title : '身份码重复，导入失败',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
		listeners: {
			 //close: '_onLoadBaseData'
		},
    controller : 'ascode_controller',
	viewModel : {
		type : 'ascode_ascode'
	},
	items:[{
					xtype:'grid',
					height : 555,//窗体高度
					viewModel : {
				 	type: 'ascode_ascode'
				 },
				  bind : {
				 	store : '{badcodelist}'
				  },
				 	forceFit: true,
				  controller: 'ascode_controller',
				  reference: 'ascodebadlist',
				  viewConfig : {
				 	 stripeRows: true
				  },
				  listeners: {
				 	 //afterrender: '_initbadlistview'
				  },
				 columnLines:true,
				 columns : [{
	                 xtype: 'rownumberer',width:80
	             }, {
				 	dataIndex : 'code_lv', text : '身份码', align : "center",
				 }, {
				 	dataIndex : 'lv_type', text : '身份码级别', align : "center",
				 }, {
				 	dataIndex : 'reqid', text : '导入流水号', align : "center",
				 } ],
				 dockedItems : [ {
				 	xtype : 'pagingtoolbar',
				 	dock : 'bottom',
				 	displayInfo : true,
				 	bind : {
				 		store : '{badcodelist}'
				 	}
				 } ],

	}]




});



// Ext.define('Admin.view.ascode.AscodeBadlist', {
// 	 extend: 'Ext.grid.Panel',
//    alias: 'widget.ascodebadlist',
// 	 cls: 'email-inbox-panel shadow-panel',
// 	 //title : '导入失败,以下身份码重复',
// 	 viewModel : {
//  		type: 'ascode_ascode'
//  	},
// 	 bind : {
// 		store : '{badcodelist}'
// 	 },
//     forceFit: true,
//    controller: 'ascode_controller',
// 	 reference: 'ascodebadlist',
// 	 viewConfig : {
// 		 stripeRows: true
// 	 },
// 	 listeners: {
// 	 	 afterrender: '_initbadlistview'
// 	 },
//   columnLines:true,
// 	columns : [ {
// 		dataIndex : 'code_lv', text : '身份码', align : "center",
// 	}, {
// 		dataIndex : 'lv_type', text : '身份码级别', align : "center",
// 	}, {
// 		dataIndex : 'reqid', text : '导入流水号', align : "center",
// 	} ],
// 	dockedItems : [ {
// 		xtype : 'pagingtoolbar',
// 		dock : 'bottom',
// 		displayInfo : true,
// 		bind : {
// 			store : '{badcodelist}'
// 		}
// 	} ],
// 	initComponent : function() {
// 		this.callParent(arguments);
// 	}
// });
