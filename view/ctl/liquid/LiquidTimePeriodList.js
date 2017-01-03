Ext.define('Admin.view.ctl.liquid.LiquidTimePeriodList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_liquid_LiquidTimePeriodList',
//	 id : 'ctl_liquid_LiquidTimePeriodList_Panel',
	 cls: 'email-inbox-panel shadow-panel',
	 height:Math.floor(Ext.Element.getViewportHeight()-90)/2,
	 border: false,
	 store: Ext.create('Admin.store.ctl.timeperiod.TimePeriodStore'),
	 reference: 'ctl_timeperiod_grid',
	 viewConfig : {
		 stripeRows: true
	 },

//    forceFit: true,
    columnLines:true,
	columns : [ /*{
		dataIndex : 'subid', text : '日期编号', align : "center", width : 80
	}, */{
		dataIndex : 'period', text : '时间编号', align : "center", flex : 100
	}, {
		dataIndex: 'start_minute', text: '开始时间', align: "center", flex: 120,
		renderer: function(v){
			return just.util.transValueToTime(v);
		}
	}, {
		dataIndex: 'stop_minute', text: '结束时间', align: "center", flex: 120,
		renderer: function(v){
			return just.util.transValueToTime(v);
		}
	}, {
		 dataIndex: 'useflag', text: '启用标志', align: "center", flex: 80,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
		}
	}, {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        flex: 120,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button',
            action: 'edit',
            tooltip: '修改时间配置',
            handler: '_onShowEditTimePeriodWin'
        }, {
        	iconCls: 'fa fa-ban fa-lg opear-button',
        	action: 'del',
            tooltip: '删除时间配置',
            handler: '_onDeleteTimePeriod'
        }]
	} ],
	dockedItems : [{
		xtype: 'toolbar',
		items: [{
			xtype : 'toolbar',
			items : [{
                    xtype : 'button',
                    ui: 'soft-blue',
                    disabled: true,
                    text : '新增',
                    iconCls : 'fa fa-align-left fa-plus-square-o',
                    action:'add',
                    listeners: {
                        click: '_onShowAddTimePeriodWin'
                }
			} ]
		}]
	} ],
	initComponent : function(config) {
		this.callParent(arguments);
	}
});
