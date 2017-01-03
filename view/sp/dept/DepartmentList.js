Ext.define('Admin.view.sp.dept.DepartmentList', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.sp_dept_DepartmentList',
	id : 'sp_dept_DepartmentList_Panel',
	cls : 'email-inbox-panel shadow-panel',
	title : '部门列表',
	height : Math.floor(Ext.Element.getViewportHeight() - 90),
	name : 'sp_dept_DepartmentList',
	viewModel : {
		type : 'sp_dept_Department'
	},
	bind : {
		store : '{DepartmentGrid}'
	},
	reference : 'dept_grid',
	viewConfig : {
		preserveScrollOnRefresh : true,
		preserveScrollOnReload : true,
		stripeRows : true
	},
	border : true,
	forceFit : true,
	columnLines : true,
	rootVisible : false,
	columns : [ {
		xtype: 'treecolumn',
		dataIndex : 'text',
		text : '部门名称',
		align : "left",
	}, {
		dataIndex: 'corpname',
		text: '所属企业',
		listeners:{
            'render':function(utc, eOpts ) {
				var loginInfo = just.data.user.loginInfo;
				if (loginInfo.roleid > 2) {   
					  utc.setVisible(false);
				} 
			}
        }
	} ],
	dockedItems : [ {
		xtype : 'toolbar',
		items : [{
			xtype : 'toolbar',
			items : [ { 
					xtype : 'button', 
					text : '刷新', 
					iconCls :'icon-refresh', 
					ui: 'soft-blue', 
					listeners: {
					  click: '_onRefresh_dept' 
					} 
				},'|',{ 
					xtype : 'button', 
					ui:'soft-blue', 
					text : '新增', 
					iconCls : 'fa fa-align-left fa-plus-square-o', 
					action:'add', 
//					handler: '_onShowAddWin'
				},'|',{ 
					xtype : 'button', 
					ui:'soft-blue', 
					text : '修改', 
					iconCls: 'fa fa-pencil-square fa-lg update-opear-button', 
					action:'edit', 
				},'|',{ 
					xtype : 'button', 
					ui:'soft-blue', 
					text : '删除', 
					iconCls: 'fa fa-trash-o fa-lg delete-opear-button',
					action:'delete', 
				}
			]
		}]
	}],
	initComponent : function() {
		this.callParent(arguments);
	}
});
