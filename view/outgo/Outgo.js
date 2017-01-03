Ext.define('Admin.view.outgo.Outgo', {
	extend : 'Ext.container.Container',
	xtype : 'outgo_outgo',
	title : '出库管理',
	requires: [
		'Admin.view.outgo.OutgoController',
		'Admin.view.outgo.OutgoAdd',
		'Admin.view.main.Window',
		'Admin.view.outgo.OutgoViewModel',
		'Admin.store.outgo'
		/*'Admin.view.outgo.OutgoViewModel',
		'Admin.store.system.contact.Contact'*/
    ],
	controller : 'outgo_controller',
	name:'outgo_outgo',
	reference: 'outgo_outgo',
	viewModel : {
		type: 'outgo_outgo'
	},
	cls: 'shadow-panel',
//	itemId : 'batch_batch',
	// 列表布局
	layout : 'column',
	listeners: {
       render: '_loadData'
    },
    items: [{
    	title : '产品流通表',
    	columnWidth : 1.0,
        xtype: 'grid',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{outgo}'
		 },
		 viewConfig : {
			enableTextSelection:true  ,
			 stripeRows: true
		 },

		 defaults : {
           width:160
        },
	    forceFit: true,

	    columnLines:true,
	    columns : [{
                xtype: 'rownumberer'
            }, {
		dataIndex : 'corpid',
		text : '企业',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('corpname');
		}

	}, {
		dataIndex : 'corporderid',
		text : '出货单号',
		align: "center",


	}, {
		dataIndex : 'code_lv',
		text : '身份码',
		align: "center",
		width:120


	}, {
		dataIndex : 'actdate',
		text : '出货时间',
		align: "center",
		width:160,


	}, {
		dataIndex : 'packlayer',
		text : '包装级别',
		align: "center",


	}
    ],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ {
                        xtype : 'button',
                        action:'add',
                        ui: 'soft-blue',
                        width:150,
                        text : '上传出库文件',
                        iconCls : 'x-fa fa-cloud-upload',
                        listeners: {
                        click: 'onuseraddClick'
                        }
                    },'| ',{
                    	xtype : 'form',
        name :'outgo_search_form',
        layout : 'column',// 列布局
		margin : '0 0 0 0',
		defaultType : 'textfield',// 默认的Form表单组件
		defaults : {
		labelWidth : 60,
		labelAlign : 'right',
		//columnWidth : 0.15,// 列宽百分百
		padding : '0 0 0 0',// 行列间距
		selectOnFocus : true,// 选中所有内容
		allowBlank : true,
        height: 25,
		minLength : 0,
		maxLength : 30
	},
	items : [
{
	name : 'corporderid',
	fieldLabel : '<span style="font-weight:bold">出货单号</span>',
	emptyText : '请输入出货单号',
	width:240,
	blankText : '出货单号不能为空'
},
		{
			xtype: 'datefield',
            fieldLabel: '出库日期',
            name: 'st_date',
            emptyText : '请输入开始日期',
            width:200,
            value: Ext.Date.add(new Date(), Ext.Date.DAY,-7),
            format:'Y-m-d'
		},{
			xtype: 'datefield',
            fieldLabel: '结束日期',
            name: 'et_date',
            emptyText : '请输入结束日期',
            width:200,

            value: new Date(),
            format:'Y-m-d'
		},{
            xtype: 'button',
            iconCls: 'icon-search',
            text : '搜索',
            action: 'search',
            width:80,
            margin: '0 0 0 20',
            columnWidth : 0.15,
            listeners: {
                        click: '_loadData'
                        }
        },{
                    	xtype: 'button',
                            iconCls: 'icon-download-alt',
                            text : '下载出库模板',
                            action: 'search',
                            width:130,
                            margin: '0 0 0 10',
                            columnWidth : 0.15,
                            listeners: {
                                        click: '_onDownloadtemple'
                                        }

                    }]


                    }/*,'| ',{
                    	xtype : 'button',
                        ui: 'soft-blue',
                        text : '导   出',
                        width:80,
                        iconCls : 'fa fa-align-left fa-sign-out ',
                        listeners: {
                        click: 'onorderexport'
                        }

                    }*/]
                }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{outgo}'
		}
	} ],

	}],
	margin : '10 10 5 10'
});
