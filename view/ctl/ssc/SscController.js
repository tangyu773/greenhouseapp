Ext.define('Admin.view.ctl.ssc.SscController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctl_ssc_Ssc',
    init: function() {
        this.control({
        	'ctl_ssc_Ssc': {
        		afterrender: this._initPermission,
        	},
        	'ctl_ssc_SscList': {
        		beforerender: this._onSetSubSscRefresh,
        		afterrender: this._onRefreshSsc,
        		itemclick: this._onRefreshSubSsc
        	},
        	'ctl_ssc_SscList button[action=add]': {
        		click: this._onShowAddSscWin
        	},
//        	'ctl_ssc_SscSubList': {
//        		itemdblclick: this._onShowEditSubSscWin1
//        	},
        	'ctl_ssc_SscSubList button[action=add]': {
        		click: this._onShowAddSubSscWin
        	}
        });
    },	
    
	/**
	 * 初始化权限
	 */
    _initPermission: function(cmp){
    	var refs = this.getReferences();
        var ssc_grid = refs.ctl_ssc_grid,
        ssc_sub_grid = refs.ctl_ssc_sub_grid;
        var tab = cmp.up('ctl_CtlViewTab');
        if(tab == undefined){
            return;
        }
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(tab,ssc_grid);
        util.initPermission(tab,ssc_sub_grid);
 	},
 	
 	/**
	 * 刷新采集调度配置
	 */
    _onRefreshSsc: function(){
		this._loadSscData();
	},
	
	/**
	 * 加载采集调度配置数据
	 */
	_loadSscData: function(page){
		var listGrid = Ext.ComponentQuery.query('ctl_ssc_SscList')[0];
//		var listGrid = Ext.getCmp('ctl_ssc_SscList_ID');
		var listStore = listGrid.getViewModel().getData().SscGrid;
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.load();
		//子表清空
		var listGrid1 = Ext.ComponentQuery.query('ctl_ssc_SscSubList')[0];
//		var listGrid1 = Ext.getCmp('ctl_ssc_SscSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().SscSubGrid;
		listStore1.removeAll();
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(true);
		}
		//子grid 刷新不可见
		just.util.setGridPagingToolbarRefresh(listGrid1);
	},
	
	 /**
     * 显示添加采集调度界面
     */
    _onShowAddSscWin: function(){
    	var win = Ext.widget("ctl_ssc_SscAdd");
    },
    
    /**
     * 添加采集调度配置
     */
	_onAddSsc: function(btn){
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
    			url: just.getUrl('/sys/ctl/gh10_ctl_ssc_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefreshSsc();
    				}
    			}
    		});
    	}
    }, 
    
    /**
     * 设置子grid刷新按钮状态
     */
    _onSetSubSscRefresh: function(cmp){
    	just.util.setGridPagingToolbarRefresh(cmp);
    },
    
    /**
	 * 刷新采集高度子配置
	 */
    _onRefreshSubSsc: function(){
		this._loadSubSscData();
	},
    
    /**
	 * 加载采集调度子配置数据
	 */
    _loadSubSscData: function(page){
    	var listGrid = Ext.ComponentQuery.query('ctl_ssc_SscList')[0];
//    	var listGrid = Ext.getCmp('ctl_ssc_SscList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	var params = {};
    	params.trigid = records[0].data.trigid;
    	var listGrid1 = Ext.ComponentQuery.query('ctl_ssc_SscSubList')[0];
//    	var listGrid1 = Ext.getCmp('ctl_ssc_SscSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().SscSubGrid;
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
		//子grid 刷新可见
		just.util.setGridPagingToolbarRefresh(listGrid1, true);
    },
    
    /**
     * 显示添加采集调度子配置界面
     */
    _onShowAddSubSscWin: function(){
    	var win = Ext.widget("ctl_ssc_SscSubAdd");
    },
    
    /**
     * 添加采集调度子配置
     */
	_onAddSubSsc: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	var listGrid = Ext.ComponentQuery.query('ctl_ssc_SscList')[0];
//    	var listGrid = Ext.getCmp('ctl_ssc_SscList_ID');
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
    		params.startminute = Ext.Date.parse(formParams.startminute,'H:i').getHours()*60 + Ext.Date.parse(formParams.startminute,'H:i').getMinutes();
    		params.stopminute = Ext.Date.parse(formParams.stopminute,'H:i').getHours()*60 + Ext.Date.parse(formParams.stopminute,'H:i').getMinutes();;
    		params.minlux = formParams.minlux;
    		params.maxlux = formParams.maxlux;
    		params.useflag = formParams.useflag;
    		console.log(params);
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_ssc_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubSscData();
    				}
    			}
    		});
    	}
    }, 
    
    /**
     * 显示采集调度子配置修改界面
     */
    _onShowEditSubSscWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var win = Ext.widget("ctl_ssc_SscSubEdit");
    	win.down('form').loadRecord(record);
    	
    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);
        
        var startminute = just.util.transValueToTime(record.data.start_minute);
        win.down('form').down('timefield[name=start_minute]').setValue(startminute);
        var stopminute = just.util.transValueToTime(record.data.stop_minute);
        win.down('form').down('timefield[name=stop_minute]').setValue(stopminute);
        
        win.down('form').down('hiddenfield[name=start_date_copy]').setValue(record.data.start_date);
    },
    
    /**
     * 双击显示采集调度子配置修改界面
     */
    _onShowEditSubSscWin1: function(cmp, record, item, index, e, eOpts){
    	var win = Ext.widget("ctl_ssc_SscSubEdit");
    	win.down('form').loadRecord(record);
    	
    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);
        
        var startminute = just.util.transValueToTime(record.data.start_minute);
        win.down('form').down('timefield[name=start_minute]').setValue(startminute);
        var stopminute = just.util.transValueToTime(record.data.stop_minute);
        win.down('form').down('timefield[name=stop_minute]').setValue(stopminute);
    },
    
    /**
     * 修改采集调度子配置
     */
    _onEditSubSsc: function(btn){
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
    		params.startminute = Ext.Date.parse(formParams.start_minute,'H:i').getHours()*60 + Ext.Date.parse(formParams.start_minute,'H:i').getMinutes();
    		params.stopminute = Ext.Date.parse(formParams.stop_minute,'H:i').getHours()*60 + Ext.Date.parse(formParams.stop_minute,'H:i').getMinutes();;
    		params.minlux = formParams.minlux;
    		params.maxlux = formParams.maxlux;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_ssc_update_u.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubSscData();
    				}
    			}
    		});
    	}
    },
    
    /**
     * 删除采集调度子配置(禁用)
     */
    _onDeleteSubSsc: function(grid, rowIndex, colIndex, node, e, record, rowEl){
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
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_ssc_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubSscData();
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
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_ssc_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubSscData();
    						}
    					}
    				});
    			}
    		});
    	}
    }
    
});
