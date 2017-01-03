Ext.define('Admin.view.system.module.ModuleList', {
	extend : 'Ext.tree.Panel',
	id : 'system_module_ModuleList_panel',
	alias : 'widget.system_module_ModuleList',
	viewModel : {
		type : 'system_module_Module'
	},
	name:'system_module_ModuleList',
	bind : {
		store : '{ModuleTreeGrid}'
	},
	reference: 'modulegrid',
	collapsed : false,
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	viewConfig : {
		 preserveScrollOnRefresh : true,
		 preserveScrollOnReload : true,
		 stripeRows: true
	 },
    /* selModel : {
		 selType : 'checkboxmodel',
		 checkOnly : true,
	     showHeaderCheckbox : true
	},*/
	border: true,
    forceFit: true,
	headerBorders : false,
    columnLines:true,
	rootVisible : false,
	columns : [
			{
				xtype : 'treecolumn',
				text : "模块名称",
				dataIndex : "text",
				width : 150
			},
			{
				text : "组件名称",
				dataIndex : 'compoment',
				align : "center",
				width : 150
			},
			{
				text : "模块状态",
				dataIndex : 'status',
				align : "center",
				width : 80,
				renderer : function(v) {
					return just.util.valueTransText(v, just.data.CUR_STATUS,
							'color_status');
				}
			}, {
				text : "相关路径",
				dataIndex : 'moduleurl',
				align : "center",
				width : 100
			}, {
				text : "菜单排序",
				dataIndex : 'msort',
				align : "center",
				width : 100
			}, {
				text : "模块分类",
				dataIndex : 'param',
				align : "center",
				width : 100
			},{
		        menuDisabled: true,
		        sortable: false,
		        xtype: 'actioncolumn',
		        width: 80,
				align : "center",
		        text: '操作',
		        items: [{
		            iconCls: 'fa fa-pencil-square fa-lg opear-button',
		            action: 'edit',
		            tooltip: '修改模块',
		          /*  handler: function(grid, rowIndex, colIndex, node, e, record, rowEl){
		                this.fireEvent('_onShowEditWin', this, grid, rowIndex, colIndex, node, e, record, rowEl);
		           }*/
		            handler: '_onShowEditWin'
		        }/*, {
		        	iconCls: 'fa fa-ban fa-lg opear-button',
		        	action: 'delete',
		            tooltip: '禁用模块',
		            handler: '_onDelete'
		        }*/]
			}

	],
	dockedItems : [{
        xtype : 'toolbar',
		items : [{
								xtype : 'button',
								text : '刷新',
								iconCls : 'fa fa-refresh',
								ui: 'soft-blue',
								width:65,
								listeners: {
			                        click: '_onResfresh'
			                        }
							},'|',{
                        xtype : 'button',
                        ui: 'soft-blue',
                        text : '新增模块',
                        action:'add',
                        iconCls : 'fa fa-plus-square',

                        //cls: 'delete-focus-bg',
                       // iconCls : 'x-fa fa-plus',
                        listeners: {
                        click: 'onuseraddClick'
                        }
                    }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{ModuleTreeGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
