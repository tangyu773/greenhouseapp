/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.outgo.OutgoAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.outgoadd',
    requires: [

    ],
    reference: 'outgoadd',
    id:'outgoadd',
  /*  viewModel: {
        type: 'outgo_outgo'
    },*/
    controller: 'outgo_controller',
    _flag:true,
    cls: 'email-compose',

    layout: {
        type:'vbox',
        pack: 'center',
        align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,



   // //bodyPadding: 10,
   // scrollable:true,
    width: 300,

    fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            
            labelStyle: 'font-weight:bold'
        },


     items: [{
            xtype: 'filefield',
            name : 'outgo_file',
            fieldLabel: '出库文件路径',
            buttonConfig: {
                xtype: 'filebutton',
                glyph:'',
                iconCls: 'x-fa fa-cloud-upload',
                width:100,
                text: '选择文件'
            },
            
           // labelAlign: 'top',
            allowBlank: false
        }],

    buttons: [{
        text: '  上  传  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onusersaveClick'
        }

    }]
});
