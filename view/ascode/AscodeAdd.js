/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.ascode.AscodeAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ascodeadd',
    requires: [

    ],
    reference: 'ascodeadd',
    id:'ascodeadd',
    viewModel: {
        type: 'ascode_ascode'
    },
    controller: 'ascode_controller',

    cls: 'email-compose',

    layout: {
        type:'vbox',
        align:'stretch'
    },
    //_cascade1:undefined;
    bodyPadding: 10,
    scrollable: true,
    listeners: {
       render: '_onLoadBaseData1'
    },


   // //bodyPadding: 10,
   // scrollable:true,
    width: 300,
  defaultType : 'textfield',//默认的Form表单组件
    fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
        },


     items: [{
            name : 'productcode',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '商品条码',
            selectOnFocus : false,
            editable:false,
            emptyText : '请选择商品',
            valueField : 'value',
            displayField : 'text',
            allowBlank: false,
            listeners: {
              focus: 'onproductfocus',
              select:'onproductselect'
          },

            store :  Ext.create('Admin.store.product.Product'),

        },{
                        xtype : 'button',
                       // ui: 'soft-blue',
                        width:100,
                        text : '添加商品',
                        width:150,
                        iconCls : 'fa fa-align-left fa-plus-square-o',
                        listeners: {
                        click: 'onaddproductClick'
                        }
                    },{
                           name : 'casecode',
                           xtype: 'displayfield',
                           labelWidth: 200,
                           labelAlign: 'left',
                           fieldLabel : '包装比例(三级：二级：一级)',
                           emptyText : '请输入包装比例',
                           blankText : '包装比例不能为空',
                           maxLength : 24,
                           value:'',
                           allowBlank: true,
                       }, {
            xtype: 'numberfield',
            name : 'lv1_num',
            minValue : 1,
            value : 1,
            step: 1000,
            fieldLabel: '一级码数量',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            labelAlign: 'top',
            allowBlank: false,
            listeners : {
                change : 'on_lv1num_change'
            }
        }, {
            xtype: 'numberfield',
            name : 'lv2_num',
            minValue : 0,
            step: 100,
            value : 0,
            fieldLabel: '二级码数量',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            labelAlign: 'top',
            allowBlank: false
        }, {
            xtype: 'numberfield',
            name : 'lv3_num',
            minValue : 0,
            value : 0,
            step: 10,
            fieldLabel: '三级码数量',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            labelAlign: 'top',
            allowBlank: false
        }, {
            xtype: 'textareafield',
            name:'des',
            fieldLabel: '备注',
            labelAlign: 'top',
            flex: 1,
            margin: '0',
            allowBlank: true
        }],

    buttons: [{
        text: '  确  定  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onusersaveClick'
        }

    }]
});
