Ext.define('Admin.store.sp.dept.Department', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.sp_dept_Department',
    model: 'Admin.model.sp.dept.Department',
    root: {
    	text: '顶级部门',
    	id: 0,
    	expanded: true
    },
    proxy: {
        api: {
        	QUERY: just.getUrl('/sp/dept/show.action'),
            ADD: just.getUrl('/sp/dept/as10_sp_dept_add_c.action'),
            UPDATE: just.getUrl('/sp/dept/as10_sp_dept_update_u.action'),
            DELETE: just.getUrl('/sp/dept/as10_sp_dept_delete_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sp/dept/show.action'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
        },
        writer: {
            type: 'json'
        }
    }
});