Ext.define('Admin.view.system.module.ModuleAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.system_module_ModuleAdd',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor',
        'Ext.ux.TreePicker'
    ],
   controller : 'system_module_Module',
    viewModel : {
        type : 'system_module_Module'
    },


    cls: 'email-compose',
    baseCls:'x-plain',
    layout : 'column',//列布局
        autoScroll : true,  //是否添加滚动条
        defaultType : 'textfield',//默认的Form表单组件
        baseCls:'x-plain',
        defaults: {
            labelWidth : 75,
            labelAlign : 'right',
            columnWidth : 0.5,//列宽百分百
            padding: '10',//行列间距
            selectOnFocus : true,//选中所有内容
            allowBlank : false,
            minLength : 0,
            maxLength : 60
        },


    width : 700,//窗体宽度


    items: [

    {
            name : 'text',
            fieldLabel : '<span class="form_require_symbol">*</span>模块名称',
            emptyText : '请输入菜单名称',
            blankText : '菜单名称不能为空'
        },{
            name : 'compoment',
            fieldLabel : '组件名称',
            emptyText : '请输入组件control路径',
            allowBlank: true
        },{
            xtype: 'numberfield',
            name : 'msort',
            fieldLabel : '<span class="form_require_symbol">*</span>模块排序',
            minValue : 1,
            value : 1
        },{
            name:'status',
            xtype:'combo',
            mode:'local',
            fieldLabel: '<span class="form_require_symbol">*</span>组件状态',
            editable:false,
            selectOnFocus:false,
            emptyText : '请选择状态',
            valueField:'value',
            displayField:'text',
            value:1,
            store:just.ST_CUR_STATUS1
        },{
            name : 'moduleurl',
            fieldLabel : '相关路径',
            emptyText : '请输入URL',
            allowBlank:true
        },{
        	name : 'param',
            fieldLabel : '模块参数',
            emptyText : '请输入模块参数',
            allowBlank : true
        },
        /*{
            xtype:'combobox',
            name : 'param',
            fieldLabel : '模块参数',
            emptyText : '选择模块参数',
            selectOnFocus : false,
            editable:true,
//            editable:false,
            store:just.ST_MODULE,
            queryMode: 'local',
            displayField: 'text',
            valueField: 'value',
            allowBlank:true
        },*/{
            name : 'iconCls',
            fieldLabel : '图标',
            emptyText : '请输入图标',
            allowBlank:true
        },{
            xtype: 'treepicker',
            name : 'pid',
            fieldLabel: '<span class="form_require_symbol">*</span>父级菜单',
            emptyText : '请选择父级菜单',
            blankText : '父级菜单不能为空',
            selectOnFocus : false,
            editable:false,
            rootVisible:true,
            valueField: 'id',
            displayField: 'text',
            store: Ext.create('Admin.store.system.module.ModuleTree')
           /* bind : {
                store : '{ModuleTreeGrid}'
             }*/
        }

    ],

    buttons: [{
        text: '  确  定  ',
        action : 'save',
        iconCls : 'saveIcon',
        disabled: true,
        formBind: true
    }]
});
