Ext.define('Admin.view.system.role.RoleRight', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.system_role_RoleRight',
    id : 'system_role_RoleRight_panel',
   /* cls: 'email-inbox-panel shadow-panel',*/
    height:Math.floor(Ext.Element.getViewportHeight()-115),
    bind: {
        store: '{moduleGrid}'
    },
    cls: 'shadow-panel',
    viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        stripeRows: true
    },

    selModel: {
        checkOnly: true
     },
    forceFit: true,
    headerBorders: false,
    rowLines: true,
    rootVisible : false,
    columns:[
        {xtype:'treecolumn',text: "模块名称",  dataIndex: "text", width : 180},
        {xtype:'checkcolumn',text: "显示", dataIndex: "r", align:'center',actionType:'r', action:'roleright'},
        {xtype:'checkcolumn',text: "新增", dataIndex: "c", align:'center',actionType:'c', action:'roleright'},
        {xtype:'checkcolumn',text: "修改", dataIndex: "u", align:'center',actionType:'u', action:'roleright'},
        {xtype:'checkcolumn',text: "删除", dataIndex: "d", align:'center',actionType:'d', action:'roleright'}
    ]
});
