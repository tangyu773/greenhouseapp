/**
 * 系统用户搜索界面
 * Created by xiaozou on 16-01-04
 * 
 */
Ext.define('Admin.view.system.user.UserSearch', {
	extend : 'Ext.form.Panel',
	alias: 'widget.system_user_UserSearch',
	name:'system_user_UserSearch',
	layout : 'column',// 列布局
	margin : '0 0 10 0',
	defaultType : 'textfield',// 默认的Form表单组件
	defaults : {
		labelWidth : 60,
		labelAlign : 'right',
		columnWidth : 0.18,// 列宽百分百
		padding : '0 0 0 0',// 行列间距
		selectOnFocus : true,// 选中所有内容
		allowBlank : true,
        height: 25,
		minLength : 0,
		maxLength : 30
	},
	items : [
		{
			name : 'account',
			fieldLabel : '<span style="font-weight:bold">账号</span>',
			emptyText : '请搜索账号',
			blankText : '账号不能为空'
		},{
			name : 'idcard',
			fieldLabel : '<span style="font-weight:bold">身份证</span>',
			emptyText : '',
			blankText : '身份证不能为空'
		},
 		{
            name:'status',
            xtype:'combo',
            mode:'local',
            fieldLabel: '状态',
            editable:false,
            selectOnFocus:false,
            emptyText : '请选择状态',
            valueField:'value',
            displayField:'text',
            store:just.ST_CUR_STATUS
        },
 		{
            name : 'role',
			xtype : 'combo',
			mode : 'local',
			fieldLabel : '角色名称',
			selectOnFocus : false,
            editable:true,
			emptyText : '请选择角色',
			valueField : 'roleid',
			displayField : 'roledes',
			bind : {
			    store : '{RoleGrid}'
		    }
        },{
            xtype: 'button',
            iconCls: 'icon-search',
            text : '搜索',
            action: 'search',
            margin: '0 0 0 5',
            columnWidth : 0.1
        }]
});
/*,{ 
            name:'user_type',
            xtype:'combo',
            mode:'local',
            fieldLabel: '用户类型',
            editable:false,
            selectOnFocus:false,
            emptyText : '请选择用户类型',
            valueField:'value',
            displayField:'text',
            store:just.ST_SYSUSER_TYPE,
			listeners:{
	            'render':function(utc, eOpts ) {
					var loginInfo = just.data.user.loginInfo;
					if (loginInfo.user_type == 1) {   
		                  utc.setVisible(false);
					}
				}
	        }
        }*/