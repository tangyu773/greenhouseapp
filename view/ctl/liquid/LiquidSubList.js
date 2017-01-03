Ext.define('Admin.view.ctl.liquid.LiquidSubList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_liquid_LiquidSubList',
//	 id: 'ctl_liquid_LiquidSubList_ID',
	 cls: 'email-inbox-panel shadow-panel',
	 height: Math.floor(Ext.Element.getViewportHeight()-90)/2,
	 border: false,
	 viewModel: {
	     type: 'ctl_liquid_Liquid'
	 },
	 bind: {
		store: '{LiquidSubGrid}'
	 },
	 reference: 'ctl_liquid_sub_grid',
	 viewConfig: {
		 stripeRows: true
	 },
//    forceFit: true,
	 columnLines: true,
	 columns: [ {
		 dataIndex: 'subid', text: '日期编号', align: "center", flex: 100
	 }, {
		dataIndex: 'start_date', text: '生效开始日期', align: "center", flex: 120,
		renderer: function(v){
			if(v){
				return v.substring(0, v.lastIndexOf(' '));
			}
		} 
	}, {
		dataIndex: 'stop_date', text: '生效结束日期', align: "center", flex: 120,
		renderer: function(v){
			if(v){
				return v.substring(0, v.lastIndexOf(' '));
			}
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
            tooltip: '修改',
            handler: '_onShowEditSubLiquidWin'
        }, {
        	iconCls: 'fa fa-ban fa-lg opear-button',
        	action: 'del',
            tooltip: '禁用或启用',
            handler: '_onDeleteSubLiquid'
        }]
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
	}],
	initComponent: function() {
		this.callParent(arguments);
	}
});
