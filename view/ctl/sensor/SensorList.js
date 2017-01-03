Ext.define('Admin.view.ctl.sensor.SensorList', {
	 extend: 'Ext.grid.Panel',
	 alias: 'widget.ctl_sensor_SensorList',
//	 id: 'ctl_sensor_SensorList_ID',
	 cls: 'email-inbox-panel shadow-panel',
	 height:Math.floor(Ext.Element.getViewportHeight()-90),
	 border: false,
	 viewModel: {
	     type: 'ctl_sensor_Sensor'
	 },
	 bind: {
		store: '{SensorGrid}'
	 },
	 reference: 'ctl_sensor_grid',
	 viewConfig: {
		 stripeRows: true
	 },
	 columnLines:true,
	 columns : [ {
		 dataIndex: "trigid", text: '调度ID', align: 'center', flex: 70
	 }, {
		dataIndex: 'compid', text: '所属公司', align: "center", flex: 150,
		editor: {
	        xtype: 'combo',
	        name: 'compid',
	        editable: false,
	        allowBlank: false,
	        emptyText: '请输入公司名称',
	        blankText: '公司名称不能为空',
	        mode: 'local',
	        store: Ext.create('Admin.store.ctl.sp.SpInfo'),
	        valueField: 'compid',
	        displayField: 'compname'
	    },
        renderer: function(v, meta, record) {
        	if(v){
        		return record.data.compname;
        	}
        },
	}, {
		dataIndex: 'dispname', text: '名称', align: "center", flex: 120,
		editor: {
			xtype: 'textfield',
			allowBlank: false,
		}
	}, {
		dataIndex: 'useflag', text: '启用标志', align: "center", flex: 80,
		editor: {
			xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 1,
            store: just.ST_CUR_STATUS1
		},
		renderer: function(v) {
			return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
		}
	} ],
	dockedItems: [{
		xtype: 'toolbar',
		items: [{
	        xtype: 'toolbar',
	        items: [ {
				xtype: 'button',
				text: '刷新',
				iconCls: 'icon-refresh',
				ui: 'soft-blue',
				action: 'refresh',
				width:65,
				listeners: {
                    click: '_onRefreshSensor'
                }
			}, {
				xtype: 'tbspacer'
			}, {
                xtype: 'button',
                ui: 'soft-blue',
                text: '新增',
                iconCls: 'fa fa-align-left fa-plus-square-o',
                action: 'add',
			} ]
		}]
	}, {
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true,
		bind: {
			store: '{SensorGrid}'
		}
	} ],
	initComponent: function() {
		var tab = this.up("ctl_CtlViewTab");
		if(tab == undefined)
		{
			this.callParent(arguments);
			return;
		}
		if(tab.rawParams && tab.rawParams.u == 1){
			// 可以在grid中进行行编辑的设置
			this.rowEditing = new Ext.grid.plugin.RowEditing({
				clicksToEdit: 2
			});
			this.plugins = [this.rowEditing];
			this.selType = 'rowmodel';
			this.on('edit', function(editor, e) {
				// 每一行编辑完保存之后，都提交数据
				Ext.Ajax.request({
					url: just.getUrl('/sys/ctl/gh10_ctl_sensor_update_u.action'),
					params: {params: Ext.encode(e.newValues)},
					success: function(response, options){
	    				var jsonObj = Ext.JSON.decode(response.responseText);
	    				Ext.example.msg('系统提示', jsonObj.info);
	    				if(jsonObj.status == '200'){
	    					e.grid.getStore().load();
	    					
	    					//子表清空
	    					var listGrid = Ext.ComponentQuery.query('ctl_sensor_SensorSubList')[0];
	    					var listStore = listGrid.getViewModel().getData().SensorSubGrid;
	    					listStore.removeAll();
	    					var btn = listGrid.down('toolbar').down('button[action=add]');
	    					if(btn){
	    						btn.setDisabled(true);
	    					}
	    					//子grid 刷新不可见
	    					just.util.setGridPagingToolbarRefresh(listGrid);
	    				}
	    			}
				});
			});
		}
		this.callParent(arguments);
	}
});
