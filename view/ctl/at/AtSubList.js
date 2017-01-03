Ext.define('Admin.view.ctl.at.AtSubList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_at_AtSubList',
//	 id: 'ctl_at_AtSubList_ID',
	 cls: 'email-inbox-panel shadow-panel',
	 height: Math.floor(Ext.Element.getViewportHeight()-90),
	 border: false,
	 viewModel: {
	     type: 'ctl_at_At'
	 },
	 bind: {
		store: '{AtSubGrid}'
	 },
	 reference: 'ctl_at_sub_grid',
	 viewConfig: {
		 stripeRows: true
	 },
//    forceFit: true,
	 columnLines: true,
	 plugins: [ {
		ptype: "subtable",
		// selectRowOnExpand : true,
		_store: Ext.create('Admin.store.ctl.at.AtAutoStore'),
		expand: true,
		headerWidth: 48,
		columns: [ {
			text : '温度范围开始', dataIndex : 't_min', align: "center", width : 120,
		}, {
			text : '温度范围结束', dataIndex : 't_max', align: "center", width : 120
		}, {
			text : '风机状态', dataIndex : 'cv', align: "center", width : 300,
			renderer: function(v, m, record) {
//				console.log(record);
				m.style = "white-space:normal;word-wrap:break-word;word-break:break-all;";
				var val = '';
				if(v){
					var arr=v.split('');  //将a字符串转换成数组
					for(var i = 1; i <= arr.length; i++){
						val = val + Ext.String.format(" <img src='{0}' width=16 height=16 style='cursor:pointer;' alt='风机{1}'  title='风机{2}' onclick=just.ctl.update(this,\"cv\",\{3\},\{4\},\{5\},\{6\}) >  ", just.getUrl("/resources/icons/cv_" + arr[i-1] + ".png"), i, i, record.data.trigid, record.data.subid, record.data.t_min, i ) + '&nbsp;';
					}
				}
				return val;
			}
		}, {
			text : '水帘状态', dataIndex : 'wcu', align: "center", width : 120,
			renderer: function(v, m, record) {
				var val = '';
				if(v){
					var arr = v.split('');  //将a字符串转换成数组
					for(var i = 1; i <= arr.length; i++){
						val = val + Ext.String.format(" <img src='{0}' width=16 height=16 style='cursor:pointer;' alt='水帘{1}'  title='水帘{2}' onclick=just.ctl.update(this,\"wcu\",\{3\},\{4\},\{5\},\{6\}) >  ", just.getUrl("/resources/icons/wcu_" + arr[i-1] + ".png"), i, i, record.data.trigid, record.data.subid, record.data.t_min, i ) + '&nbsp;';
					}
				}
            	return val;
			}
		}, {
			text : '启用标志', dataIndex : 'useflag', align: "center", width : 100,
			renderer: function(v) {
				 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
			}
		}, {
            header: '操作', align: 'left', width: 100,
            renderer: function (v, meta, record) {
            	var flag = record.data.useflag;
            	v = Ext.String.format("<img src='{0}' width=12 height=12 />",just.getUrl("/" + "/resources/icons/delete.png")) + 
            		Ext.String.format('&nbsp;<span onclick=just.ctl.ban(this,{0},{1},{2},{3}) style="text-decoration:underline; color:blue; ">' + (flag==0 ? "启用":"禁用") + '</span>&nbsp;&nbsp;&nbsp;&nbsp;', record.data.trigid, record.data.subid, record.data.t_min, record.data.useflag);
            	return v;
            }
        }],
		getAssociatedRecords : function(record) {
//			var salvaguardaStore = Ext.create('Ext.data.Store', {
//				data : [ {
//					senid : 1,
//				}, {
//					senid : 2,
//				}, {
//					senid : 3,
//				} ]
//			});
			var result = Ext.Array.filter(this._store.data.items,
			function(r) {
				return r.get('subid') == record.get('subid');
			});
			return result;
		}
	} ],
	 columns: [ {
		 dataIndex: 'subid', text: '编号', align: "center", width: 70
	 }, {
	        menuDisabled: true,
	        sortable: false,
	        xtype: 'actioncolumn',
	        width: 80,
			align : "center",
	        text: '操作',
	        items: [{
	            iconCls: 'fa fa-pencil-square fa-lg opear-button',
	            action: 'edit',
	            tooltip: '修改',
	            handler: '_onShowEditSubAtWin'
	        }, {
	        	iconCls: 'fa fa-ban fa-lg opear-button',
	        	action: 'del',
	            tooltip: '禁用或启用',
	            handler: '_onDeleteSubAt'
	        }]
		}, {
		 dataIndex: 'useflag', text: '启用标志', align: "center", width: 80,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
		}
	}, {
		 dataIndex: 'style', text: '控制方式', align: "center", width: 80,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CTL_AT_STYLE);
		}
	}, {
		dataIndex: 'max_minute', text: '最大开启时长', align: "center", width: 120,
		renderer: function(v){
			if(v){
				return v + '分钟';
			}
		}
	}, {
		dataIndex: 'start_temp', text: '开启温度', align: "center", width: 80,
		renderer: function(v){
			if(v){
				return v + '°C';
			}
		}
	}, {
		dataIndex: 'stop_temp', text: '停止温度', align: "center", width: 80,
		renderer: function(v){
			if(v){
				return v + '°C';
			}
		}
	}, {
		 dataIndex: 'start_temp_type', text: '高温度判断方式', align: "center", width: 120,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CTL_AT_TEMP_TYPE);
		}
	}, {
		 dataIndex: 'start_temp_type', text: '低温度判断方式', align: "center", width: 120,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CTL_AT_TEMP_TYPE);
		}
	}, {
		dataIndex: 'slow_step', text: '调度频率', align: "center", width: 80,
		renderer: function(v){
			if(v){
				return v + '分钟';
			}
		}
	}, {
		dataIndex: 'start_date', text: '生效开始日期', align: "center", width: 110,
		renderer: function(v){
			if(v){
				return v.substring(0, v.lastIndexOf(' '));
			}
		} 
	}, {
		dataIndex: 'stop_date', text: '生效结束日期', align: "center", width: 110,
		renderer: function(v){
			if(v){
				return v.substring(0, v.lastIndexOf(' '));
			}
		}  
	} ],
	dockedItems: [{
		xtype: 'toolbar',
		items: [{
	        xtype: 'toolbar',
	        items: [ {
				xtype: 'button',
				disabled: true,
				text: '刷新',
				iconCls: 'icon-refresh',
				ui: 'soft-blue',
				action: 'refresh',
				width:65,
				listeners: {
                    click: '_onRefreshSubAt'
                }
			}, {
				xtype: 'tbspacer'
			}, {
                xtype: 'button',
                disabled: true,
                ui: 'soft-blue',
                text: '新增',
                iconCls: 'fa fa-align-left fa-plus-square-o',
                action:'add',
			} ]
		}]
	}, {
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true,
		bind: {
			store: '{AtSubGrid}'
		}
	} ],
	initComponent: function() {
		this.callParent(arguments);
	}
});
