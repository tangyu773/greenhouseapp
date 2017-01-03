/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.substaff.SubstaffAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.contactadd',
    requires: [

    ],
    reference: 'substaffadd',
    id:'substaffadd',
    viewModel: {
        type: 'system_contact'
    },
    reference: 'substaffadd',
    controller: 'substaff_substaff',
    _flag:true,
    cls: 'email-compose',

    layout: {
        type:'vbox',
        align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,



   // //bodyPadding: 10,
   // scrollable:true,
    width: 300,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'side'
    },




    /*defaults: {
        labelWidth: 60,
        xtype: 'textfield',
        labelSeparator: ''
    },*/

    items: [

    {
        xtype: 'fieldset',
        title: '联系人信息',

        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        
        items: [
            { allowBlank:false, fieldLabel: '姓名', name: 'name', },
            { allowBlank:false, fieldLabel: '身份证', name: 'idcard',vtype:'idcard',reference: 'contactadd_idcard',}

     
        ]
    }
        
    ],

    buttons: [{
        text: '  确  定  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onusersaveClick'
        }

    }]
});
