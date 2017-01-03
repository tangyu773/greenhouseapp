Ext.define('Admin.view.ctl.fix.FixSubList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_fix_FixSubList',
//	 id: 'ctl_fix_FixSubList_ID',
	 cls: 'email-inbox-panel shadow-panel',
	 height: Math.floor(Ext.Element.getViewportHeight()-90),
	 border: false,
	 viewModel: {
	     type: 'ctl_fix_Fix'
	 },
	 bind: {
		store: '{FixSubGrid}'
	 },
	 reference: 'ctl_fix_sub_grid',
	 viewConfig: {
		 stripeRows: true
	 },
//    forceFit: true,
	 columnLines: true,
	 columns: [ {
		 dataIndex: 'subid', text: '编号', align: "center", flex: 70
	 }, {
	        menuDisabled: true,
	        sortable: false,
	        xtype: 'actioncolumn',
	        flex: 80,
			align : "center",
	        text: '操作',
	        items: [{
	            iconCls: 'fa fa-pencil-square fa-lg opear-button',
	            action: 'edit',
	            tooltip: '修改',
	            handler: '_onShowEditSubFixWin'
	        }, {
	        	iconCls: 'fa fa-ban fa-lg opear-button',
	        	action: 'del',
	            tooltip: '禁用或启用',
	            handler: '_onDeleteSubFix'
	        }]
		}, {
		 dataIndex: 'useflag', text: '启用标志', align: "center", flex: 80,
		 renderer: function(v) {
			 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
		}
	}, {
		dataIndex: 'low', text: '补水水位', align: "center", flex: 90,
		renderer: function(v){
			if(v){
				return v + 'cm';
			}
		}
	}, {
		dataIndex: 'full', text: '停止水位', align: "center", flex: 90,
		renderer: function(v){
			if(v){
				return v + 'cm';
			}
		}
	}, {
		dataIndex: 'max_minute', text: '最大开启时长', align: "center", flex: 110,
		renderer: function(v){
			if(v){
				return v + '分钟';
			}
		}
	}, {
		dataIndex: 'start_date', text: '生效开始日期', align: "center", flex: 110,
		renderer: function(v){
			if(v){
				return v.substring(0, v.lastIndexOf(' '));
			}
		} 
	}, {
		dataIndex: 'stop_date', text: '生效结束日期', align: "center", flex: 110,
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
			store: '{FixSubGrid}'
		}
	} ],
	initComponent: function() {
		this.callParent(arguments);
	}
});
