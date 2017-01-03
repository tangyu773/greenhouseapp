Ext.define('Admin.view.report.rpcode.RpCodeList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.report_rpcode_RpCodeList',
	 id : 'report_rpcode_RpCodeList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '身份码统计',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'report_rpcode_RpCodeList',
	 name:'report_rpcode_RpCodeList',
	 viewModel: {
	     type: 'report_rpcode_RpCode'
	 },
	 bind : {
		store : '{RpCodeGrid}'
	 },
	 reference: 'rpcode_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [{
		dataIndex : 'reqid', text : '申请流水号', align : "center", width : 120
	}, {
		dataIndex : 'corpname', text : '企业名称', align : "center", width : 160,
		listeners:{
            'render':function(utc, eOpts ) {
				var loginInfo = just.data.user.loginInfo;
				if (loginInfo.roleid > 2) {   
					  utc.setVisible(false);
				} 
			}
        }
	}, {
		dataIndex : 'productcode', text : '商品条码', align : "center", width : 120
	}, {
		dataIndex : 'prodname', text : '商品名称', align : "center", width : 120
	}, {
		dataIndex : 'lv1_num', text : '身份码1级数量', align : "center", width : 140
	}, {
		dataIndex : 'lv2_num', text : '身份码2级数量', align : "center", width : 140
	}, {
		dataIndex : 'lv3_num', text : '身份码3级数量', align : "center", width : 140
	}, {
		dataIndex : 'lv1_actnum', text : '身份码1级激活数', align : "center", width : 140
	}, {
		dataIndex : 'lv2_actnum', text : '身份码2级激活数', align : "center", width : 140
	}, {
		dataIndex : 'lv3_actnum', text : '身份码3级激活数', align : "center", width : 140
	}, {
		dataIndex : 'type', text : '类型', align : "center", width : 120
	}, {
		dataIndex : 'reqdate', text : '操作日期', align : "center", width : 160
	} ],
	dockedItems : [{
        xtype : 'toolbar',
        items : [ {
        	xtype : 'toolbar',
        	items : [{
					xtype : 'form',
			        name :'rpcode_RpCodeSearch_from',
			        layout : 'column',// 列布局
					margin : '0 0 0 0',
					defaultType : 'textfield',// 默认的Form表单组件
					defaults : {
						labelWidth : 70,
						labelAlign : 'right',
						columnWidth : 0.18,// 列宽百分百
						padding : '0 0 0 0',// 行列间距
						selectOnFocus : true,// 选中所有内容
						allowBlank : true,
				        height: 25,
						minLength : 0,
						maxLength : 30
					},
					items : [ {
						name : 'corpname',
						fieldLabel : '<span style="font-weight:bold">企业名称</span>',
						emptyText : '请搜索企业名称',
						listeners:{
				            'render':function(utc, eOpts ) {
								var loginInfo = just.data.user.loginInfo;
								if (loginInfo.roleid > 2) {   
									  utc.setVisible(false);
								} 
							}
				        }
					}, {
						name : 'code_name',
						fieldLabel : '<span style="font-weight:bold">商品</span>',
						emptyText : '请搜索商品条码或名称',
						labelWidth : 40,
						listeners:{
				            'render':function(utc, eOpts ) {
								var loginInfo = just.data.user.loginInfo;
								if (loginInfo.roleid < 3) {   
									  utc.setVisible(false);
								} 
							}
				        }
					}, {
						xtype : 'datefield',
						name : 's_date',
						fieldLabel : '<span style="font-weight:bold">开始日期</span>',
						emptyText : '请选择开始日期',
						format : 'Y-m-d'
					}, {
						xtype : 'datefield',
						name : 'e_date',
						fieldLabel : '<span style="font-weight:bold">截止日期</span>',
						emptyText : '请选择截止日期',
						format : 'Y-m-d'
					}, {
			            xtype: 'button',
			            iconCls: 'icon-search',
			            text : '搜索',
			            action: 'search',
			            margin: '0 5 0 20',
			            width: 80,
//			            columnWidth : 0.08,
			            listeners: {
	                        click: '_onRefresh'
                        }
			        } ]
				}, '| ',{
                    	xtype : 'button',
                        ui: 'soft-blue',
                        text : '导   出',
                        width : 80,
                        iconCls : 'fa fa-align-left fa-sign-out ',
                        listeners: {
                        click: '_onExport'
                        }

                    }]
        } ]
    }, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{RpCodeGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
