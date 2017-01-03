/**
 * 加载左边菜单
 */
Ext.define('Admin.store.UserTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'userTree',
    alias: 'store.UserTree',
    nodeParam : 'node',
    defaultRootId : '0',
    root: {
    	node : '0',
        expanded: true
    },
   
    proxy : {
         
        type : 'ajax',
        url : just.getUrl('/sys/user/showUsrTree.action')
    },
    autoLoad:false,
    fields: [{
        name: 'text'
}]
});
