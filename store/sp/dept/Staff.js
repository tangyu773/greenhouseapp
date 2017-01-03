Ext.define('Admin.store.sp.dept.Staff', {
    extend: 'Ext.data.Store',
    alias: 'store.sp_dept_Staff',

    model: 'Admin.model.sp.dept.Staff',

    pageSize: 25,
    
    proxy: {
        api: {
        	DEPT_STAFF: just.getUrl('/sp/dept/as10_sp_dept_staff_query_r.action'),
        	ADD_DEPT_STAFF: just.getUrl('/sp/dept/as10_sp_dept_staff_add_c.action'),
            DELETE_DEPT_STAFF: just.getUrl('/sp/dept/as10_sp_dept_staff_delete_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sp/dept/as10_sp_dept_staff_no_query_r.action'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        writer: {
            type: 'json'
        }
    }
});