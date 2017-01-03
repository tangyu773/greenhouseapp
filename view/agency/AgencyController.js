Ext.define('Admin.view.agency.AgencyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agency_Agency',
    _container: undefined,
    init: function() {
        this.control({
        	'agency_Agency':{
    			beforerender: this._initViews
        	},
        	'agency_AgencyList':{
        		afterrender: this._onRefresh
        	},
        	'agency_AgencyList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'agency_AgencyAdd button[action=save]': {
        		click: this._onAddAgency
        	},
        	
        	'agency_AgencyEdit button[action=save]':{
        		click: this._onEditAgency
        	}
        });
    },	
    
    
    /**
     * 界面加载后
     */
	_initViews : function(cmp, eOpts){
		this._container = cmp;
	},
    /**
	 * 刷新
	 */
	_onRefresh:function(){
		this._loadData();
	},
	/**
     * 初始化搜索参数
     * @private
     */
    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='agency_AgencySearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.corpname = formParams.corpname;
        params.agencyname = formParams.agencyname;
        params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('agency_AgencyList_Panel');
		var listStore = listGrid.getViewModel().getData().AgencyGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();
	},
	 /**
     * 添加经销商
     */
    _onAddAgency: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.corpid = just.data.user.loginInfo.corpid;
    		params.agencyname = formParams.agencyname;
    		params.agencyaddres = formParams.agencyaddress;
    		params.phone = formParams.phone;
    		params.fax = formParams.fax;
    		params.contacts = formParams.contacts;
    		params.connum = formParams.connum;
    		params.website = formParams.website;
    		params.email = formParams.email;
    		var listStore = this.getView().getViewModel().getData().AgencyGrid;
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
    	var win = Ext.widget("agency_AgencyAdd");
    },
	
    /**
     * 修改经销商
     */
    _onEditAgency: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.corpid = just.data.user.loginInfo.corpid;
    		params.agencyname = formParams.agencyname;
    		params.agencyaddres = formParams.agencyaddress;
    		params.phone = formParams.phone;
    		params.fax = formParams.fax;
    		params.contacts = formParams.contacts;
    		params.connum = formParams.connum;
    		params.website = formParams.website;
    		params.email = formParams.email;
    		params.agencyid = formParams.agencyid;
    		var listStore = this.getView().getViewModel().getData().AgencyGrid;
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
        var editView = Ext.widget('agency_AgencyEdit');
        editView.down('form').loadRecord(record);
    },
	
    /**
     * 删除经销商
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().AgencyGrid;
        var params = {};
        params.agencyid = record.data.agencyid;
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
        agency_grid = refs.agency_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,agency_grid);
 	}

});
