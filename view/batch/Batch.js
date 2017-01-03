Ext.define('Admin.view.batch.Batch', {
	extend : 'Ext.container.Container',
	xtype : 'batch_batch',
	title : '身份码管理',
	requires: [
		'Admin.view.batch.BatchController',
		'Admin.view.batch.BatchAdd',
		'Admin.store.batch',
		'Admin.view.main.Window',
		'Admin.view.batch.BatchViewModel',
		/*'Admin.view.system.contact.Contact',
		'Admin.store.system.contact.Contact'*/
    ],
	controller : 'batch_controller',
	name:'batch_batch',
	reference: 'batch_batch',
	viewModel : {
		type: 'batch_batch'
	},
	cls: 'shadow-panel',
	itemId : 'batch_batch',
	// 列表布局
	layout : 'column',
	listeners: {
       render: '_loadData'
    },
    items: [{
    	 title : '生产批次表',
    	columnWidth : 1.0,
        xtype: 'grid',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{batch}'
		 },
		 viewConfig : {
		
			 stripeRows: true,
			 enableTextSelection:true  ,
		 },

		 defaults : {
           width:160
        },
	   // forceFit: true,
		
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
		dataIndex : 'productcode',
		text : '商品名称',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('prodname');
		}
        
	}, {
		dataIndex : 'batchno',
		text : '批次号',
		align: "center",
		width:120
		
		
	}, {
		dataIndex : 'madedate',
		text : '生产日期',
		width:160,
		align: "center",
	
        
	}, {
		dataIndex : 'validatedate',
		text : '产品有效期',
		width:160,
		align: "center",
		
		
	}, {
		dataIndex : 'workshop',
		text : '生产线',
		align: "center",
		
        
	}, {
		dataIndex : 'linename',
		text : ' 包装线',
		align: "center",
		
		
	}, {
		dataIndex : 'linemanager',
		text : ' 责任人',
		align: "center",
		
		
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
		text : ' 二级码数量',
		align: "center",
		
		
	}, {
		dataIndex : 'lv3_num',
		text : ' 三级码数量',
		align: "center",
		
		
	}/*,
    {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 90,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa icon-download-alt fa-lg opear-button',
            action: 'update',
            text:'下载一级码',
            tooltip: '下载一级码',
            handler: 'onusereditClick'
        },{
            iconCls: 'fa icon-download-alt fa-lg opear-button',
            action: 'update',
            text:'下载二级码',
            tooltip: '下载二级码',
            handler: 'onusereditClick'
        },{
            iconCls: 'fa icon-download-alt fa-lg opear-button',
            action: 'update',
            text:'下载三级码',
            tooltip: '下载三级码',
            handler: 'onusereditClick'
        }]
    }*/],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ {
                        xtype : 'button',
                        action:'add',
                        ui: 'soft-blue',
                        text : '上传打包文件',
                        width:150,
                        iconCls : 'x-fa fa-cloud-upload',
                        listeners: {
                        click: 'onuseraddClick'
                        }
                    },'| ',{
                    	xtype : 'form',
        name :'batch_search_form',
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
			name : 'batchno',
			fieldLabel : '<span style="font-weight:bold">批次号</span>',
			emptyText : '请输入批次号',
			width:240,
			blankText : '批次不能为空'
		},{
			xtype: 'datefield',
            fieldLabel: '生产日期',
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
                            text : '下载打包入库模板',
                            action: 'search',
                            width:130,
                            margin: '0 0 0 10',
                            columnWidth : 0.15,
                            listeners: {
                                        click: '_onDownloadtemple'
                                        }

                    }]
		

                    }/*,'| ',{
                    	xtype: 'button',
                            iconCls: 'icon-download-alt',
                            text : '下载打包入库模板',
                            action: 'search',
                            width:120,
                            margin: '0 0 0 10',
                            columnWidth : 0.15,
                            listeners: {
                                        click: '_onDownloadtemple'
                                        }

                    }*/]
                }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{batch}'
		}
	} ],
	
	}],
	margin : '10 10 5 10'
});
