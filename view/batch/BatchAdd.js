/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.batch.BatchAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.batchadd',
    requires: [

    ],
    reference: 'batchadd',
    id:'batchadd',
    viewModel: {
        type: 'batch_batch'
    },
    controller: 'batch_controller',
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
            name : 'batch_file',
            fieldLabel: '打包信息文件路径',
            buttonConfig: {
                xtype: 'filebutton',
                glyph:'',
                width:100,
                iconCls: 'x-fa fa-cloud-upload',
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
