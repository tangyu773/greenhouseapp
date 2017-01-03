Ext.define('Admin.view.system.baseData.BaseDataList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.system_baseData_BaseDataList',
	 id : 'system_baseData_BaseDataList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : false,
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'system_baseData_BaseDataList',
	 name:'system_baseData_BaseDataList',
	 viewModel: {
	     type: 'system_baseData_BaseData'
	 },
	 bind : {
		store : '{BaseDataGrid}'
	 },
	 reference: 'system_baseData_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [  {
		dataIndex : 'descrip', text : '参数名', align : "center", flex : 160,
	}, {
		dataIndex : 'paramval', text : '参数值', align : "center", flex : 160
	}, {
		dataIndex : 'paramdes', text : '参数描述', align : "center", flex : 160
	}, {
		dataIndex : 'useflag', text : '状态', align : "center", flex : 120,
		renderer:function(v) {
    		return just.util.valueTransText(v,just.data.CUR_STATUS,'color_status');
    	}
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
            tooltip: '修改基础数据',
            handler: '_onShowEditWin'
        }, {
        	iconCls: 'fa fa-ban fa-lg opear-button',
        	action: 'del',
            tooltip: '启用或禁用基础数据',
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
	//					action: 'refresh',
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
				        name :'system_baseData_BaseDataSearch_from',
				        layout : 'column',// 列布局
						margin : '0 0 0 0',
						defaultType : 'textfield',// 默认的Form表单组件
						defaults : {
							labelWidth : 50,
							labelAlign : 'right',
							columnWidth : 0.18,// 列宽百分百
							padding : '0 0 0 0',// 行列间距
							selectOnFocus : false,// 选中所有内容
							allowBlank : true,
					        height: 25,
							minLength : 0,
							maxLength : 30
						},
						items : [ {
							xtype : 'combo',
							name : 'module',
							fieldLabel : '<span style="font-weight:bold">模块名</span>',
							emptyText : '请选择模块名',
							editable : false,
							mode : 'local',
							store : Ext.create('Admin.store.system.baseData.BaseData'),
							displayField : 'text',
							valueField : 'value'
						}, {
							xtype: 'tbspacer'
						}, {
							name : 'descrip',
							fieldLabel : '<span style="font-weight:bold">参数名</span>',
							emptyText : '请搜索参数名',
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
			store : '{BaseDataGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
