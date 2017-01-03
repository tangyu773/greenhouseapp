Ext.define('Admin.view.ctl.liquid.LiquidController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctl_liquid_Liquid',
    init: function() {
        this.control({
        	'ctl_liquid_Liquid': {
        		afterrender: this._initPermission,
        	},
        	'ctl_liquid_LiquidList': {
        		beforerender: this._onSetSubLiquidRefresh,
        		afterrender: this._onRefreshLiquid,
        		itemclick: this._onRefreshSubLiquid
        	},
        	'ctl_liquid_LiquidList button[action=add]': {
        		click: this._onShowAddLiquidWin
        	},
        	'ctl_liquid_LiquidSubList': {
        		itemclick: this._onRefreshTimePeriod,
//        		itemdblclick: this._onShowEditSubLiquidWin1
        	},
        	'ctl_liquid_LiquidSubList button[action=add]': {
        		click: this._onShowAddSubLiquidWin
        	}
        });
    },	
	/**
	 * 初始化权限
	 */
    _initPermission: function(cmp){
    	var refs = this.getReferences();
        var liquid_grid = refs.ctl_liquid_grid,
        liquid_sub_grid = refs.ctl_liquid_sub_grid;
        ctl_timeperiod_grid = refs.ctl_timeperiod_grid;
        var tab = cmp.up('ctl_CtlViewTab');
        if(tab == undefined){
          return;
        }
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(tab,liquid_grid);
        util.initPermission(tab,liquid_sub_grid);
        util.initPermission(tab,ctl_timeperiod_grid);
 	},

 	/**
	 * 刷新采集调度配置
	 */
    _onRefreshLiquid: function(){
		this._loadLiquidData();
	},

	/**
	 * 加载采集调度配置数据
	 */
	_loadLiquidData: function(page){
		var listGrid = Ext.ComponentQuery.query('ctl_liquid_LiquidList')[0];
//		var listGrid = Ext.getCmp('ctl_liquid_LiquidList_ID');
		var listStore = listGrid.getViewModel().getData().LiquidGrid;
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.load();
		//子表清空
		var listGrid1 = Ext.ComponentQuery.query('ctl_liquid_LiquidSubList')[0];
//		var listGrid1 = Ext.getCmp('ctl_liquid_LiquidSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().LiquidSubGrid;
		listStore1.removeAll();
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(true);
		}

		//时间表清空
		var listGrid2 = Ext.ComponentQuery.query('ctl_liquid_LiquidTimePeriodList')[0];
//		var listGrid2 = Ext.getCmp('ctl_liquid_LiquidTimePeriodList_Panel');
		var listStore2 = listGrid2.store;
		listStore2.removeAll();
		var btn = listGrid2.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(true);
		}
	},

	 /**
     * 显示添加采集调度界面
     */
    _onShowAddLiquidWin: function(){
    	var win = Ext.widget("ctl_liquid_LiquidAdd");
    },

    /**
     * 添加采集调度配置
     */
	_onAddLiquid: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.compid = formParams.compid;
    		params.dispname = formParams.dispname;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_liquid_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefreshLiquid();
    				}
    			}
    		});
    	}
    },

    /**
     * 设置子grid刷新按钮状态
     */
    _onSetSubLiquidRefresh: function(cmp){
    	just.util.setGridPagingToolbarRefresh(cmp);
    },

    /**
	 * 刷新采集高度子配置
	 */
    _onRefreshSubLiquid: function(){
		this._loadSubLiquidData();
	},

    /**
	 * 加载采集调度子配置数据
	 */
    _loadSubLiquidData: function(page){
    	var listGrid = Ext.ComponentQuery.query('ctl_liquid_LiquidList')[0];
//    	var listGrid = Ext.getCmp('ctl_liquid_LiquidList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	var params = {};
    	params.trigid = records[0].data.trigid;
    	var listGrid1 = Ext.ComponentQuery.query('ctl_liquid_LiquidSubList')[0];
//    	var listGrid1 = Ext.getCmp('ctl_liquid_LiquidSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().LiquidSubGrid;
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(false);
		}
		if(!page){
			page = 1;
		}
		listStore1.currentPage = page;
		listStore1.proxy.extraParams = {
            params: Ext.encode(params)
		};
		listStore1.load();
		
		//时间表清空
		var listGrid2 = Ext.ComponentQuery.query('ctl_liquid_LiquidTimePeriodList')[0];
//		var listGrid2 = Ext.getCmp('ctl_liquid_LiquidTimePeriodList_Panel');
		var listStore2 = listGrid2.store;
		listStore2.removeAll();
		var btn = listGrid2.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(true);
		}
    },

    /**
     * 显示添加采集调度子配置界面
     */
    _onShowAddSubLiquidWin: function(){
    	var win = Ext.widget("ctl_liquid_LiquidSubAdd");
    },

    /**
     * 添加采集调度子配置
     */
	_onAddSubLiquid: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	var listGrid = Ext.ComponentQuery.query('ctl_liquid_LiquidList')[0];
//    	var listGrid = Ext.getCmp('ctl_liquid_LiquidList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    		return;
    	}

    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.trigid = records[0].data.trigid;
    		params.start_date = formParams.start_date;
    		params.stop_date = formParams.stop_date;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_liquid_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubLiquidData();
    				}
    			}
    		});
    	}
    },

    /**
     * 显示采集调度子配置修改界面
     */
    _onShowEditSubLiquidWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var win = Ext.widget("ctl_liquid_LiquidSubEdit");
    	win.down('form').loadRecord(record);

    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);

        win.down('form').down('hiddenfield[name=start_date_copy]').setValue(record.data.start_date);

    },

    /**
     * 双击显示采集调度子配置修改界面
     */
    _onShowEditSubLiquidWin1: function(cmp, record, item, index, e, eOpts){
    	var win = Ext.widget("ctl_liquid_LiquidSubEdit");
    	win.down('form').loadRecord(record);

    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);

    },

    /**
     * 修改采集调度子配置
     */
    _onEditSubLiquid: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');

    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.trigid = formParams.trigid;
    		params.subid = formParams.subid;
    		params.start_date = formParams.start_date;
    		params.stop_date = formParams.stop_date;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_liquid_update_u.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubLiquidData();
    				}
    			}
    		});
    	}
    },

    /**
     * 删除采集调度子配置(禁用)
     */
    _onDeleteSubLiquid: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var params = {};
    	params.trigid = record.data.trigid;
    	params.subid = record.data.subid;
//    	params.useflag = record.data.useflag == 1 ? 0 : 1 ;
    	if(record.data.useflag == 0){
    		params.useflag = 1;
    		Ext.MessageBox.confirm("系统提示","是否启用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在启用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_liquid_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubLiquidData();
    						}
    					}
    				});
    			}
    		});
    	}else{
    		params.useflag = 0;
    		Ext.MessageBox.confirm("系统提示","是否禁用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在禁用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_liquid_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubLiquidData();
    						}
    					}
    				});
    			}
    		});
    	}
    },

    /**
     * 禁用启用时间段配置
     */
    _onDeleteTimePeriod: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var params = {};
    	params.trigid = record.data.trigid;
    	params.subid = record.data.subid;
    	params.period = record.data.period;
//    	params.useflag = record.data.useflag == 1 ? 0 : 1 ;
    	if(record.data.useflag == 0){
    		params.useflag = 1;
    		Ext.MessageBox.confirm("系统提示","是否启用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在启用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_timeperiod_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadTimePeriodData();
    						}
    					}
    				});
    			}
    		});
    	}else{
    		params.useflag = 0;
    		Ext.MessageBox.confirm("系统提示","是否禁用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在禁用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_timeperiod_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadTimePeriodData();
    						}
    					}
    				});
    			}
    		});
    	}
    },
    /**
     * 显示时间段配置修改窗口
     */
    _onShowEditTimePeriodWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var win = Ext.widget("ctl_liquid_LiquidTimePeriodEdit");
    	win.down('form').loadRecord(record);

        var start_minute = just.util.transValueToTime(record.data.start_minute);
        win.down('form').down('timefield[name=start_minute]').setValue(start_minute);
        var stop_minute = just.util.transValueToTime(record.data.stop_minute);
        win.down('form').down('timefield[name=stop_minute]').setValue(stop_minute);

        win.down('form').down('hiddenfield[name=startminute_copy]').setValue(record.data.start_minute);
    },
    /**
     * 显示时间段配置添加窗口
     */
    _onShowAddTimePeriodWin: function(btn){
    	var win = Ext.widget("ctl_liquid_LiquidTimePeriodAdd");
    },

    /**
     * 刷新时间段配置
     */
    _onRefreshTimePeriod: function(){
    	this._loadTimePeriodData();
    },

    /**
     * 加载时间段配置数据
     */
    _loadTimePeriodData: function(page){
    	var listGrid = Ext.ComponentQuery.query('ctl_liquid_LiquidSubList')[0];
//    	var listGrid = Ext.getCmp('ctl_liquid_LiquidSubList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	console.log(records[0]);
    	var params = {};
    	params.trigid = records[0].data.trigid;
    	params.subid = records[0].data.subid;
    	var listGrid1 = Ext.ComponentQuery.query('ctl_liquid_LiquidTimePeriodList')[0];
//    	var listGrid1 = Ext.getCmp('ctl_liquid_LiquidTimePeriodList_Panel');
		var listStore1 = listGrid1.store;
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(false);
		}
		if(!page){
			page = 1;
		}
		listStore1.currentPage = page;
		listStore1.proxy.extraParams = {
            params: Ext.encode(params)
		};
		listStore1.load();
    },
    /**
     * 添加时间段配置
     */
    _onAddTimePeriod: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	var listGrid = Ext.ComponentQuery.query('ctl_liquid_LiquidSubList')[0];
//    	var listGrid = Ext.getCmp('ctl_liquid_LiquidSubList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条日期记录");
    		return;
    	}
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.trigid = records[0].data.trigid;
    		params.subid = records[0].data.subid;
    		params.start_minute = Ext.Date.parse(formParams.start_minute,'H:i').getHours()*60 + Ext.Date.parse(formParams.start_minute,'H:i').getMinutes();
    		params.stop_minute = Ext.Date.parse(formParams.stop_minute,'H:i').getHours()*60 + Ext.Date.parse(formParams.stop_minute,'H:i').getMinutes();;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_timeperiod_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadTimePeriodData();
    				}
    			}
    		});
    	}
    },
    /**
     * 修改时间段配置
     */
    _onEditTimePeriod: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');

    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.trigid = formParams.trigid;
    		params.subid = formParams.subid;
    		params.period = formParams.period;
    		params.start_minute = Ext.Date.parse(formParams.start_minute,'H:i').getHours()*60 + Ext.Date.parse(formParams.start_minute,'H:i').getMinutes();
    		params.stop_minute = Ext.Date.parse(formParams.stop_minute,'H:i').getHours()*60 + Ext.Date.parse(formParams.stop_minute,'H:i').getMinutes();
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_timeperiod_update_u.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadTimePeriodData();
    				}
    			}
    		});
    	}
    },


});
