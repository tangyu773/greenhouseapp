/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.ascode.AscodeImport', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AscodeImport',
    requires: [

    ],
    reference: 'AscodeImport',
    id:'AscodeImport',
    viewModel: {
        type: 'ascode_ascode'
    },

    controller: 'ascode_controller',

    cls: 'email-compose',

    layout: {
        type:'vbox',
        align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,

listeners: {
       render: '_onLoadBaseData'
    },

   // //bodyPadding: 10,
   // scrollable:true,
    width: 300,

    fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold',
            msgTarget: 'under',
        },


     items: [{
            name : 'productcode',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '商品条码',
            selectOnFocus : false,
            editable:false,
            allowBlank: false,
            emptyText : '请选择商品',
            valueField : 'value',
            displayField : 'text',
            listeners: {
            focus: 'onproductfocus'
          },

            store :  Ext.create('Admin.store.product.Product'),
        },{
            xtype: 'filefield',
            name : 'lv1_file',
            fieldLabel: '一级码文件路径',
            buttonConfig: {
                xtype: 'filebutton',
                glyph:'',
                iconCls: 'x-fa fa-cloud-upload',
                text: '上传一级码'
            },
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            labelAlign: 'top',
            allowBlank: false
        },{
            xtype: 'filefield',
            name : 'lv2_file',
            fieldLabel: '二级码文件路径',

            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            buttonConfig: {
                    xtype: 'filebutton',
                    glyph:'',
                    iconCls: 'x-fa fa-cloud-upload',
                    text: '上传二级码'
            },

            labelAlign: 'top',
            allowBlank: false
        },{
            xtype: 'filefield',
            name : 'lv3_file',
            fieldLabel: '三级码文件路径',
            buttonConfig: {
                    xtype: 'filebutton',
                    glyph:'',
                    iconCls: 'x-fa fa-cloud-upload',
                    text: '上传三级码'
                },

            labelAlign: 'top',
            allowBlank: true
        },{
            xtype: 'textareafield',
            name:'des',
            fieldLabel: '备注',
            labelAlign: 'top',
            flex: 1,
            margin: '0',
            allowBlank: true
        },
        {
            name : 'reqid',
            xtype: 'textfield',
            readOnly : true ,
            hidden: true,
            hideLabel:true
        }],

    buttons: [{
        text: '  确  定  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'save_ascode_upload'
        }

    }]
});
