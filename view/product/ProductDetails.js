Ext.define('Admin.view.product.ProductDetails', {
	extend : 'Ext.window.Window',
	alias : 'widget.product_ProductDetails',
	id : 'product_ProductDetails_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 800,//窗体宽度
    height : 480,//窗体高度
    resizable: false,
    iconCls : 'icon-comment',
    title : '产品详情',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
	
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
				allowBlank: true,
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
				minLength: 0,
//	    		maxLength: 16
			},
			items: [ {
				name : 'productcode',
				fieldLabel : '<span class="form_require_symbol">*</span>商品条码',
				maxLength : 13
			}, {
				name : 'prodname',
				fieldLabel : '<span class="form_require_symbol">*</span>产品名称',
				maxLength : 64
			},  {
				name : 'approval',
				fieldLabel : '<span class="form_require_symbol">*</span>产品批文',
				maxLength : 32
			}, {
				name : 'staffid',
				fieldLabel : '操作员工'
			}, {
				name : 'createtime',
				fieldLabel : '建立时间',
				maxLength : 32
			}]
		}, {
			xtype: 'form',
			border: false,
			layout: 'column',
			columnWidth : 0.5,
			margin : '10 0 0 0',
			defaults : {
				padding : '5 10 10 0',
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
				allowBlank : true
			},
			items: [ {
			    margin: '0 0 0 75',
				xtype : 'image',
				name : 'image',
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
				readOnly : true,
				fieldStyle: 'background:#F7F7F7;',
				minLength: 0,
	    		maxLength: 16
			},
			items : [ {
				xtype : 'numberfield',
				value : 1,
				minValue : 0,
				name : 'cascade3',
				fieldLabel : '<span class="form_require_symbol">*</span>包装比例',
				columnWidth : 0.2
			}, {
				xtype : 'numberfield',
				value : 1,
				minValue : 0,
				name : 'cascade2',
				fieldLabel : '：',
				labelSeparator : '',
				labelWidth: 15,
				columnWidth : 0.15
			}, {
				xtype : 'numberfield',
				value : 1,
				minValue : 0,
				name : 'cascade1',
				fieldLabel : '：',
				labelSeparator : '',
				labelWidth: 15,
				columnWidth : 0.15
			}, {
				name : 'packagespec',
				fieldLabel : '包装内容',
				maxLength : 50
			}, {
				xtype : 'label',
				text : '(三级包装数  : 二级包装数  : 一级包装数)',
				margin : '0 0 0 65'
			}, {
				name : 'saleprice',
				fieldLabel : '建议售价',
			}, {
				name : 'comment',
				fieldLabel : '产品标注',
				maxLength : 20,
			}, {
				name : 'subtypeno',
				fieldLabel : '<span class="form_require_symbol">*</span>产品分类',
				maxLength : 20
			}, {
				name : 'cls1',
				fieldLabel : '所属大类',
			}, {
				name : 'cls2',
				fieldLabel : '所属小类',
			}, {
				name : 'dosageform',
				fieldLabel : '产品剂型',
				allowBlank : true,
			}, {
				name : 'dose',
				fieldLabel : '产品剂量',
			}, {
				name : 'usetype',
				fieldLabel : '服用类型',
			}, {
				name : 'timesday',
				fieldLabel : '服用次数',
			}, {
				name : 'storage',
				fieldLabel : '保存方式',
			}, {
				xtype : 'checkbox',
				name : 'verifyflag',
				fieldLabel : '是否支持有奖举报',
				labelWidth : 115,
			}, {
				xtype : 'textarea',
				name : 'ingredients',
				fieldLabel : '产品成分',
				columnWidth : 1,
				maxLength : 256,
				height : 70
			}, {
				xtype : 'textarea',
				name : 'functions',
				fieldLabel : '主治功能',
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
				columnWidth : 1,
				maxLength : 128,
				height : 60
			} ]
		}]
	}],
	

	buttonAlign : 'center',
	buttons : [ {
		text : '关闭',
		handler : function(btn){
			btn.up('window').close();
		}
	}]
	
});


