Ext.define('Admin.view.ctl.ssc.SscSubList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_ssc_SscSubList',
//	 id: 'ctl_ssc_SscSubList_ID',
	 cls: 'email-inbox-panel shadow-panel',
	 height: Math.floor(Ext.Element.getViewportHeight()-90),
	 border: false,
	 viewModel: {
	     type: 'ctl_ssc_Ssc'
	 },
	 bind: {
		store: '{SscSubGrid}'
	 },
	 reference: 'ctl_ssc_sub_grid',
	 viewConfig: {
		 stripeRows: true
	 },
//    forceFit: true,
	 columnLines: true,
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
	            handler: '_onShowEditSubSscWin'
	        }, {
	        	iconCls: 'fa fa-ban fa-lg opear-button',
	        	action: 'del',
	            tooltip: '禁用或启用',
	            handler: '_onDeleteSubSsc'
	        }]
		}, {
		 dataIndex: 'useflag', text: '启用标志', align: "center", width: 80,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
		}
	}, {
		dataIndex: 'start_minute', text: '开始时间', align: "center", width: 100,
		renderer: function(v){
			return just.util.transValueToTime(v);
		}
	}, {
		dataIndex: 'stop_minute', text: '结束时间', align: "center", width: 100,
		renderer: function(v){
			return just.util.transValueToTime(v);
		}
	}, {
		dataIndex: 'minlux', text: '遮阳帘流明关闭值', align: "center", width: 130,
	}, {
		dataIndex: 'maxlux', text: '遮阳帘流明开启值', align: "center", width: 130,
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
			store: '{SscSubGrid}'
		}
	} ],
	initComponent: function() {
		this.callParent(arguments);
	}
});
