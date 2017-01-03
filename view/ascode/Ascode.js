Ext.define('Admin.view.ascode.Ascode', {
	extend : 'Ext.container.Container',
	xtype : 'ascode_ascode',
	title : '身份码管理',
	requires: [
		'Admin.view.ascode.AscodeController',
		'Admin.view.ascode.AscodeAdd',
		'Admin.view.system.contact.Contact',
		'Admin.view.main.Window',
		'Admin.view.ascode.AscodeImport1',
		'Admin.view.ascode.AscodeViewModel',
		'Admin.store.system.contact.Contact',
		'Admin.store.product.Product',
		'Admin.view.ascode.AscodeBadlist',
        'Admin.view.ascode.product_add'

    ],
	controller : 'ascode_controller',
	name:'ascode_ascode',
	reference: 'ascode_ascode',
	viewModel : {
		type: 'ascode_ascode'
	},
	cls: 'shadow-panel',
	itemId : 'ascode_ascode',
	// 列表布局
	layout : 'column',
	listeners: {
       render: '_loadData'
    },
    items: [{

    	columnWidth : 1.0,
        xtype: 'grid',

        title : '身份码申请记录',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{ascodeGrid}'
		 },
		 viewConfig : {

			 stripeRows: true,
             enableTextSelection:true  ,
		 },

		 defaults : {
           width:160
        },
	    //forceFit: true,

	    columnLines:true,
	    columns : [{
                xtype: 'rownumberer'
            }, {
		dataIndex : 'reqid',
		text : '申请流水号',
		align: "center",
	}, {
		dataIndex : 'corpid',
		text : '申请企业',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('corpname');
		}

	}, {
		dataIndex : 'productcode',
		text : '商品名称',
		align: "center",
		width:120,
		renderer : function(v,m,r) {
			return r.get('prodname');
		}


	}, {
		dataIndex : 'staffid',
		text : '操作员',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('staffname');
		}

	}, {
		dataIndex : 'lv1_num',
		text : '一级码数量',
		align: "center",



	}, {
		dataIndex : 'lv2_num',
		text : '二级码数量',
		align: "center",


	}, {
		dataIndex : 'lv3_num',
		text : '三级码数量',
		align: "center",


	}, {
		dataIndex : 'lv1_filepath',
		text : '一级码文件',
		align: "center",
        renderer: function(value, metaData, record) {

                if(value=="" || value == undefined){
                    return "--";
                }else{
                    return "<a href='javascript:;' onclick=''>下载</a>";
                }

            },
            listeners: {
       click: '_onDownload1'
    },


	}, {
		dataIndex : 'lv2_filepath',
		text : '二级码文件',
		align: "center",
        renderer: function(value, metaData, record) {

                if(value=="" || value == undefined){
                    return "--";
                }else{
                    return "<a href='javascript:;' onclick=''>下载</a>";
                }

            },
            listeners: {
       click: '_onDownload2'
    },


	}, {
		dataIndex : 'lv3_filepath',
		text : '三级码文件',
		align: "center",
        renderer: function(value, metaData, record) {

                if(value=="" || value == undefined){
                    return "--";
                }else{
                    return "<a href='javascript:;' onclick=''>下载</a>";
                }

            },
            listeners: {
       click: '_onDownload3'
    },



	}, {
		dataIndex : 'type',
		text : '类型',
		align: "center",

	}, {
		dataIndex : 'reqdate',
		text : '申请日期',
		align: "center",
		width:150

	}, {
		dataIndex : 'des',
		text : '备注',
		align: "center",

	}/*,
    {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 90,
		align : "center",
        text: '下载身份码',
        items: [{
            iconCls: 'fa icon-download-alt fa-lg opear-button',
            action: 'update',
            tooltip: '下载一级码',
            handler: '_onDownload1'
        },{
            iconCls: 'fa icon-download-alt fa-lg opear-button',
            action: 'update',
            tooltip: '下载二级码',
            handler: '_onDownload2'
        },{
            iconCls: 'fa icon-download-alt fa-lg opear-button',
            action: 'update',
            tooltip: '下载三级码',
            handler: '_onDownload3'
        }]
    }*/],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ /*{
								xtype : 'button',
								text : '刷新',
								iconCls : 'icon-refresh',
								ui: 'soft-blue',
								width:65,
								listeners: {
			                        click: '_loadData'
			                        }
							},'|',*/{
                        xtype : 'button',
                        ui: 'soft-blue',
                        width:150,
                        text : '从本系统申请编码',
                        iconCls : 'fa fa-align-left fa-sign-out',
                        listeners: {
                        click: 'onuseraddClick'
                        }
                    } ,'|',{
                        xtype : 'button',
                        ui: 'soft-blue',
                        text : '药监网系统编码导入',
                        width:150,
                        iconCls : 'fa fa-align-left fa-sign-in',
                        listeners: {
                        click: 'onimportClick'
                        }
                    },'|',{
                    	xtype : 'form',
                        name :'ascodereq_search_form',
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
                	name : 'reqid',
                	fieldLabel : '<span style="font-weight:bold">流水号</span>',
                	emptyText : '请输入流水号',
                	width:180,
                	blankText : '流水号不能为空'
                },
                		{
                			xtype: 'datefield',
                            fieldLabel: '申请日期',
                            name: 'st_date',
                            emptyText : '请输入开始日期',
                            width:170,
                            value: Ext.Date.add(new Date(), Ext.Date.DAY,-7),
                            format:'Y-m-d'
                		},{
                			xtype: 'datefield',
                            fieldLabel: '结束日期',
                            name: 'et_date',
                            emptyText : '请输入结束日期',
                            width:170,

                            value: new Date(),
                            format:'Y-m-d'
                		},{
                            xtype: 'button',
                            iconCls: 'icon-search',
                            text : '搜索',
                            action: 'search',
                            width:80,
                            margin: '0 0 0 10',
                            columnWidth : 0.15,
                            listeners: {
                                        click: '_loadData'
                                        }
                        },{
                            xtype: 'button',
                            iconCls: 'icon-download-alt',
                            text : '下载身份码模板',
                            action: 'search',
                            width:120,
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

                                    }*//*,'|',{
                        xtype : 'button',
                        ui: 'soft-blue',
                        text : '生成测试文件',
                        iconCls : 'fa fa-align-left fa-sign-in',
                        listeners: {
                        click: 'ontestClick'
                        }
                    }*/]
                }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{ascodeGrid}'
		}
	} ],

	}],
	margin : '10 10 5 10'
});
