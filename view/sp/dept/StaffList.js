Ext.define('Admin.view.sp.dept.StaffList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.sp_dept_StaffList',
	 id : 'sp_dept_StaffList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '未添加部门员工列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 id:'sp_dept_StaffList',
	 name:'sp_dept_StaffList',
	 viewModel: {
	     type: 'sp_dept_Department'
	 },
	 bind : {
		store : '{StaffGrid}'
	 },
	 reference: 'staff_grid',
	 viewConfig : {
		 preserveScrollOnRefresh : true,
		 preserveScrollOnReload : true,
		 stripeRows: true
	 },
	 selModel : {
		 selType : 'checkboxmodel',
		 checkOnly : true,
		 showHeaderCheckbox : true
	},
	border : true,
//    forceFit: true,
    columnLines:true,
	columns : [ {
		dataIndex : 'staffid', text : '员工账号', align : "center", flex : 120
	}, {
		dataIndex : 'staffname', text : '姓名', align : "center", flex : 120
	}, {
		dataIndex : 'useflag', text : '状态', align : "center", flex : 100,
		renderer:function(v) {
    		return just.util.valueTransText(v,just.data.CUR_STATUS,'color_status');
    	}
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{StaffGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
