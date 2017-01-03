/**
 * 设置数据模型
 */
Ext.define('Admin.view.sp.dept.DepartmentViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sp_dept_Department',

    stores: {
        DepartmentGrid: {
            type: 'sp_dept_Department'
        },
        StaffGrid: {
        	type: 'sp_dept_Staff'
        }
    },
});
