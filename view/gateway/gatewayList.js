Ext.define('Admin.view.gateway.gatewayList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.gateway_gatewayList',
	 id : 'gateway_gatewayList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '网关列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'gateway_gatewayList',
	 name:'gateway_gatewayList',
	 viewModel: {
	     type: 'gateway_gateway'
	 },
	 bind : {
		store : '{gatewayGrid}'
	 },
	 reference: 'gateway_grid',
	 viewConfig : {
		 stripeRows: true
	 },
	 listeners : {
 		itemdblclick : '_onShowEditWin'
 	},

//    forceFit: true,
    columnLines:true,
	columns : [ {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 120,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button',
            action: 'edit',
            tooltip: '修改网关',
            handler: '_onShowEditWin'
        }, {
        	iconCls: 'fa fa-trash fa-lg opear-button',
        	action: 'del',
            tooltip: '删除网关',
            handler: '_onDelete'
        }]
	}, {
		dataIndex : 'compname', text : '所属企业', align : "center", width : 160,
		listeners:{
            'render':function(utc, eOpts ) {
				var loginInfo = just.data.user.loginInfo;
				if (loginInfo.roleid > 1) {
					  utc.setVisible(false);
				}
			}
        }
	}, {
		dataIndex : 'gwid', text : 'id', align : "center", width : 160
	}, {
		dataIndex : 'dispname', text : '网关名称', align : "center", width : 160
	}, {
		dataIndex : 'netstyle', text : '网络类型', align : "center", width : 120
	}, {
		dataIndex : 'ghid', text : '所属大棚', align : "center", width : 120,
		renderer:function(v,meta,record){
				 return record.get('ghname');
			 }

	}, {
		dataIndex : 'ipaddr', text : '服务器地址', align : "center", width : 120
	}, {
		dataIndex : 'port', text : '端口', align : "center", width : 120
	}, {
		dataIndex : 'frametimeout', text : '数据帧定时器', align : "center", width : 160
	}, {
		dataIndex : 'rsptimeout', text : '响应等待定时器', align : "center", width : 160
	}, {
		dataIndex : 'potocol', text : '协议', align : "center", width : 160
	}, {
		dataIndex : 'coninterval', text : '重连间隔', align : "center", width : 160
	} ],
	dockedItems : [{
		xtype: 'toolbar',
		items: [{
	        xtype : 'toolbar',
	        items : [{
						xtype : 'form',
				        name :'gateway_gatewaySearch_from',
				        layout : 'column',// 列布局
						margin : '0 0 0 0',
						defaultType : 'textfield',// 默认的Form表单组件
						defaults : {
							labelWidth : 40,
							labelAlign : 'right',
							columnWidth : 0.18,// 列宽百分百
							margin:'0 10 0 0',
							selectOnFocus : true,// 选中所有内容
							allowBlank : true,
					        height: 25,
							minLength : 0,
							maxLength : 30
						},
						items : [ {
							name : 'keyword',
							fieldLabel : '<span style="font-weight:bold">搜索</span>',
							emptyText : '请输入关键字(大棚，网关)',
						}/*, {
							name : 'corpname',
							fieldLabel : '<span style="font-weight:bold">所属企业</span>',
							emptyText: '请搜索所属企业',
							listeners:{
					            'render':function(utc, eOpts ) {
									var loginInfo = just.data.user.loginInfo;
									if (loginInfo.roleid > 2) {
										  utc.setVisible(false);
									}
								}
					        }
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
				        }*/ ]
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'icon-refresh',
						ui: 'soft-blue',
						action: 'refresh',
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
					} ]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{gatewayGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
