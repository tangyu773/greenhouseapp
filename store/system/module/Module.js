/**
 * 角色权限管理
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.store.system.module.Module', {
    extend: "Ext.data.TreeStore",
    alias: 'store.system_module_Module',
    model: 'Admin.model.system.module.Module',
    root: {
        text: '顶级菜单',
        id:0,
        expanded: true
    },
    proxy: {
        api: {
        	QUERY: just.getUrl('/sys/module/rootModule.action'),
            ROLEMODUE_UPDATE : just.getUrl('/sys/user/sys_rolemenu_update_u.action')
        },
        type: 'ajax',
        url: just.getUrl('/sys/module/rootview.action'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});