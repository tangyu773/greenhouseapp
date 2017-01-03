Ext.define('Admin.view.agency.AgencyEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.agency_AgencyEdit',
	id : 'agency_AgencyEdit_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 640,//窗体宽度
    height : 400,//窗体高度
    resizable: false,
    iconCls: 'editIcon',
    title : '修改经销商',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
	
    controller : 'agency_Agency',
	viewModel : {
		type : 'agency_Agency'
	},
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType : 'textfield',
		margin: '5 0 0 0',
		defaults : {
			labelWidth : 75,
			labelAlign : 'right',
			columnWidth : 0.5,
			padding : '15 15 10 10',
			allowBlank : true,
			minLength : 0,
			maxLength : 16
		},
		items : [ {
			xtype: 'hiddenfield',
			name: 'agencyid'
		}, {
			name : 'agencyname',
			fieldLabel : '<span class="form_require_symbol">*</span>经销商名称',
			emptyText : '请输入经销商名称',
			blankText : '经销商名称不能为空',
			allowBlank : false,
			columnWidth : 1,
			maxLength : 64
		}, {
			name : 'agencyaddress',
			fieldLabel : '<span class="form_require_symbol">*</span>经销商地址',
			emptyText : '请输入经销商名称地址',
			blankText : '经销商名称地址不能为空',
			maxLength : 255,
			columnWidth : 1,
			allowBlank : false
		}, {
			name : 'phone',
			fieldLabel : '<span class="form_require_symbol">*</span>联系电话',
			emptyText : '请输入联系电话',
			blankText : '联系电话不能为空',
			allowBlank : false,
//			vtype : 'phone'
		}, {
			name : 'fax',
			fieldLabel : '传真号码',
			emptyText : '请输入传真号码',
		}, {
			name : 'contacts',
			fieldLabel : '<span class="form_require_symbol">*</span>联系人',
			emptyText : '请输入联系人',
			blankText : '联系人不能为空',
			allowBlank : false,
		}, {
			name : 'connum',
			fieldLabel : '联系人电话',
			emptyText : '请输入联系人电话',
		}, {
			name : 'website',
			fieldLabel : '公司网址',
			emptyText : '请输入公司网址',
			maxLength : 64,
			columnWidth : 1
		}, {
			name : 'email',
			fieldLabel : '邮箱',
			emptyText : '请输入邮箱',
			columnWidth : 1,
			maxLength : 64
		} ]
	}],
	

	buttonAlign : 'center',
	buttons : [{
		text : '保存',
		action : 'save'
	} /*, {
		margin : ' 0 0 0 15',
		text : '重置',
		action : 'reset',
		handler : function(btn){
			btn.up('window').down('form').reset();
		}
	}*/]
	
});

