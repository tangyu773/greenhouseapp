Ext.define('Admin.view.house.houseList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.house_houseList',
	 id : 'house_houseList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '大棚列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'house_houseList',
	 name:'house_houseList',
	 viewModel: {
	     type: 'house_house'
	 },
	 bind : {
		store : '{houseGrid}'
	 },
	 reference: 'house_grid',
	 viewConfig : {
		 stripeRows: true
	 },
	 plugins: [{
	 						ptype: "subtable",
	 						selectRowOnExpand : false,
	 						_store:Ext.create('Admin.store.gateway.gateway'),

	 						headerWidth: 48,
	 						columns: [{
								dataIndex : 'gwid', text : 'id', align : "center", width : 160
							}, {
								dataIndex : 'dispname', text : '网关名称', align : "center", width : 160
							}, {
								dataIndex : 'netstyle', text : '网络类型', align : "center", width : 120
							}, {
								dataIndex : 'ipaddr', text : '服务器地址', align : "center", width : 120
							}, {
								dataIndex : 'port', text : '端口', align : "center", width : 120
							}, {
								dataIndex : 'frametimeout', text : '数据帧定时器', align : "center", width : 160
							}, {
								dataIndex : 'rsptimeout', text : '响应等待定时器', align : "center", width : 160
							}, {
								dataIndex : 'potocol', text : '协议', align : "center", width : 160
							}, {
								dataIndex : 'coninterval', text : '重连间隔', align : "center", width : 160
							}],
	 						getAssociatedRecords: function (record) {
	 								 var result = Ext.Array.filter(
	 								 this._store.data.items,

	 								function (r) {
	 										return r.get('ghid') == record.get('ghid');
	 								});
	 								return result;

	 						}
	 				}],
//    forceFit: true,
    columnLines:true,
	columns : [ {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 120,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button bianji_color',
            action: 'edit',
            tooltip: '修改',
            handler: '_onShowEditWin'
        }, {
        	iconCls: 'fa fa-ban fa-lg opear-button jingyong_color',
        	action: 'del',
            tooltip: '禁用',
            handler: '_onDelete'
        }, {
        	iconCls: 'xiangqing_color fa icon-xiangqing fa-lg opear-button ',
        	action: 'house',
            tooltip: '查看大棚详情',
            handler: '_showhousedetail',


        }]
	}, {
		dataIndex : 'compid', text : '所属公司', align : "center", width : 160,
		renderer:function(v,meta,record){
				 return record.get('compname');
			 },
		listeners:{
            'render':function(utc, eOpts ) {
				var loginInfo = just.data.user.loginInfo;
				if (loginInfo.roleid > 1) {
					  utc.setVisible(false);
				}
			}
        }
	}, {
		dataIndex : 'area', text : '区域', align : "center", width : 80,
		renderer:function(v,meta,record){
				 return record.get('areaname');
			 }
	}, {
		dataIndex : 'ghname', text : '大棚名称', align : "center", width : 120,
		renderer: function(value, metaData, record) {
			var ctl_flag_des = '自动';
          switch (record.get('ctl_flag')) {
            case 1:
              ctl_flag_des = '自动';
              break;
            case 2:
                ctl_flag_des = '手动';
                break;
            case 4:
                  ctl_flag_des = '停止';
                  break;
            default:
              break;

          }
                    return record.get('ghname')+'('+ctl_flag_des+')';
            },
	}, {
		dataIndex : 'ghstyle', text : '大棚类型', align : "center", width : 90,
		renderer : function(v) {
			return just.util.valueTransText(v, just.data.ghstyle);
		}
	}, {
		dataIndex : 't_r_trigid', text : '采集调度', align : "center", width : 200,
		renderer: function(value, metaData, record) {

                if(value=="" || value == undefined || value==0){
                    return "未配置"+"<a href='javascript:;' onclick=''>（配置）</a> ";
                }else{
                    return "<a href='javascript:;' onclick=''>(更改配置)</a>   "+record.get('sch_dispname');
                }

            },
            listeners: {
       click: 't_r_trigid_conf'
    }
	}, {
		dataIndex : 'at_trigid', text : '风机控制', align : "center", width : 200,
		renderer: function(value, metaData, record) {

                if(value=="" || value == undefined || value==0){
                    return "未配置"+"<a href='javascript:;' onclick=''>（配置）</a> ";
                }else{
                    return "<a href='javascript:;' onclick=''>(更改配置)</a>   "+record.get('cat_dispname');
                }

            },
            listeners: {
       click: 'at_trigid_conf'
    }
	}, {
		dataIndex : 'ssc_trigid', text : '遮阳帘控制', align : "center", width : 200,
		renderer: function(value, metaData, record) {

                if(value=="" || value == undefined || value==0){
                    return "未配置"+"<a href='javascript:;' onclick=''>（配置）</a> ";
                }else{
                    return "<a href='javascript:;' onclick=''>(更改配置)</a>   "+record.get('ssc_dispname');
                }

            },
            listeners: {
       click: 'ssc_trigid_conf'
    }
	}, {
		dataIndex : 'wc_trigid', text : '营养液循环泵', align : "center", width : 200,
		renderer: function(value, metaData, record) {

                if(value=="" || value == undefined || value==0){
                    return "未配置"+"<a href='javascript:;' onclick=''>（配置）</a> ";
                }else{
                    return "<a href='javascript:;' onclick=''>(更改配置)</a>   "+record.get('wc_dispname');
                }

            },
            listeners: {
       click: 'wc_trigid_conf'
    }
	}, {
		dataIndex : 'liquid_trigid', text : '自动滴液控制', align : "center", width : 200,
		renderer: function(value, metaData, record) {

                if(value=="" || value == undefined || value==0){
                    return "未配置"+"<a href='javascript:;' onclick=''>（配置）</a> ";
                }else{
                    return "<a href='javascript:;' onclick=''>(更改配置)</a>   "+record.get('li_dispname');
                }

            },
            listeners: {
       click: 'liquid_trigid_conf'
    }
	}, {
		dataIndex : 'liquid_fix_trigid', text : '滴灌自动补液控制', align : "center", width : 240,
		renderer: function(value, metaData, record) {
                if(value=="" || value == undefined || value==0){
                    return "未配置"+"<a href='javascript:;' onclick=''>（配置）</a> ";
                }else{
                    return "<a href='javascript:;' onclick=''>(更改配置)</a>   "+record.get('fix_dispname');
                }
            },
            listeners: {
       click: 'liquid_fix_trigid_conf'
    }
	}, {
		dataIndex : 'plantsid', text : '植物类型', align : "center", width : 80
	}, {
		dataIndex : 'ghid', text : '大棚id', align : "center", width : 80
	}, {
		dataIndex : 'xsize', text : 'x轴格数', align : "center", width : 90
	}, {
		dataIndex : 'ysize', text : 'y轴格数', align : "center", width : 90
	}, {
		dataIndex : 'batchid', text : '最近采集', align : "center", width : 160
	} , {
		dataIndex : 'useflag', text : '启用标志', align : "center", width : 80,
		renderer : function(v) {
			return just.util.valueTransText(v, just.data.CUR_STATUS,
					'color_status');
		}
	}],
	dockedItems : [{
		xtype: 'toolbar',
		items: [{
	        xtype : 'toolbar',
	        items : [ {
						xtype : 'form',
				        name :'house_houseSearch_from',
				        layout : 'column',// 列布局
						margin : '0 0 0 0',
						defaultType : 'textfield',// 默认的Form表单组件
						defaults : {
							labelWidth : 45,
							labelAlign : 'right',
							columnWidth : 0.18,// 列宽百分百
							margin:'0 10 0 0',
							selectOnFocus : true,// 选中所有内容
							allowBlank : true,
					        height: 25,
							minLength : 0,
							maxLength : 30
						},
						items : [ {
							name : 'keyword',
							fieldLabel : '<span style="font-weight:bold">搜索</span>',
							emptyText : '请输入关键字(大棚名，区域名)',
						}/*, {
							name : 'corpname',
							fieldLabel : '<span style="font-weight:bold">所属企业</span>',
							emptyText: '请搜索所属企业',
							listeners:{
					            'render':function(utc, eOpts ) {
									var loginInfo = just.data.user.loginInfo;
									if (loginInfo.roleid > 2) {
										  utc.setVisible(false);
									}
								}
					        }
						}, {
				            xtype: 'button',
				            iconCls: 'icon-search',
				            text : '搜索',
				            action: 'search',
				            margin: '0 0 0 15',
				            width: 80,
				            listeners: {
		                        click: '_onRefresh'
	                        }
				        }*/ ]
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'icon-iconfontsousuo1',
						ui: 'soft-blue',
						action: 'refresh',
						width:65,
						listeners: {
	                        click: '_onRefresh'
	                    }
					},'|',{
	                    xtype : 'button',
	                    ui: 'soft-blue',
	                    text : '新增',
	                    iconCls : 'icon-tianjia',
	                    action:'add',
					},'|',{
	                    xtype : 'button',
	                    ui: 'soft-blue',
	                    text : '大棚视图',
	                    iconCls : 'icon-dp',
											listeners: {
						                        click: '_showdapengdetile'
						                    }
					} ]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{houseGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
