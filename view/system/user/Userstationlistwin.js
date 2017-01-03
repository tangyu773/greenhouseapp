Ext.define('Admin.view.system.user.Userstationlistwin', {
    extend: 'Ext.window.Window',
    xtype: 'user_station_list_window',
    name:'Userstationlistwin',
    reference: 'Userstationlistwin',
    viewModel: {
        type: 'system_user_User'
    },
    controller: 'system_user_User',
    title: '可订票站',
    width: 800,
    height: 580,
    minWidth: 300,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    modal: true,
    win_staff_id:undefined,
    //defaultFocus: 'firstName',
    //closeAction: 'hide',
    
    items: [
   {
        xtype: 'grid',
     bind : {
      store : '{UserGrid}'
     },
     viewConfig : {
    
       stripeRows: true
     },


      forceFit: true,
    
      columnLines:true,
      columns : [{
                xtype: 'rownumberer',
                text:'',
                width:40
            }, {
               dataIndex : 'staff_id',
                text : '账号',
                align: "center",
                width : 90,

            },{
    dataIndex : 'station_name',
    text : '可订票站',
    align: "center",
    width : 90,
    
  },{
    dataIndex : 'station_order',
    text : '允许订票',
    align: "center",
    width : 90,
    renderer:function(v) {
        return just.util.valueTransText(v,just.data.CUR_STATUS,'color_status');
      }
    
  },
    {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 90,
        align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-trash fa-lg opear-button',
            action: 'update',
            tooltip: '删除',
            handler: '_ondelsubstation'
        }]
    }],
    dockedItems : [{
        xtype : 'toolbar',
    items : [ {
                    xtype : 'toolbar',
                    items : [ {
                xtype : 'button',
                text : '刷新',
                iconCls : 'icon-refresh',
                ui: 'soft-blue',
                width:65,
                listeners: {
                              click: '_loadsubstaion'
                              }
              },'|',{
                        xtype : 'button',
                        ui: 'soft-blue',
                        text : '添加',
                        iconCls : 'fa fa-align-left fa-plus-square-o',
                        listeners: {
                        click: 'onsubstationaddClick'
                        }
                    } ]
                }]
  }, {
    xtype : 'pagingtoolbar',
    dock : 'bottom',
    displayInfo : true,
    bind : {
      store : '{UserGrid}'
    }
  } ],
  
  }
        
 
        
    ]
});