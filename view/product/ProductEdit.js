Ext.define('Admin.view.product.ProductEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.product_ProductEdit',
	id : 'product_ProductEdit_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 800,//窗体宽度
    height : 480,//窗体高度
    resizable: false,
    iconCls: 'editIcon',
    title : '修改产品',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
	
    controller : 'product_Product',
	viewModel : {
		type : 'product_Product'
	},
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType : 'textfield',
		autoScroll : true,
		items:[{
			xtype: 'form',
			border: false,
			layout: 'column',
			defaultType: 'textfield',
			columnWidth : 0.5,
			margin : '10 0 0 0',
			defaults: {
				labelWidth: 65,
				labelAlign: 'right',
				columnWidth : 1,
				padding : '5 10 10 5',
				allowBlank: false,
				minLength: 0,
	    		maxLength: 16
			},
			items: [ {
				xtype: 'hidden',
				name: 'corpid'
			}, {
				name : 'productcode',
				fieldLabel : '<span class="form_require_symbol">*</span>商品条码',
				emptyText : '请输入商品条码',
				blankText : '商品条码不能为空',
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
				maxLength : 13,
				regex : /^\d*$/,
				regexText : '请输入数字',
			}, {
				name : 'prodname',
				fieldLabel : '<span class="form_require_symbol">*</span>产品名称',
				emptyText : '请输入产品名称',
				blankText : '产品名称不能为空',
				maxLength : 64
			}, {
				name : 'approval',
				fieldLabel : '<span class="form_require_symbol">*</span>产品批文',
				emptyText : '请输入批文',
				blankText : '批文不能为空',
				maxLength : 32
			}, {
				xtype : 'numberfield',
				minValue : 0,
				name : 'cascade3',
				fieldLabel : '<span class="form_require_symbol">*</span>包装比例',
				columnWidth : 0.4,
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
			}, {
				xtype : 'numberfield',
				minValue : 0,
				name : 'cascade2',
				fieldLabel : '：',
				labelSeparator : '',
				labelWidth: 15,
				columnWidth : 0.3,
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
			}, {
				xtype : 'numberfield',
				minValue : 0,
				name : 'cascade1',
				fieldLabel : '：',
				labelSeparator : '',
				labelWidth: 15,
				columnWidth : 0.3,
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
			}, {
				xtype : 'label',
				text : '(三级包装数  : 二级包装数  : 一级包装数)',
				margin : '0 0 0 65'
			} ]
		}, {
			xtype: 'form',
			border: false,
			layout: 'column',
			columnWidth : 0.5,
			margin : '10 0 0 0',
			defaults : {
				padding : '5 10 10 0',
				allowBlank : true
			},
			items: [ {
			    margin: '0 0 0 75',
				xtype : 'image',
				name : 'image',
				id : 'productEdit_image_id',
				title : '点击显示大图',
				height : 155,
				columnWidth : 1,
				src : just.rootPath()+'/resources/images/spinfo_default_logo.jpg'
			}, {
				columnWidth : 1,
				xtype: 'filefield',
				fieldLabel : '使用说明',
				labelAlign : 'right',
				labelWidth : 70,
				name: 'upload',
				action : 'upload_image',
				emptyText : '图片类型*.png,*.jpg',
				maxLength : 128,
				buttonText: '选择图片',
				listeners : {
					change : just.util.uploadImgCheck
				}
			} ]
		}, {
			xtype: 'form',
			border: false,
			layout: 'column',
			defaultType: 'textfield',
			columnWidth : 1,
			defaults: {
				labelWidth: 65,
				labelAlign: 'right',
				padding : '5 10 10 5',
				columnWidth : 0.5,
				allowBlank: true,
				minLength: 0,
	    		maxLength: 16
			},
			items : [{
				name : 'packagespec',
				fieldLabel : '包装内容',
				emptyText : '请输入包装内容',
				allowBlank : true,
				maxLength : 50
			}, {
				name : 'saleprice',
				value : 0,
				fieldLabel : '建议售价',
				emptyText : '请输入建议零售价',
				blankText : '建议零售价不能为空',
				regex : /\d+(.\d+)?/,
				regexText : '请输入正格价格格式,如10.0',
				allowBlank : true
			}, {
				name : 'comment',
				fieldLabel : '产品标注',
				emptyText : '请输入标注',
				blankText : '标注不能为空',
				maxLength : 20,
			}, {
				xtype : 'combo',
				name : 'subtypeno',
				fieldLabel : '<span class="form_require_symbol">*</span>产品分类',
				emptyText : '请选择产品分类',
				allowBlank : false,
				editable : false,
				mode : 'local',
				store : Ext.create('Admin.store.system.baseData.BaseData'),
				maxLength : 20,
				displayField : 'paramval',
				valueField : 'paramval'
			}, {
				xtype : 'combo',
				name : 'cls1',
				fieldLabel : '所属大类',
				emptyText : '请选择所属大类',
				editable : false,
				mode : 'local',
				store : Ext.create('Admin.store.system.baseData.BaseData'),
				displayField : 'paramval',
				valueField : 'paramval'
			}, {
				xtype : 'combo',
				name : 'cls2',
				fieldLabel : '所属小类',
				emptyText : '请选择所属小类',
				editable : false,
				mode : 'local',
				store : Ext.create('Admin.store.system.baseData.BaseData'),
				displayField : 'paramval',
				valueField : 'paramval'
			}, {
				name : 'dosageform',
				fieldLabel : '产品剂型',
				emptyText : '请输入产品剂型',
			}, {
				xtype : 'numberfield',
				value : 0,
				minValue : 0,
				name : 'dose',
				fieldLabel : '产品剂量',
				emptyText : '请输入产品剂量',
			}, {
				xtype : 'combo',
				name : 'usetype',
				fieldLabel : '服用类型',
				emptyText : '请选择服用类型',
				editable : true,
				mode : 'local',
				store : Ext.create('Admin.store.system.baseData.BaseData'),
				displayField : 'paramval',
				valueField : 'paramval'
			}, {
				name : 'timesday',
				fieldLabel : '服用次数',
				emptyText : '请输入服用次数',
			}, {
				xtype : 'combo',
				name : 'storage',
				fieldLabel : '保存方式',
				emptyText : '请输入选择保存方式',
				editable : false,
				mode : 'local',
				store : Ext.create('Admin.store.system.baseData.BaseData'),
				displayField : 'paramval',
				valueField : 'paramval'
			}, {
				xtype : 'checkbox',
				name : 'verifyflag',
				fieldLabel : '是否支持有奖举报',
				labelWidth : 115,
			}, {
				xtype : 'textarea',
				name : 'ingredients',
				fieldLabel : '产品成分',
				emptyText : '请输入产品成分',
				columnWidth : 1,
				maxLength : 256,
				height : 70
			}, {
				xtype : 'textarea',
				name : 'functions',
				fieldLabel : '主治功能',
				emptyText : '请输入主治功能',
				columnWidth : 1,
				maxLength : 256,
				height : 70
			}, {
				xtype : 'checkbox',
				name : 'reactions_limit',
				conlumnWidth : 1,
				fieldLabel : 'APP端是否显示以下项',
				labelWidth : 160,
			}, {
				xtype : 'textarea',
				name : 'reactions',
				fieldLabel : '不良反应',
				emptyText : '请输入不良反应',
				columnWidth : 1,
				maxLength : 128,
				height : 60
			}, {
				xtype : 'checkbox',
				name : 'interaction_limit',
				conlumnWidth : 1,
				fieldLabel : 'APP端是否显示以下项',
				labelWidth : 160,
			}, {
				xtype : 'textarea',
				name : 'interaction',
				fieldLabel : '药物相&nbsp;<br>互作用',
				emptyText : '请输入药物相互作用',
				columnWidth : 1,
				maxLength : 128,
				height : 60
			}, {
				xtype : 'checkbox',
				name : 'contraindication_limit',
				conlumnWidth : 1,
				fieldLabel : 'APP端是否显示以下项',
				labelWidth : 160,
			}, {
				xtype : 'textarea',
				name : 'contraindication',
				fieldLabel : '禁忌',
				emptyText : '请输入禁忌',
				columnWidth : 1,
				maxLength : 128,
				height : 60
			}, {
				xtype : 'combo',
				name : 'stateid',
				fieldLabel : '状态',
				emptyText : '请选择状态',
				editable : false,
				mode : 'local',
				store : just.ST_PRODUCT_STATE,
				displayField : 'text',
				valueField : 'value',
				listeners:{
		            'render':function(utc, eOpts ) {
						var loginInfo = just.data.user.loginInfo;
						if (loginInfo.roleid < 3) {   
							  utc.setVisible(false);
						} 
					}
		        }
			} ]
		}]
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

