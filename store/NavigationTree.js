/**
 * 加载左边菜单
 */
Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
    alias: 'store.NavigationTree',
    nodeParam : 'node',
    defaultRootId : '0',
    root: {
    	node : '0',
        expanded: true
    },
   
    proxy : {
         api: {
            SHOW: just.getUrl('/sys/module/show.action')
        },
        type : 'ajax',
        url : just.getUrl('/sys/module/loadModulelist.action')
    },
    autoLoad:false,
    fields: [{
        name: 'text'
}]
});
