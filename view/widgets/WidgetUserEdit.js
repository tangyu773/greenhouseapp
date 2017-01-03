Ext.define('Admin.view.widgets.WidgetUserEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.widget_userEdit',
    autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 450,//窗体宽度
    resizable: false,
    layout : 'fit',//布局
    iconCls: 'editIcon',
    title:'修改账户',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 0',//表单边框 上内边距、右内边距、下内边距、左内边距
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor',
        'Ext.ux.TreePicker'
    ],
    controller : 'Widgets',
    items:[{
    	 xtype : 'form',//Form表单
         layout : 'column',//列布局
         autoScroll : true,  //是否添加滚动条
         defaultType : 'textfield',//默认的Form表单组件
//         baseCls:'x-plain',
         defaults: {
             labelWidth : 40,
             labelAlign : 'right',
             columnWidth : 1,//列宽百分百
             padding: '10',//行列间距
             selectOnFocus : true,//选中所有内容
             minLength : 0,
             maxLength : 32
         },
         items: [
                 {
         			allowBlank : false,
         			fieldLabel : '<span class="form_require_symbol">*</span>账号',
         			name : 'staff_id',
         			vtype : 'positiveNumber',
         			vtypeText : '请输入正整数作为账号',
         			readOnly: true,
         			fieldStyle: 'background:#F7F7F7;'
         		}, {
         			allowBlank : false,
         			fieldLabel : '<span class="form_require_symbol">*</span>姓名',
         			name : 'staffname',
         		}, {
         			allowBlank : true,
         			fieldLabel : '电话',
         			name : 'phone',
         		}, {
         			allowBlank : true,
         			fieldLabel : '邮箱',
         			maxLength : 64,
         			name : 'email',
         			vtype : 'email',
         			msgTarget : 'under'
         		}
         ],
         buttons: [{
         	text : '  确  定  ',
     		disabled : true,
     		formBind : true,
     		action : 'save',
     		listeners : {
    			click : 'saveUser',
    			scope: 'controller'
    		}
         }]
    }],
        
});
