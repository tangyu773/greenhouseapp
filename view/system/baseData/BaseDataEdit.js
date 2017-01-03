Ext.define('Admin.view.system.baseData.BaseDataEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.system_baseData_BaseDataEdit',
	id : 'system_baseData_BaseDataEdit_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 360,//窗体宽度
//    height : 290,//窗体高度
    resizable: false,
    iconCls: 'editIcon',
    title : '修改基础参数',
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
			labelWidth : 75,
			labelAlign : 'right',
			columnWidth : 1,
			padding : '0 15 20 10',
			allowBlank : false,
			minLength : 0,
			maxLength : 32
		},
		items : [ {
			xtype : 'hiddenfield',
			name : 'paramid',
		}, {
			xtype : 'hiddenfield',
			name : 'module',
		}, {
			xtype : 'hiddenfield',
			name : 'paramname',
		}, {
			name : 'descrip',
			fieldLabel : '<span class="form_require_symbol">*</span>参数名',
			emptyText : '请选择参数名',
			blankText : '参数名不能为空',
			readOnly : true,
			fieldStyle: 'background:#F7F7F7;',
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
		}, {
            name:'useflag',
            xtype:'combo',
            mode:'local',
            fieldLabel: '<span class="form_require_symbol">*</span>参数状态',
            editable:false,
            selectOnFocus:false,
            emptyText : '请选择状态',
            valueField:'value',
            displayField:'text',
            value:1,
            store:just.ST_CUR_STATUS1
        } ],
        buttonAlign : 'center',
    	buttons : [{
    		text : '保存',
    		disabled: true,
      		formBind: true,
    		action : 'save'
    	}]
	}],
	
});

