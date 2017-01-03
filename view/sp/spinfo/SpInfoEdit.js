Ext.define('Admin.view.sp.spinfo.SpInfoEdit', {
	extend : 'Ext.form.Panel',
	alias : 'widget.sp_spinfo_SpInfoEdit',
	id : 'sp_spinfo_SpInfoEdit_Panel',
	layout : 'column',
	title : '企业详细信息',
	viewModel : {
		type : 'sp_spinfo_SpInfo'
	},

	defaultType : 'textfield',
	defaults : {
		labelWidth : 80,
		labelAlign : 'right',
		columnWidth : 1,
		padding : '10 5 5 0',
		allowBlank : true,
		minLength : 0,
		maxLength : 16
	},
	items : [{
		xtype : 'hiddenfield',
		name : 'compid',
		value:0,
	}, {
		xtype : 'hiddenfield',
		name : 'catalog',
	}, {
		name : 'compname',
		fieldLabel : '<span class="form_require_symbol">*</span>企业名称',
		emptyText : '请输入企业名称',
		blankText : '企业名称不能为空',
		allowBlank : false,
		columnWidth : 1,
		maxLength : 64
	}, {
		name : 'comptelno',
		fieldLabel : '<span class="form_require_symbol">*</span>企业电话',
		emptyText : '请输入企业电话',
		blankText : '企业电话不能为空',
		allowBlank : false,
		vtype : 'phone'
	}, {

		name : 'compfaxno',
		fieldLabel : '传真号码',
		emptyText : '请输入传真号码',
	}, {

		name : 'compcontact',
		fieldLabel : '联系人',
		emptyText : '请输入联系人',
	}, {

		name : 'compcontactmobile',
		fieldLabel : '联系人电话',
		emptyText : '请输入联系人电话',

	 }//, {
	// 	columnWidth : 1.0,
	// 	xtype: 'filefield',
	// 	fieldLabel : '企业简介',
	// 	name: 'upload',
	// 	action : 'upload_image',
	// 	emptyText : '图片类型*.png,*.jpg',
	// 	maxLength : 128,
	// 	buttonText: '选择图片',
	// 	listeners : {
	// 		change : just.util.uploadImgCheck
	// 	}
	// }, {
  //       margin: '0 0 0 75',
	// 	xtype : 'image',
	// 	name : 'image',
	// 	id : 'spinfoEdit_image_id',
	// 	title : '点击显示大图',
	// 	height : 170,
	// 	columnWidth : 1.0,
	// 	src : just.rootPath()+'/resources/images/spinfo_default_logo.jpg',
	// }
],

	buttonAlign : 'center',
	buttons : [{
		text : '保存',
		action : 'save'
	} /*, {
		margin : ' 0 0 0 15',
		text : '重置',
		action : 'reset',
		handler : function(btn){
			btn.up('form').reset();
		}
	}*/]

});
