Ext.define('Admin.view.ctl.fix.FixController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctl_fix_Fix',
    init: function() {
        this.control({
        	'ctl_fix_Fix': {
        		afterrender: this._initPermission,
        	},
        	'ctl_fix_FixList': {
        		beforerender: this._onSetSubFixRefresh,
        		afterrender: this._onRefreshFix,
        		itemclick: this._onRefreshSubFix
        	},
        	'ctl_fix_FixList button[action=add]': {
        		click: this._onShowAddFixWin
        	},
//        	'ctl_fix_FixSubList': {
//        		itemdblclick: this._onShowEditSubFixWin1
//        	},
        	'ctl_fix_FixSubList button[action=add]': {
        		click: this._onShowAddSubFixWin
        	}
        });
    },

	/**
	 * 初始化权限
	 */
    _initPermission: function(cmp){
    	var refs = this.getReferences();
        var fix_grid = refs.ctl_fix_grid,
        fix_sub_grid = refs.ctl_fix_sub_grid;
        var tab = cmp.up('ctl_CtlViewTab');
        if(tab == undefined){
          return;
        }
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(tab,fix_grid);
        util.initPermission(tab,fix_sub_grid);
 	},

 	/**
	 * 刷新采集调度配置
	 */
    _onRefreshFix: function(){
		this._loadFixData();
	},

	/**
	 * 加载采集调度配置数据
	 */
	_loadFixData: function(page){
		var listGrids = Ext.ComponentQuery.query('ctl_fix_FixList');
		var listGrid = listGrids[listGrids.length - 1];
		var listStore = listGrid.getViewModel().getData().FixGrid;
		if(!page){
			page = 1;	
		}
		listStore.currentPage = page;
		listStore.load();
		//子表清空
		var listGrid1s = Ext.ComponentQuery.query('ctl_fix_FixSubList');
		var listGrid1 = listGrid1s[listGrid1s.length - 1];
		var listStore1 = listGrid1.getViewModel().getData().FixSubGrid;
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
    _onShowAddFixWin: function(){
    	var win = Ext.widget("ctl_fix_FixAdd");
    },

    /**
     * 添加采集调度配置
     */
	_onAddFix: function(btn){
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
    			url: just.getUrl('/sys/ctl/gh10_ctl_fix_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefreshFix();
    				}
    			}
    		});
    	}
    },

    /**
     * 设置子grid刷新按钮状态
     */
    _onSetSubFixRefresh: function(cmp){
    	just.util.setGridPagingToolbarRefresh(cmp);
    },

    /**
	 * 刷新采集高度子配置
	 */
    _onRefreshSubFix: function(){
		this._loadSubFixData();
	},

    /**
	 * 加载采集调度子配置数据
	 */
    _loadSubFixData: function(page){
    	var listGrids = Ext.ComponentQuery.query('ctl_fix_FixList');
    	var listGrid = listGrids[listGrids.length - 1];
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	var params = {};
    	params.trigid = records[0].data.trigid;

    	var listGrid1s = Ext.ComponentQuery.query('ctl_fix_FixSubList');
    	var listGrid1 = listGrid1s[listGrid1s.length - 1];
		var listStore1 = listGrid1.getViewModel().getData().FixSubGrid;
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
    _onShowAddSubFixWin: function(){
    	var win = Ext.widget("ctl_fix_FixSubAdd");
    },

    /**
     * 添加采集调度子配置
     */
	_onAddSubFix: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');

    	var listGrids = Ext.ComponentQuery.query('ctl_fix_FixList');
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
    		params.low = formParams.low;
    		params.full = formParams.full;
    		params.max_minute = formParams.max_minute;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_fix_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubFixData();
    				}
    			}
    		});
    	}
    },

    /**
     * 显示采集调度子配置修改界面
     */
    _onShowEditSubFixWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var win = Ext.widget("ctl_fix_FixSubEdit");
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
    _onShowEditSubFixWin1: function(cmp, record, item, index, e, eOpts){
    	var win = Ext.widget("ctl_fix_FixSubEdit");
    	win.down('form').loadRecord(record);

    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);

    },

    /**
     * 修改采集调度子配置
     */
    _onEditSubFix: function(btn){
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
    		params.low = formParams.low;
    		params.full = formParams.full;
    		params.max_minute = formParams.max_minute;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_fix_update_u.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubFixData();
    				}
    			}
    		});
    	}
    },

    /**
     * 删除采集调度子配置(禁用)
     */
    _onDeleteSubFix: function(grid, rowIndex, colIndex, node, e, record, rowEl){
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
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_fix_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubFixData();
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
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_fix_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubFixData();
    						}
    					}
    				});
    			}
    		});
    	}
    }

});
