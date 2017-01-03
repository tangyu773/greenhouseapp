Ext.define('Admin.view.system.baseData.BaseDataAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.system_baseData_BaseDataAdd',
//	id : 'system_baseData_BaseDataAdd_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 360,//窗体宽度
//    height : 240,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title : '添加基础参数',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
	
    controller : 'system_baseData_BaseData',
    viewModel : {
		type : 'system_baseData_BaseData'
	},
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType : 'textfield',
		margin: '20 0 0 0',
		defaults : {
			labelWidth : 65,
			labelAlign : 'right',
			columnWidth : 1,
			padding : '0 15 20 10',
			allowBlank : false,
			minLength : 0,
			maxLength : 32
		},
		items : [ {
			xtype : 'combo',
			name : 'module',
			fieldLabel : '<span class="form_require_symbol">*</span>模块名',
			emptyText : '请选择模块名',
			blankText : '模块名不能为空',
			editable : false,
			mode : 'local',
			store : Ext.create('Admin.store.system.baseData.BaseData'),
			displayField : 'text',
			valueField : 'value'
		}, {
			xtype : 'combo',
			name : 'paramname',
			disabled: true,
			fieldLabel : '<span class="form_require_symbol">*</span>参数名',
			emptyText : '请选择参数名',
			blankText : '参数名不能为空',
			editable : false,
			mode : 'local',
			store : Ext.create('Admin.store.system.baseData.BaseData'),
			displayField : 'text',
			valueField : 'value'
		}, {
			name : 'paramval',
			fieldLabel : '<span class="form_require_symbol">*</span>参数值',
			emptyText : '请输入参数值',
			blankText : '参数值不能为空',
			columnWidth : 1,
		}, {
			name : 'paramdes',
			fieldLabel : '<span class="form_require_symbol">*</span>参数描述',
			emptyText : '请输入参数描述',
			blankText : '参数描述不能为空',
		} ],
		buttonAlign: 'center',
		buttons: [{
			text: '确定',
			disabled: true,
	  		formBind: true,
	  		listeners: {
	  			click: '_onAddBaseData',
	  		}
		} ]
	}],

});

