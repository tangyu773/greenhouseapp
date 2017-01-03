Ext.define('Admin.view.plant.plantList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.plant_plantList',
	 id : 'plant_plantList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '植物列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'plant_plantList',
	 name:'plant_plantList',
	 viewModel: {
	     type: 'plant_plant'
	 },
	 bind : {
		store : '{plantGrid}'
	 },
	 reference: 'plant_grid',
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
		dataIndex : 'plantsid', text : 'id', align : "center", width : 160
	}, {
		dataIndex : 'plantsname', text : '农作物名称', align : "center", width : 160
	}, {
		dataIndex : 'ghstyle', text : '类型', align : "center", width : 120,
		renderer : function(v) {
			return just.util.valueTransText(v, just.data.ghstyle);
		}
	}, {
		dataIndex : 'cycle', text : '生长周期(天)', align : "center", width : 120
	}, {
			dataIndex: 'useflag',
			text: '状态',
			align: "center",
			flex: 70,
			renderer: function(v) {
					return just.util.valueTransText(v, just.data.CUR_STATUS, 'color_status');
			}
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
					},'|',{
						xtype : 'form',
				        name :'plant_plantSearch_from',
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
							name : 'plantname',
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
			store : '{plantGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
