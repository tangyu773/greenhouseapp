/**
 *  系统用户修改界面
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.view.system.user.UserEdit',{
    extend: 'Ext.window.Window',
    alias: 'widget.system_user_UserEdit',
    autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 500,//窗体宽度
    height : 230,//窗体高度
    resizable: false,
    iconCls: 'editIcon',
    title: '修改用户',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
    buttonAlign :'center',
	controller : 'system_user_User',
	viewModel : {
		type : 'system_user_User'
	},
    items:[{
        xtype : 'form',//Form表单
        layout : 'column',//列布局
        autoScroll : true,	//是否添加滚动条
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
            maxLength : 32
        },
        items:[{
        	xtype : 'hiddenfield',
        	name: 'account'
        },{
			name : 'account',
			fieldLabel : '<span class="form_require_symbol">*</span>账号',
            disabled : true,
			emptyText : '请输入账号',
			blankText : '账号不能为空'
		},{
			name : 'username',
			fieldLabel : '<span class="form_require_symbol">*</span>用户名称',
			emptyText : '请输入用户名称',
			blankText : '用户名称不能为空'
		},{
		    name : 'user_type',
			xtype : 'combo',
			mode : 'local',
			fieldLabel : '<span class="form_require_symbol">*</span>用户类型',
			selectOnFocus : false,
            disabled : true,
            editable:false,
			emptyText : '请选择用户类型',
			valueField : 'value',
			displayField : 'text',
			store : just.ST_SYSUSER_TYPE
		},{
			name : 'roleid',
			xtype : 'combo',
			mode : 'local',
			fieldLabel : '<span class="form_require_symbol">*</span>角色名称',
			selectOnFocus : false,
            editable:false,
            disabled : true,
			emptyText : '请选择角色',
			valueField : 'roleid',
			displayField : 'rolename',
			bind : {
			    store : '{RoleGrid}'
		    }
		},{
		    name : 'status',
			xtype : 'combo',
			mode : 'local',
			fieldLabel : '<span class="form_require_symbol">*</span>状态',
			selectOnFocus : false,
            editable:false,
			emptyText : '请选择用户状态',
			valueField : 'value',
			displayField : 'text',
			store : just.ST_CUR_STATUS
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
    }]
});