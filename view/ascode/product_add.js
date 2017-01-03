Ext.define('Admin.view.ascode.product_add', {
	extend : 'Ext.window.Window',
	alias : 'widget.ascodeproductadd',
	_flag:undefined,
	//id : 'product_ProductAdd_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width : 500,//窗体宽度
    height : 300,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title : '添加产品',
    constrain : true,//是否限制窗口超出浏览器
    plain : true,	//是否设置窗口透明背景
    bodyPadding : '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll : true,	//是否添加滚动条
		listeners: {
			 //close: '_onLoadBaseData'
		},
    controller : 'ascode_controller',
	viewModel : {
		type : 'ascode_ascode'
	},
	items:[{

			xtype: 'form',
			border: false,
			layout: 'column',
			defaultType: 'textfield',
			columnWidth : 1,
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
				name : 'productcode',
				fieldLabel : '<span class="form_require_symbol">*</span>商品条码',
				emptyText : '请输入商品条码',
				blankText : '商品条码不能为空',
				maxLength : 13
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
			} , {
				columnWidth : 1,
				xtype: 'filefield',
				fieldLabel : '使用说明',
				labelAlign : 'right',
				labelWidth : 70,
				hidden:true,
				name: 'upload',
				allowBlank:true,
				action : 'upload_image',
				emptyText : '图片类型*.png,*.jpg',
				maxLength : 128,
				buttonText: '选择图片',
				listeners : {
					change : just.util.uploadImgCheck
				}
			},
			{
					xtype: 'numberfield',
				name : 'cascade3',
				minValue : 0,
				columnWidth : 0.5,
				step: 1,
				padding :'0',
				value : 0,
				labelWidth: 175,
				fieldLabel: '包装比例(三级：二级：一级)',
				labelAlign: 'left',
				allowBlank: false

			},{
				xtype: 'numberfield',
				name : 'cascade2',
				padding :'0',
				labelWidth: 15,
				labelSeparator :'',
				minValue : 0,
				step: 10,
				value : 0,
				fieldLabel: '：',
				columnWidth : 0.2,
				labelAlign: 'left',
				allowBlank: false
					},{
						xtype: 'numberfield',
						name : 'cascade1',
						labelWidth: 15,
						minValue : 0,
						padding :'0',
						step: 100,
						labelSeparator :'',
						columnWidth : 0.2,
						value : 0,
						fieldLabel: '：',
						labelAlign: 'left',
						allowBlank: false
					}
		],
			buttons: [{
        text: '  确  定  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onaddproduct'
        }

    }]

	}]




});
