/**
 * 角色权限管理
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.store.system.module.ModuleTree', {
    extend: "Ext.data.TreeStore",
    alias: 'store.system_module_ModuleTree',
    model: 'Admin.model.system.module.Module',
    root: {
        text: '顶级菜单',
        id:0,
        expanded: true
    },
    proxy: {
        api: {
        	QUERY: just.getUrl('/sys/module/show.action'),
        	ADD: just.getUrl('/sys/module/module_add_c.action'),
            UPDATE: just.getUrl('/sys/module/module_update_u.action'),
            DELETE: just.getUrl('/sys/module/module_delete_d.action'),
            GET_ROLE_RIGHT_MENU:just.getUrl('/sys/auth/showMenu.action'),
            ROLEMODUE_UPDATE : just.getUrl('/sys/module/sys_rolemenu_update_u.action')
        },
        type: 'ajax',
        url: just.getUrl('/sys/module/show.action'),
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