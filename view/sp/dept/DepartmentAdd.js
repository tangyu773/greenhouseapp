Ext.define('Admin.view.sp.dept.DepartmentAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.sp_dept_DepartmentAdd',
	id : 'sp_dept_DepartmentAdd_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 640,//窗体宽度
    height : 200,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title : '添加部门',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
	
    controller : 'sp_dept_Department',
	viewModel : {
		type : 'sp_dept_Department'
	},
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType : 'textfield',
		margin: '5 0 0 0',
		defaults : {
			labelWidth : 65,
			labelAlign : 'right',
			columnWidth : 0.5,
			padding : '15 15 10 10',
			allowBlank : true,
			minLength : 0,
			maxLength : 16
		},
		items : [ {
			name : 'departname',
			fieldLabel : '<span class="form_require_symbol">*</span>部门名称',
			emptyText : '请输入部门名称',
			blankText : '部门名称不能为空',
			allowBlank : false,
			maxLength : 128
		}, {
			xtype: 'treepicker',
			name : 'parentid',
			fieldLabel : '<span class="form_require_symbol">*</span>上级部门',
			allowBlank : false,
			emptyText : '请选择上级部门',
			blankText : '上级部门不能为空',
			selectOnFocus : false,
			editable : false,
			rootVisible : true,
			valueField : 'id',
			displayField : 'text',
			store : Ext.create('Admin.store.sp.dept.Department')
		},{
			name : 'contacts',
			fieldLabel : '联系人',
			emptyText : '请输入联系人',
		}, {
			name : 'telno',
			fieldLabel : '联系电话',
			emptyText : '请输入联系电话',
//			vtype : 'phone'
		} ]
	}],
	

	buttonAlign : 'center',
	buttons : [{
		text : '保存',
		action : 'save'
	} , {
		margin : ' 0 0 0 15',
		text : '重置',
		action : 'reset',
		handler : function(btn){
			btn.up('window').down('form').reset();
		}
	}]
	
});

