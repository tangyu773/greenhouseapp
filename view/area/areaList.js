Ext.define('Admin.view.area.areaList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.area_areaList',
	 id : 'area_areaList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '区域列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'area_areaList',
	 name:'area_areaList',
	 viewModel: {
	     type: 'area_area'
	 },
	 bind : {
		store : '{areaGrid}'
	 },
	 reference: 'area_grid',
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
            tooltip: '修改',
            handler: '_onShowEditWin'
        }, {
        	iconCls: 'fa fa-trash fa-lg opear-button',
        	action: 'del',
            tooltip: '删除',
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
		dataIndex : 'areaid', text : 'id', align : "center", width : 32
	}, {
		dataIndex : 'areaname', text : '区域名称', align : "center", width : 140
	}, {
		dataIndex : 'areacontactmobile', text : '联系人手机', align : "center", width : 140
	}, {
		dataIndex : 'valid_date', text : '系统许可日期', align : "center", width : 180
	}, {
		dataIndex : 'gh_num', text : '大棚许可数量', align : "center", width : 120
	}, {
		dataIndex : 'gw_num', text : '网关许可数量', align : "center", width : 120
	}, {
		dataIndex : 'sensor_num', text : '传感器许可数量', align : "center", width : 120
	}, {
		dataIndex : 'staffids', text : '区域人员', align : "center", width : 180,
		renderer : function(v,m,r) {
			return r.get('staffnames');
		}
	}],
	dockedItems : [{
		xtype: 'toolbar',
		items: [{
	        xtype : 'toolbar',
	        items : [ {
						xtype : 'button',
						text : '刷新',
						iconCls : 'fa icon-refresh',
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
	                    iconCls : 'fa fa-plus-square-o',
	                    action:'add',
					},'|',{
						xtype : 'form',
				        name :'area_areaSearch_from',
				        layout : 'column',// 列布局
						margin : '0 0 0 0',
						defaultType : 'textfield',// 默认的Form表单组件
						defaults : {
							labelWidth : 75,
							labelAlign : 'right',
							columnWidth : 0.18,// 列宽百分百
							padding : '0 0 0 0',// 行列间距
							selectOnFocus : true,// 选中所有内容
							allowBlank : true,
					        height: 25,
							minLength : 0,
							maxLength : 30
						},
						items : [ /*{
							name : 'areaname',
							fieldLabel : '<span style="font-weight:bold">经销商名称</span>',
							emptyText : '请搜索经销商名称',
						}, {
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
					} ]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{areaGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
