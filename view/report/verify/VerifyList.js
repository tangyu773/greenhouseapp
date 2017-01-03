Ext.define('Admin.view.report.verify.VerifyList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.report_verify_VerifyList',
	 id : 'report_verify_VerifyList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '真伪验证统计',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'report_verify_VerifyList',
	 name:'report_verify_VerifyList',
	 viewModel: {
	     type: 'report_verify_Verify'
	 },
	 bind : {
		store : '{VerifyGrid}'
	 },
	 reference: 'verify_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [/*{
		dataIndex : 'reqid', text : '申请流水号', align : "center", width : 120
	}, */{
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
		dataIndex : 'productcode', text : '商品条码', align : "center", width : 100
	}, {
		dataIndex : 'prodname', text : '商品名称', align : "center", width : 140
	}, {
		dataIndex : 'code_lv1', text : '身份码1级', align : "center", width : 180
	}, {
		dataIndex : 'code_lv2', text : '身份码2级', align : "center", width : 120
	}, {
		dataIndex : 'code_lv3', text : '身份码3级', align : "center", width : 100
	}, {
		dataIndex : 'verifycode', text : '验证码', align : "center", width : 80
	}, {
		dataIndex : 'batchno', text : '生产批次', align : "center", width : 120
	}, {
		dataIndex : 'corporderid', text : '出货订单号', align : "center", width : 120
	}, {
		dataIndex : 'querytimes', text : '查询总次数', align : "center", width : 100
	}, {
		dataIndex : 'lastquerytime', text : '最后查询时间', align : "center", width : 140
	}, {
		dataIndex : 'sale_region_code', text : '销售区域', align : "center", width : 100
	}, {
		dataIndex : 'usr_region_code', text : '用户所在区域', align : "center", width : 100
	} ],
	dockedItems : [{
        xtype : 'toolbar',
        items : [ {
        	xtype : 'toolbar',
        	items : [{
					xtype : 'form',
			        name :'verify_VerifySearch_from',
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
					},{
	            xtype: 'checkboxfield',
							name:'showrepeatonly',
	            labelWidth: 100,
	            name: 'chk1',
	            inputValue: '0',
	            checked:true,
	            fieldLabel: '只显示串货记录'
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
                        width: 80,
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
			store : '{VerifyGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
