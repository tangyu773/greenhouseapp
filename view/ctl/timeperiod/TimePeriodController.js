Ext.define('Admin.view.ctl.timeperiod.TimePeriodController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctl_timeperiod_TimePeriod',
    _grid: undefined,
    init: function() {
        this.control({
        	'ctl_timeperiod_TimePeriod':{
        		afterrender: this._initViews
        	},
        	'ctl_timeperiod_TimePeriodList':{
        		afterrender: this._onRefresh
        	},
        	'ctl_timeperiod_TimePeriodList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'ctl_timeperiod_TimePeriodAdd button[action=save]': {
        		click: this._onAddTimePeriod
        	},

        	'ctl_timeperiod_TimePeriodEdit button[action=save]':{
        		click: this._onEditTimePeriod
        	}
        });
    },


    /**
     * 界面加载后
     */
	_initViews : function(cmp, eOpts){
		this._grid = cmp.down('ctl_timeperiod_TimePeriodList');
		console.log(this._grid);
	},
    /**
	 * 刷新
	 */
	_onRefresh:function(){
		this._loadData();
	},

	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('ctl_timeperiod_TimePeriodList_Panel');
		var listStore = listGrid.getViewModel().getData().TimePeriodGrid;
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.load();
	},
	 /**
     * 添加
     */
    _onAddTimePeriod: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.corpid = just.data.user.loginInfo.corpid;
    		params.timeperiodname = formParams.timeperiodname;
    		params.timeperiodaddres = formParams.timeperiodaddress;
    		params.phone = formParams.phone;
    		params.fax = formParams.fax;
    		params.contacts = formParams.contacts;
    		params.connum = formParams.connum;
    		params.website = formParams.website;
    		params.email = formParams.email;
    		var listStore = this.getView().getViewModel().getData().TimePeriodGrid;
    		just.showWaitingDlg("正在添加经销商,请稍候...");
    		Ext.Ajax.request({
    			url: listStore.proxy.api.ADD,
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefresh();
    				}
    			}
    		});
    	}
    },

    /**
     * 显示添加界面
     */
    _onShowAddWin: function(){
    	var win = Ext.widget("ctl_timeperiod_TimePeriodAdd");
    },

    /**
     * 修改经销商
     */
    _onEditTimePeriod: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.corpid = just.data.user.loginInfo.corpid;
    		params.timeperiodname = formParams.timeperiodname;
    		params.timeperiodaddres = formParams.timeperiodaddress;
    		params.phone = formParams.phone;
    		params.fax = formParams.fax;
    		params.contacts = formParams.contacts;
    		params.connum = formParams.connum;
    		params.website = formParams.website;
    		params.email = formParams.email;
    		params.timeperiodid = formParams.timeperiodid;
    		var listStore = this.getView().getViewModel().getData().TimePeriodGrid;
    		just.showWaitingDlg("正在修改经销商,请稍候...");
    		Ext.Ajax.request({
    			url: listStore.proxy.api.UPDATE,
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefresh();
    				}
    			}
    		});
    	}
    },

    /**
     * 显示修改界面
     */
    _onShowEditWin :function(grid, rowIndex, colIndex, node, e, record, rowEl){
        var editView = Ext.widget('ctl_timeperiod_TimePeriodEdit');
        editView.down('form').loadRecord(record);
    },

    /**
     * 删除经销商
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().TimePeriodGrid;
        var params = {};
        params.timeperiodid = record.data.timeperiodid;
    	if(Ext.MessageBox.confirm("系统提示","是否删除选中经销商？",function(e){
            if(e == 'yes'){
                 just.showWaitingDlg("正在删除选中经销商,请稍候...");
                 Ext.Ajax.request({
                     url: listStore.getProxy().api.DELETE,
                     params : {params: Ext.encode(params)},
                     success : function(response, options){
                         var jsonObj = Ext.JSON.decode(response.responseText);
                         just.hideWaitingDlg(jsonObj.info,true);
                         if (jsonObj.status == '200') {
                        	 me._onRefresh();
                         }
                     }
                 });
             }
         }));
    },


	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        timeperiod_grid = refs.ctl_timeperiod_grid;
      
        var tab = cmp.up('ctl_CtlViewTab');
        if(tab == undefined){
            return;
        }

        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(tab,timeperiod_grid);
 	}

});
