/**
 * 新增角色
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.view.system.role.RoleAdd',{
    extend : 'Ext.window.Window',
    alias : 'widget.system_auth_RoleAdd',//视图别名
    autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 500,//窗体宽度
    height: 130,
    resizable: false,
    iconCls: 'addIcon',
    title: '添加角色',
    constrain : true,//是否限制窗口超出浏览器
    plain : false,  //是否设置窗口透明背景
    autoScroll : true,  //是否添加滚动条
    buttonAlign :'center',
    requires: [
         'Admin.view.system.role.RoleViewModel'
    ],
    controller : 'system_role_Role',
    viewModel : {
        type : 'system_role_Role'
    },
    items:[{
        xtype : 'form',//Form表单
        layout : 'column',//列布局
        autoScroll : true,  //是否添加滚动条
        defaultType : 'textfield',//默认的Form表单组件
        baseCls:'x-plain',
        defaults: {
            labelWidth : 70,
            labelAlign : 'right',
            columnWidth : 0.5,//列宽百分百
            padding: '10 10 10 10',//行列间距
            selectOnFocus : true,//选中所有内容
            allowBlank : false,
            minLength : 0,
            maxLength : 30
        },
        items:[{
            name : 'rolename',
            fieldLabel : '<span class="form_require_symbol">*</span>角色名称',
            emptyText : '请输入角色名称',
            blankText : '角色名称不能为空',
            maxLength : 50
         },{
            name : 'status',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '<span class="form_require_symbol">*</span>状态',
            editable: false, 
            selectOnFocus : false,
            emptyText : '请选择状态',
            valueField : 'value',
            displayField : 'text',
            value : 1,
            store : just.ST_CUR_STATUS1
        }]
    }],
    buttons : [{
        text : '保存',
        action : 'save',
        iconCls : 'saveIcon'
    },{
        text : '取消',
        iconCls : 'cancelIcon',
        handler : function(btn){
            var window = btn.ownerCt.ownerCt;
            window.close();
        }
    }],
    initComponent : function(){
        this.callParent(arguments);
    }
});