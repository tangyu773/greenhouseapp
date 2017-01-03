Ext.define('Admin.view.system.user.Userstationwin', {
    extend: 'Ext.window.Window',
    xtype: 'user_station-window',
    name:'Userstationwin',
    reference: 'Userstationwin',
    viewModel: {
        type: 'system_user_User'
    },
    controller: 'system_user_User',
    title: '添加可订票站',
    width: 600,
    height: 400,
    minWidth: 300,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    modal: true,
    win_staff_id:undefined,
    
    items: [{
    xtype:'tabpanel',
    layout: {
            type: 'vbox',
            align: 'stretch'
        },

    listeners: {
        tabchange: 'onTabChange'
    },
    cls: 'shadow-panel',
    frame: true,
    defaults: {
        bodyPadding: 10,
        scrollable: true
    },
     items: [ {
        title: '按站添加',
        items:[
        { xtype: 'form',
        width: 550,
    height: 290,

        reference: 'windowForm',

        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
        },
        items: [{
              xtype: 'tagfield',
              name:'user_add_tagf',
              fieldLabel: '允许订票车站',
              allowBlank:false,
              bind : {
                store : '{UserGrid}'
              },            
              displayField: 'station_name',
              valueField: 'station_telecode',
              queryMode: 'local',
              columnWidth:1,
             
              filterPickList: true,
      
              listeners : {  
                beforequery : just.util.futySearch  ,            
            }
        }],
        buttons: [ {
            text: '提交',
            disabled: true,
            formBind: true,
            handler: 'onsubstationSub'
        }]
    }
        ]
    }, {
        title: '按路局添加',
        items:[
        { xtype: 'form',
 width: 550,
    height: 290,
        reference: 'windowForm1',

        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
        },
        items: [{
              xtype: 'tagfield',
              name:'bueau_add_tagf',
              fieldLabel: '按路局添加车站',
              allowBlank:false,
               bind : {
                store : '{bureaumod}'
            },            
              displayField: 'bureau_name',
              valueField: 'bureau_code',
              queryMode: 'local',
              columnWidth:1,            
              filterPickList: true,
        }],
        buttons: [ {
            text: '提交',
            disabled: true,
            formBind: true,
            handler: 'onsubstationSub'
        }]
    }
        ]
    }],
   
        
 }
        
    ]
});

