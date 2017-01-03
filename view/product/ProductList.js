Ext.define('Admin.view.product.ProductList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.product_ProductList',
	 id : 'product_ProductList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '产品列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'product_ProductList',
	 name:'product_ProductList',
	 viewModel: {
	     type: 'product_Product'
	 },
	 bind : {
		store : '{ProductGrid}'
	 },
	 reference: 'product_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [ {
		dataIndex : 'corpname', text : '生产企业', align : "center", flex : 160,
		listeners:{
            'render':function(utc, eOpts ) {
				var loginInfo = just.data.user.loginInfo;
				if (loginInfo.roleid > 2) {   
					  utc.setVisible(false);
				} 
			}
        }
	}, {
		dataIndex : 'productcode', text : '商品条码', align : "center", flex : 100
	}, {
		dataIndex : 'prodname', text : '产品名称', align : "center", flex : 140
	}, {
		dataIndex : 'createtime', text : '建立时间', align : "center", flex : 140
	}, {
		dataIndex : 'staffid', text : '操作员', align : "center", flex : 100
	}, {
		dataIndex : 'packagespec', text : '包装内容', align : "center", flex : 120
	}, {
		dataIndex : 'comment', text : '标注', align : "center", flex : 120
	}, {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        flex: 120,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button',
            action: 'edit',
            tooltip: '修改产品',
            handler: '_onShowEditWin'
        },/* {
        	iconCls: 'fa icon-trash fa-lg opear-button',
        	action: 'del',
            tooltip: '删除产品',
            handler: '_onDelete'
        },*/ {
        	iconCls: 'fa icon-comment fa-lg opear-button',
        	action: 'details',
            tooltip: '产品详情',
            handler: '_onShowDetails'
    	}]
	} ],
	dockedItems : [{
		xtype: 'toolbar',
		items: [{
	        xtype : 'toolbar',
	        items : [ {
						xtype : 'button',
						text : '刷新',
						iconCls : 'icon-refresh',
						ui: 'soft-blue',
						width:65,
						listeners: {
	                        click: '_onRefresh'
	                    }
					},'|',{
	                    xtype : 'button',
	                    ui: 'soft-blue',
	                    text : '新增',
	                    iconCls : 'fa fa-align-left fa-plus-square-o',
	                    action:'add',
					},'|',{
						xtype : 'form',
				        name :'spinfo_ProductSearch_from',
				        layout : 'column',// 列布局
						margin : '0 0 0 0',
						defaultType : 'textfield',// 默认的Form表单组件
						defaults : {
							labelWidth : 60,
							labelAlign : 'right',
							columnWidth : 0.18,// 列宽百分百
							padding : '0 0 0 0',// 行列间距
							selectOnFocus : true,// 选中所有内容
							allowBlank : true,
					        height: 25,
							minLength : 0,
							maxLength : 30
						},
						items : [ {
							name : 'corpname',
							fieldLabel : '<span style="font-weight:bold">生产企业</span>',
							emptyText: '请搜索生产企业',
							margin: '0 10 0 0',
							listeners:{
					            'render':function(utc, eOpts ) {
									var loginInfo = just.data.user.loginInfo;
									if (loginInfo.roleid > 2) {   
										  utc.setVisible(false);
									} 
								}
					        }
						}, {
							name : 'prodname',
							fieldLabel : '<span style="font-weight:bold">产品名称</span>',
							emptyText : '请搜索产品名称',
						}, {
							name : 'productcode',
							fieldLabel : '<span style="font-weight:bold">商品条码</span>',
							emptyText : '请搜索商品条码',
							margin: '0 0 0 10',
						}, {
				            xtype: 'button',
				            iconCls: 'icon-search',
				            text : '搜索',
				            action: 'search',
				            margin: '0 0 0 15',
				            width: 80,
				            listeners: {
		                        click: '_onRefresh'
	                        }
				        } ]
					} ]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{ProductGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});

