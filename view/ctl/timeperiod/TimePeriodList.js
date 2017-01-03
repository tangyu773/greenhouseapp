Ext.define('Admin.view.ctl.timeperiod.TimePeriodList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_timeperiod_TimePeriodList',
	 id : 'ctl_timeperiod_TimePeriodList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 border: false,
	 name:'ctl_timeperiod_TimePeriodList',
	 viewModel: {
	     type: 'ctl_timeperiod_TimePeriod'
	 },
	 bind : {
		store : '{TimePeriodGrid}'
	 },
	 reference: 'ctl_timeperiod_grid',
	 viewConfig : {
		 stripeRows: true
	 },

    forceFit: true,
    columnLines:true,
	columns : [ {
		dataIndex : 'trigid', text : 'TRIGID', align : "center", width : 100
	}, {
		dataIndex : 'subid', text : 'SUBID', align : "center", width : 100
	}, {
		dataIndex : 'period', text : 'PERIOD', align : "center", width : 100
	}, {
		dataIndex: 'start_minute', text: '开始时间', align: "center", width: 120,
		renderer: function(v){
			return just.util.transValueToTime(v);
		}
	}, {
		dataIndex: 'stop_minute', text: '结束时间', align: "center", width: 120,
		renderer: function(v){
			return just.util.transValueToTime(v);
		}
	}, {
		 dataIndex: 'useflag', text: '启用标志', align: "center", width: 80,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
		}
	}, {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 120,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button',
            action: 'edit',
            tooltip: '修改经销商',
            handler: '_onShowEditWin'
        }, {
        	iconCls: 'fa fa-trash fa-lg opear-button',
        	action: 'del',
            tooltip: '删除经销商',
            handler: '_onDelete'
        }]
	} ],
	dockedItems : [{
		xtype: 'toolbar',
//		margin: '-5 0 -5 0',
		items: [{
	        xtype : 'toolbar',
	        items : [ {
						xtype : 'button',
						text : '刷新',
						iconCls : 'icon-refresh',
						ui: 'soft-blue',
						action: 'refresh',
						width:65,
						listeners: {
	                        click: '_onRefresh'
	                    }
					}, {
						xtype: 'tbspacer'
					}, {
	                    xtype : 'button',
	                    ui: 'soft-blue',
	                    text : '新增',
	                    iconCls : 'fa fa-align-left fa-plus-square-o',
	                    action:'add',
					} ]
			}]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{TimePeriodGrid}'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
