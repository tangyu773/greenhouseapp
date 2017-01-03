Ext.define('Admin.view.sensor.sensorList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.sensor_sensorList',
	 id : 'sensor_sensorList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 title : '传感器列表',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 //id:'sensor_sensorList',
	 name:'sensor_sensorList',
	 viewModel: {
			 type: 'sensor_sensor'
	 },
	 listeners : {
	   	afterrender : 'addlogicdata'
	 },
	 lstore:'{sensorGrid}',
	 bind : {
		store : '{sensorGrid}'
	 },
	 reference: 'sensor_grid',
	 viewConfig : {
		 stripeRows: true
	 },
	 plugins: [{
	             ptype: "subtable",
							 selectRowOnExpand : false,
							 _store:Ext.create('Admin.store.sensor.logic_s'),

	             headerWidth: 48,
	             columns: [{
	                 text: '逻辑id',
	                 dataIndex: 'lsenid',
	                 width: 100
	             }, {
	                 width: 100,
	                 text: '通道号',
	                 dataIndex: 'chan'
	             }, {
	                 width: 100,
	                 text: '通道描述',
	                 dataIndex: 'chan_dispname'
	             },{
	                 text: '可映射位置集合',
	                 dataIndex: 'map_filed_all',
	                 width: 200
	             }, {
	                 width: 100,
	                 text: '传感器状态',
	                 dataIndex: 'status'
	             },{
	                 text: '最新批次id',
	                 dataIndex: 'batchid',
	                 width: 100
	             }, {
	                 width: 100,
	                 text: '最新值',
	                 dataIndex: 'cv'
	             }, {
								 text: "isrs485",
								 width: 140,
								 dataIndex: 'isrs485',
								 align: "center",
								 action: 'seevideo',

								 renderer: function(value, metaData, record) {

									 if(value == 0){
										 return "<a style='text-decoration:none;color:#E91E63;' href='javascript:;' onclick='_seevideo("+record.data.lsenid+")'><i class='fa fa-video-camera' aria-hidden='true'></i>   视频</a>";
									 }
									else {
										return '-';
									}
								 }
						 	}],
	             getAssociatedRecords: function (record) {

								 var salvaguardaStore = Ext.create('Ext.data.Store', {
	         						data: [{
	             				senid: 1,
										 },{
										 senid: 2,
										},{
										senid: 3,

												}]
	     						});


	                  var result = Ext.Array.filter(
	                  this._store.data.items,

	                 function (r) {
	                     return r.get('senid') == record.get('senid');
	                 });
	                 return result;

	             }
	         }],
 //    forceFit: true,
		 columnLines:true,
	columns : [ {
		dataIndex : 'senid', text : 'id', align : "center", width : 60
	}, {
		dataIndex : 'devtypeid', text : '设备类型', align : "left", width : 200,
		renderer:function(v,meta,record){
				 return record.get('devname');
			 }
	}, {
		dataIndex : 'sn', text : '设备名称', align : "center", width : 100
	}, {
		dataIndex : 'devaddr', text : '设备地址', align : "center", width : 80
	}, {
				 menuDisabled: true,
				 sortable: false,
				 xtype: 'actioncolumn',
				 width: 70,
		align : "center",
				 text: '操作',
				 items: [{
						 iconCls: 'fa fa-pencil-square fa-lg opear-button',
						 action: 'edit',
						 tooltip: '修改',
						 handler: '_onShowEditWin'
				 }, {
					iconCls: 'fa fa-trash fa-lg opear-button',
					action: 'del',
						 tooltip: '删除',
						 handler: '_onDelete'
				 }]
	}, {
	 dataIndex : 'useflag', text : '启用标示', align : "center", width : 80,
	 renderer : function(v) {
		 return just.util.valueTransText(v, just.data.CUR_STATUS,
				 'color_status');
	 }
 }, {
		dataIndex : 'gwid', text : '网关', align : "center", width : 120,
		renderer:function(v,meta,record){
				 return record.get('dispname');
			 }
	} , {
		dataIndex : 'con_cv', text : '当前值', align : "center", width : 200
	}, {
		dataIndex : 'lastact_ts', text : '最后活动时间', align : "center", width : 160
	}, {
		dataIndex : 'last_reason', text : '当前值原因', align : "center", width : 160
	}, {
		dataIndex : 'compid', text : '所属企业', align : "center", width : 160,
		renderer:function(v,meta,record){
				 return record.get('compname');
			 }
	}, {
		dataIndex : 'start_date', text : '安装时间', align : "center", width : 160
	}, {
 		dataIndex : 'islogic', text : '逻辑存在', align : "center", width : 80,
 		renderer : function(v) {
  		 return just.util.valueTransText(!v, just.data.CUR_STATUS3,
  				 'color_status');
  	 }
 	}, {
		dataIndex : 'do_default', text : '默认输出值', align : "center", width : 100
	}, {
		dataIndex : 'x', text : 'x', align : "center", width : 60
	}, {
		dataIndex : 'y', text : 'y', align : "center", width : 60
	}, {
		dataIndex : 'z', text : 'z', align : "center", width : 60
	}],
	dockedItems : [{
		//xtype: 'toolbar',
		items: [{
					xtype : 'toolbar',
					items : [ {
						xtype : 'form',
								name :'sensor_sensorSearch_from',
								layout : 'column',// 列布局
						margin : '0 0 0 0',
						defaultType : 'textfield',// 默认的Form表单组件
						defaults : {
							labelWidth : 40,
							labelAlign : 'right',
							columnWidth : 0.18,// 列宽百分百
							margin:'0 10 0 0',
							selectOnFocus : true,// 选中所有内容
							allowBlank : true,
					        height: 25,
							minLength : 0,
							maxLength : 30
						},
						items : [{
							name : 'keyword',

							disabled:false,
							fieldLabel : '<span style="font-weight:bold">搜索</span>',
							emptyText : '请输入关键字(大棚，网关)',

						}  ]
					} ,{
						xtype : 'button',
						text : '查询',
						iconCls : 'icon-refresh',
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
											iconCls : 'fa fa-align-left fa-plus-square-o',
											action:'add',
					}]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{sensorGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
 });
