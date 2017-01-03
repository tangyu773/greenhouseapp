Ext.define('Admin.view.sp.dept.Department', {
	extend : 'Ext.container.Container',
	xtype : 'sp_dept_Department',
	title : false,
	requires : [ 
        'Admin.view.sp.dept.DepartmentList',
        'Admin.view.sp.dept.DepartmentStaffList',
        'Admin.view.sp.dept.StaffList',
		'Admin.view.sp.dept.DepartmentController',
		'Admin.view.sp.dept.DepartmentAdd',
		'Admin.view.sp.dept.DepartmentEdit',
		'Admin.view.sp.dept.DepartmentViewModel',
		'Admin.view.sp.dept.ButtonView',
		'Admin.store.sp.dept.Department',
		'Admin.store.sp.dept.Staff',
	],
	cls : 'shadow-panel',
	controller : 'sp_dept_Department',
	viewModel : {
		type : 'sp_dept_Department'
	},
	listeners : {
		afterrender : 'initPermission'
	},
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	itemId : 'sp_dept_Department',
	 layout: {
	        type: 'hbox',
	        pack: 'start',
	        align: 'stretch'
	    },
	frame: false,
	items : [ {
		xtype : 'sp_dept_DepartmentList',
		width: '26%',
		flex:3
	}, {
		xtype: 'panel',
		layout: 'border',
		border: false,
		flex:7,
		padding: '0 0 0 10',
		items: [{
			xtype: 'sp_dept_DepartmentStaffList',
			region:'west',
			width: '47%'
		}, {
			xtype: 'sp_dept_ButtonView',
			region: 'center',
			border: false,
		}, {
			xtype: 'sp_dept_StaffList',
			region: 'east',
			width: '47%'
		}]
	}],
	margin : '5 10 5 10'
});
