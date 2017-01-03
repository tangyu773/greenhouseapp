/**
 * 系统用户添加界面 Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.email.UserAdd', {
	extend : 'Ext.form.Panel',
	alias : 'widget.userAdd',
	requires : [ 'Ext.button.Button', 'Ext.form.field.Text',
			'Ext.form.field.File', 'Ext.form.field.HtmlEditor' ],
	id : 'userAdd',
	viewModel : {
		type : 'system_user_User'
	},
	reference : 'userAdd',
	controller : 'system_user_User',
	_flag : true,
	cls : 'email-compose',

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	bodyPadding : 10,
	scrollable : true,
	// //bodyPadding: 10,
	// scrollable:true,
	width : 355,
	fieldDefaults : {
		labelAlign : 'right',
		labelWidth : 70,
		msgTarget : 'side',
		msgTarget : 'under'
	},
	listeners: {  beforerender: '_inituseraddView'  },

	/*
	 * defaults: { labelWidth: 60, xtype: 'textfield', labelSeparator: '' },
	 */

	items : [{
		xtype : 'fieldset',
		title : '用户信息',
		defaultType : 'textfield',
		defaults : {
			anchor : '100%'
		},
		items : [ {
			allowBlank : false,
			fieldLabel : '<span class="form_require_symbol">*</span>账号',
			name : 'staff_id',
			vtype : 'positiveNumber',
			vtypeText : '请输入正整数作为账号'
		}, {
			allowBlank : false,
			fieldLabel : '<span class="form_require_symbol">*</span>姓名',
			name : 'usrname',
		}, {
			allowBlank : true,
			fieldLabel : '电话',
			name : 'mobilenum',
		}, {
			allowBlank : true,
			fieldLabel : '邮箱',
			name : 'email',
			vtype : 'email',
			msgTarget : 'under'
		}, {
			name : 'roleid',
			xtype : 'combo',
			mode : 'local',
			fieldLabel : '<span class="form_require_symbol">*</span>角色名称',
			selectOnFocus : false,
			editable : false,
			allowBlank : false,
			emptyText : '请选择角色',
			valueField : 'roleid',
			displayField : 'roledes',
			bind : {
				store : '{RoleGrid}'
			}
		}, {
			xtype : 'combo',
			name : 'compid',
			fieldLabel : '<span class="form_require_symbol">*</span>所属企业',
			selectOnFocus : false,
			editable : true,
			allowBlank : false,
			emptyText : '请输入企业名称',
			blankText : '企业名称不能为空',
			mode : 'local',
			store : Ext.create('Admin.store.sp.spinfo.SpInfo'),
			valueField : 'compid',
			displayField : 'compname'
		}, {
			xtype : 'radiogroup',
			name : 'useflag',
			fieldLabel : '启用标识',
			cls : 'x-check-group-alt',
			items : [ {
				boxLabel : '启用',
				name : 'useflag',
				inputValue : 1,
				checked : true
			}, {
				boxLabel : '禁用',
				name : 'useflag',
				inputValue : 0
			},

			]
		}

		]
	}

	],

	buttons : [ {
		text : '  确  定  ',
		disabled : true,
		formBind : true,
		listeners : {
			click : 'onusersaveClick'
		}

	} ]
});
