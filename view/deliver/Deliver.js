Ext.define('Admin.view.deliver.Deliver', {  
	extend : 'Ext.container.Container',
	xtype : 'deliver_deliver',
	title : 'deliver',
	requires: [
		'Admin.view.deliver.DeliverController',
		'Admin.view.deliver.DeliverAdd',
		'Admin.view.system.contact.Contact',
		'Admin.view.main.Window',
		'Admin.view.deliver.DeliverViewModel',
		'Admin.store.system.contact.Contact',
		'Admin.store.deliver.deliver'
    ],
	controller : 'deliver_controller',
	name:'deliver_deliver',
	reference: 'deliver_deliver',
	viewModel : {
		type: 'deliver_deliver'
	},
	cls: 'shadow-panel',
	itemId : 'deliver_deliver',
	// 列表布局
	layout : 'column',
	listeners: {
       render: '_loadData'
    },
    items: [{
    	title : '出货表',
    	columnWidth : 1.0,
        xtype: 'grid',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{deliverGrid}'
		 },
		 viewConfig : {	
		 	enableTextSelection:true  ,	
			 stripeRows: true
		 },

		 defaults : {
           width:160
        },
	    //forceFit: true,
		
	    columnLines:true,
	    columns : [{
                xtype: 'rownumberer'
            }, {
		dataIndex : 'corpid',
		text : '发货企业',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('corpname');
		}
	
		
	}, {
		dataIndex : 'corporderid',
		text : '出货单号',
		width:120,
		align: "center",
		
        
	},
    {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 90,
		align : "center",
        text: '发货',
        items: [{
            iconCls: 'fa fa-paper-plane-o fa-lg opear-button',
            action: 'update',
            tooltip: '发货',
            handler: 'onuseraddClick'
        }/*,{
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
        }*/]
    }, {
		dataIndex : 'actor',
		text : '操作员',
		align: "center",
		width:120
		
		
	}, {
		dataIndex : 'actdate',
		text : '出货时间',
		align: "center",
		width:160
	
        
	}, {
		dataIndex : 'productcode',
		text : '条码',
		align: "center",
		
		
	}, {
		dataIndex : 'batchno',
		text : '批次',
		align: "center",
		
        
	}, {
		dataIndex : 'tocorpid',
		text : '经销商',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('agencyname');
		}
		
	}, {
		dataIndex : 'sale_region_code',
		text : '销售区域',
		align: "center",
		renderer : function(v,m,r) {
			return r.get('name');
		}
		
		
	}, {
		dataIndex : 'actiontype',
		text : '动作类型',
		align: "center",
		
		
        
	}, {
		dataIndex : 'eventtype',
		text : '事件类型',
		align: "center",
		
        
	}],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ /*{
                        xtype : 'button',
                        action:'add',
                        ui: 'soft-blue',
                        text : '上传批次信息文件',
                        iconCls : 'x-fa fa-cloud-upload',
                        listeners: {
                        click: 'onuseraddClick'
                        }
                    },'| ',*/{
                    	xtype : 'form',
        name :'deliver_deliver_search_form',
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
			name : 'seqno',
			fieldLabel : '<span style="font-weight:bold">订单号</span>',
			emptyText : '请输入出货订单号',
			width:240,
			blankText : '订单号不能为空'
		},{
			xtype: 'datefield',
            fieldLabel: '出货日期',
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
			store : '{deliverGrid}'
		}
	} ],
	
	}],
	margin : '10 10 5 10'
});
