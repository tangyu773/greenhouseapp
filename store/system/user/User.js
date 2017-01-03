/**
 * 代理Proxy 来加载数据
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.store.system.user.User', {
    extend: 'Ext.data.Store',
    alias: 'store.system_user_User',

    model: 'Admin.model.system.user.User',

    pageSize: 1000,
    
    proxy: {
        api: {
            ADD: just.getUrl('/sys/user/sys_user_add_c.action'),
            UPDATE: just.getUrl('/sys/user/sys_user_update_u.action'),
            DELETE: just.getUrl('/sys/user/sys_user_delete_d.action'),
            REPWD: just.getUrl('/sys/user/sys_user_repwd_u.action'),
            NOTINSTATION: just.getUrl('/sys/user/substation_noadd_q_r.action'),
            LOADSTATION: just.getUrl('/sys/user/substation_query_r.action'),
            BUREAU: just.getUrl('/sys/user/bureau_list_r.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/sys_user_query_r.action'),
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