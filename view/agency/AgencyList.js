Ext.define('Admin.view.agency.AgencyList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.agency_AgencyList',
	 id : 'agency_AgencyList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '经销商列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'agency_AgencyList',
	 name:'agency_AgencyList',
	 viewModel: {
	     type: 'agency_Agency'
	 },
	 bind : {
		store : '{AgencyGrid}'
	 },
	 reference: 'agency_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [ {
		dataIndex : 'corpname', text : '所属企业', align : "center", width : 160,
		listeners:{
            'render':function(utc, eOpts ) {
				var loginInfo = just.data.user.loginInfo;
				if (loginInfo.roleid > 2) {   
					  utc.setVisible(false);
				} 
			}
        }
	}, {
		dataIndex : 'agencyname', text : '经销商名称', align : "center", width : 160
	}, {
		dataIndex : 'agencyaddress', text : '经销商地址', align : "center", width : 160
	}, {
		dataIndex : 'phone', text : '联系电话', align : "center", width : 120
	}, {
		dataIndex : 'fax', text : '传真号码', align : "center", width : 120
	}, {
		dataIndex : 'contacts', text : '责任人', align : "center", width : 120
	}, {
		dataIndex : 'connum', text : '联系人电话', align : "center", width : 160
	}, {
		dataIndex : 'email', text : '邮箱', align : "center", width : 160
	}, {
		dataIndex : 'website', text : '公司网址', align : "center", width : 120,
		renderer : function(v) {
			if(v){
		        v = '<a target="_blank"  href="'+v+'" >公司网址</a>';
		        return v;	
			}
		}
	}, {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 120,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button',
            action: 'edit',
            tooltip: '修改经销商',
            handler: '_onShowEditWin'
        }, {
        	iconCls: 'fa fa-trash fa-lg opear-button',
        	action: 'del',
            tooltip: '删除经销商',
            handler: '_onDelete'
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
				        name :'agency_AgencySearch_from',
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
						items : [ {
							name : 'agencyname',
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
				        } ]
					} ]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{AgencyGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
