/**
 * 代理Proxy 来加载数据
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.store.system.role.Role', {
    extend: "Ext.data.Store",
    alias: 'store.system_role_Role',
    model: 'Admin.model.system.module.Module',
    proxy: {
        api: {
        	QUERY: just.getUrl('/sys/role/sys_role_query_r.action'),
        	LIST: just.getUrl('/sys/role/sys_role_list_l.action'),
        	ADD: just.getUrl('/sys/role/sys_role_add_c.action'),
            UPDATE: just.getUrl('/sys/user/sys_role_update_u.action'),
            DELETE: just.getUrl('/sys/role/sys_role_delete_d.action'),
            RELATELIST: just.getUrl('/sys/role/sys_role_relate_list_l.action'),
            TEACHERLIST: just.getUrl('/sys/role/sys_role_teacher_list_l.action')
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/sys_role_query_r.action'),
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
    },
    pageSize: 20
});