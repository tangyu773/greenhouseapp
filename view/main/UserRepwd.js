/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.main.UserRepwd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userrepwd',
    requires: [

    ],
    reference: 'userrepwd',
    id:'userrepwd',

    controller: 'mainviewport',
    _flag:true,
  //  cls: 'email-compose',

    layout: {
        type:'vbox',
        align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,


    width: 300,

   defaultType : 'textfield',//默认的Form表单组件
    fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold',
            allowBlank:false,
        },


     items: [{
            inputType : 'password',
            name : 'oldpassword',
            fieldLabel : '<span class="form_require_symbol">*</span>原口令',
            emptyText : '请输入原口令',
            blankText :'请输入原口令',
        },{
            name : 'password',
            inputType : 'password',
            fieldLabel : '<span class="form_require_symbol">*</span>新口令',
            emptyText : '请输入新口令',
            blankText : '请输入新口令',
        },{
            name : 'repeatPassword',
            inputType : 'password',
            fieldLabel : '<span class="form_require_symbol">*</span>新口令确认',
            emptyText : '请再次输入新口令',
            blankText : '请再次输入新口令',
        }],

    buttons: [{
        text: '  确  定  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'showResultText1'
        }

    }]
});
