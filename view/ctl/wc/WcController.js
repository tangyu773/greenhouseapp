Ext.define('Admin.view.ctl.wc.WcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctl_wc_Wc',
    init: function() {
        this.control({
        	'ctl_wc_Wc': {
        	//	afterrender: this._initPermission,
        	},
        	'ctl_wc_WcList': {
        		beforerender: this._onSetSubWcRefresh,
        		afterrender: this._onRefreshWc,
        		itemclick: this._onRefreshSubWc
        	},
        	'ctl_wc_WcList button[action=add]': {
        		click: this._onShowAddWcWin
        	},
        	'ctl_wc_WcSubList': {
//        		itemdblclick: this._onShowEditSubWcWin1,
        		itemclick: this._onRefreshTimePeriod
        	},
        	'ctl_wc_WcSubList button[action=add]': {
        		click: this._onShowAddSubWcWin
        	},
        });
    },

    
    
	/**
	 * 初始化权限
	 */
    _initPermission: function(cmp){
    	var refs = this.getReferences();
        var wc_grid = refs.ctl_wc_grid,
        wc_sub_grid = refs.ctl_wc_sub_grid;
        ctl_timeperiod_grid = refs.ctl_timeperiod_grid;
        var tab = cmp.up('ctl_CtlViewTab');
        if(tab == undefined){
            return;
        }
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(tab,wc_grid);
        util.initPermission(tab,wc_sub_grid);
        util.initPermission(tab,ctl_timeperiod_grid);
 	},

 	/**
	 * 刷新采集调度配置
	 */
    _onRefreshWc: function(){
		this._loadWcData();
	},

	/**
	 * 加载采集调度配置数据
	 */
	_loadWcData: function(page){
		var listGrids = Ext.ComponentQuery.query('ctl_wc_WcList');
		var listGrid = listGrids[listGrids.length - 1];
    	//var listGrid = Ext.getCmp('ctl_wc_WcList_ID');
		var listStore = listGrid.getViewModel().getData().WcGrid;
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.load();
		//子表清空
		var listGrid1s = Ext.ComponentQuery.query('ctl_wc_WcSubList');
		var listGrid1 = listGrid1s[listGrid1s.length - 1];
		var listStore1 = listGrid1.getViewModel().getData().WcSubGrid;
		listStore1.removeAll();
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(true);
		}
		
		//时间表清空
		var listGrid2s = Ext.ComponentQuery.query('ctl_wc_WcTimePeriodList');
	    var listGrid2 = listGrid2s[listGrid2s.length - 1];
//		var listGrid2 = Ext.getCmp('ctl_wc_WcTimePeriodList_Panel');
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
    _onShowAddWcWin: function(){
    	var win = Ext.widget("ctl_wc_WcAdd");
    },

    /**
     * 添加采集调度配置
     */
	_onAddWc: function(btn){
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
    			url: just.getUrl('/sys/ctl/gh10_ctl_wc_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefreshWc();
    				}
    			}
    		});
    	}
    },

    /**
     * 设置子grid刷新按钮状态
     */
    _onSetSubWcRefresh: function(cmp){
    	just.util.setGridPagingToolbarRefresh(cmp);
    },

    /**
	 * 刷新采集高度子配置
	 */
    _onRefreshSubWc: function(){
		this._loadSubWcData();
	},

    /**
	 * 加载采集调度子配置数据
	 */
    _loadSubWcData: function(page){
    	var listGrids = Ext.ComponentQuery.query('ctl_wc_WcList');
    	var listGrid = listGrids[listGrids.length - 1];
    	//var listGrid = Ext.getCmp('ctl_wc_WcList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	var params = {};
    	params.trigid = records[0].data.trigid;
    	var listGrid1s = Ext.ComponentQuery.query('ctl_wc_WcSubList');
    	var listGrid1 = listGrid1s[listGrid1s.length - 1];
    	//var listGrid1 = Ext.getCmp('ctl_wc_WcSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().WcSubGrid;
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
		var listGrid2s = Ext.ComponentQuery.query('ctl_wc_WcTimePeriodList');
	    var listGrid2 = listGrid2s[listGrid2s.length - 1];
//		var listGrid2 = Ext.getCmp('ctl_wc_WcTimePeriodList_Panel');
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
    _onShowAddSubWcWin: function(){
    	var win = Ext.widget("ctl_wc_WcSubAdd");
    },

    /**
     * 添加采集调度子配置
     */
	_onAddSubWc: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');

    //	var listGrid = Ext.getCmp('ctl_wc_WcList_ID');
    	var listGrids = Ext.ComponentQuery.query('ctl_wc_WcList');
    	var listGrid = listGrids[listGrids.length - 1];
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
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_wc_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubWcData();
    				}
    			}
    		});
    	}
    },

    /**
     * 显示采集调度子配置修改界面
     */
    _onShowEditSubWcWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var win = Ext.widget("ctl_wc_WcSubEdit");
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
    _onShowEditSubWcWin1: function(cmp, record, item, index, e, eOpts){
    	var win = Ext.widget("ctl_wc_WcSubEdit");
    	win.down('form').loadRecord(record);

    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);

    },

    /**
     * 修改采集调度子配置
     */
    _onEditSubWc: function(btn){
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
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_wc_update_u.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubWcData();
    				}
    			}
    		});
    	}
    },

    /**
     * 删除采集调度子配置(禁用)
     */
    _onDeleteSubWc: function(grid, rowIndex, colIndex, node, e, record, rowEl){
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
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_wc_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubWcData();
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
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_wc_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubWcData();
    						}
    					}
    				});
    			}
    		});
    	}
    },
    /**
     * 添加时间段配置
     */
    _onAddTimePeriod: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	var listGrids = Ext.ComponentQuery.query('ctl_wc_WcSubList');
    	var listGrid = listGrids[listGrids.length - 1];
//    	var listGrid = Ext.getCmp('ctl_wc_WcSubList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
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

    
    /**
     * 删除时间段配置
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
    	var win = Ext.widget("ctl_wc_WcTimePeriodEdit");
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
    	var win = Ext.widget("ctl_wc_WcTimePeriodAdd");
    },
    /**
     * 刷新
     */
    _onRefreshTimePeriod: function(){
    	this._loadTimePeriodData();
    },
    /**
     * 加载时间段数据
     */
    _loadTimePeriodData: function(page){
    	var listGrids = Ext.ComponentQuery.query('ctl_wc_WcSubList');
    	var listGrid = listGrids[listGrids.length - 1];
//    	var listGrid = Ext.getCmp('ctl_wc_WcSubList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	console.log(records[0]);
    	var params = {};
    	params.trigid = records[0].data.trigid;
    	params.subid = records[0].data.subid;
    	var listGrid1s = Ext.ComponentQuery.query('ctl_wc_WcTimePeriodList');
    	var listGrid1 = listGrid1s[listGrid1s.length - 1];
//    	var listGrid1 = Ext.getCmp('ctl_wc_WcTimePeriodList_Panel');
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
    
});
