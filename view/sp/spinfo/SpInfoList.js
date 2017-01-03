Ext.define('Admin.view.sp.spinfo.SpInfoList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.sp_spinfo_SpInfoList',
	 id : 'sp_spinfo_SpInfoList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '企业列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'sp_spinfo_SpInfoList',
	 name:'sp_spinfo_SpInfoList',
	 viewModel: {
	     type: 'sp_spinfo_SpInfo'
	 },
	 bind : {
		store : '{SpInfoGrid}'
	 },
	 reference: 'spinfo_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [ {
		dataIndex : 'compname', text : '企业名称', align : "center", width : 160
	}, {
		dataIndex : 'comptelno', text : '企业电话', align : "center", width : 120
	}, {
		dataIndex : 'compfaxno', text : '传真号码', align : "center", width : 120
	}, {
		dataIndex : 'compcontact', text : '联系人', align : "center", width : 100
	}, {
		dataIndex : 'compcontactmobile', text : '联系人电话', align : "center", width : 120
	}/*, {
		dataIndex : 'qrimage', text : '企业公众号二维码', align : "center", width : 140,
		 renderer:function(v,meta,record){
        	 if(v){
                 v = '<a href="' + just.rootPath() + "/"+ v +'" target="_blank" style="text-decoration:underline">公众号二维码</a>'
        	 }
             return v;
		}
	}*/ ],
	dockedItems : [{
        xtype : 'toolbar',
        items : [ {
					xtype : 'form',
			        name :'spinfo_SpInfoSearch_from',
			        layout : 'column',// 列布局
					margin : '0 0 0 0',
					defaultType : 'textfield',// 默认的Form表单组件
					defaults : {
						labelWidth : 60,
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
					},{
			            xtype: 'button',
			            iconCls: 'icon-search',
			            text : '搜索',
			            action: 'search',
			            margin: '0 0 0 15',
			            width: 80,
			            listeners: {
	                        click: '_onRefresh',
	                        'render':function(utc, eOpts ) {
                				var loginInfo = just.data.user.loginInfo;
                				if (loginInfo.roleid > 2) {
                					  utc.setVisible(false);
                				}
                			}
                        }
			        } ]
				} ]
    }, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{SpInfoGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
