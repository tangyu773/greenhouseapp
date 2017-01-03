Ext.define('Admin.view.system.baseData.BaseDataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_baseData_BaseData',
    _container: undefined,
    init: function() {
        this.control({
        	/*'system_baseData_BaseData':{
    			beforerender: this._initViews
        	},*/
        	'system_baseData_BaseDataList':{
        		beforerender: this._initViews,
        		afterrender: this._onRefresh,
        	},
        	'system_baseData_BaseDataList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'system_baseData_BaseDataAdd button[action=save]': {
        		click: this._onAddBaseData
        	},
        	
        	'system_baseData_BaseDataEdit button[action=save]':{
        		click: this._onEditBaseData
        	}
        });
    },	
    
    /**
     * 界面加载后
     */
	_initViews : function(cmp, eOpts){
		var combo = cmp.down('combo[name=module]');
    	var base_store  = combo.getStore();
    	base_store.proxy.url = base_store.proxy.api.MODULE_LIST;
    	base_store.load();
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
        var spinfoses = Ext.ComponentQuery.query("form[name='system_baseData_BaseDataSearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        
        var formParams =spinfose.getValues();
        var params = {};
        params.module = formParams.module;
        params.descrip = formParams.descrip;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('system_baseData_BaseDataList_Panel');
		var listStore = listGrid.getViewModel().getData().BaseDataGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();
	},
	
	  /**
     * 添加基础参数
     */
    _onAddBaseData: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.module = formParams.module;
    		params.paramname = formParams.paramname;
    		params.paramval = formParams.paramval;
    		params.paramdes = formParams.paramdes;
    		var listStore = this.getView().getViewModel().getData().BaseDataGrid;
    		just.showWaitingDlg("正在添加基础参数,请稍候...");
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
    	var me = this;
    	var win = Ext.widget("system_baseData_BaseDataAdd");
    	var combo = win.down('combo[name=module]');
    	var base_store  = combo.getStore();
    	base_store.proxy.url = base_store.proxy.api.MODULE_LIST;
    	base_store.load();
    	
    	combo.on('select', function(cmp, records, eOpts){
    		console.log(records);
    		var cob = win.down('combo[name=paramname]');
    		cob.setDisabled(false);
    		cob.reset();
    		var _store = cob.getStore();
    		var params = {};
    		params.module = records.data.value;
    		_store.proxy.extraParams = {params: Ext.encode(params)};
    		_store.proxy.url = base_store.proxy.api.PARAM_NAME_LIST;
    		_store.load();
    		
    	})
    },
	
    /**
     * 修改基础参数
     */
    _onEditBaseData: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.paramid = formParams.paramid;
    		params.module = formParams.module;
    		params.paramname = formParams.paramname;
    		params.paramval = formParams.paramval;
    		params.paramdes = formParams.paramdes;
    		params.useflag = formParams.useflag;
    		var listStore = this.getView().getViewModel().getData().BaseDataGrid;
    		just.showWaitingDlg("正在修改基础参数,请稍候...");
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
        var editView = Ext.widget('system_baseData_BaseDataEdit');
        editView.down('form').loadRecord(record);
    },
	
    /**
     * 禁用参数
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().BaseDataGrid;
        var params = {};
        params.paramid = record.data.paramid;
        if(record.data.useflag == 0){
        	params.useflag = 1;
        	if(Ext.MessageBox.confirm("系统提示","是否启用选中基础参数？",function(e){
                if(e == 'yes'){
                     just.showWaitingDlg("正在启用选中基础参数,请稍候...");
                     Ext.Ajax.request({
                         url: listStore.getProxy().api.DELETE,
                         params : {params: Ext.encode(params)},
                         success : function(response, options){
                             var jsonObj = Ext.JSON.decode(response.responseText);
                             just.hideWaitingDlg(jsonObj.info,false);
                             if (jsonObj.status == '200') {
                            	 me._onRefresh();
                            	 Ext.example.msg('系统提示', jsonObj.info);
                             }
                         }
                     });
                 }
             }));
        }else{
        	params.useflag = 0;
        	if(Ext.MessageBox.confirm("系统提示","是否禁用选中基础参数？",function(e){
                if(e == 'yes'){
                     just.showWaitingDlg("正在禁用选中基础参数,请稍候...");
                     Ext.Ajax.request({
                         url: listStore.getProxy().api.DELETE,
                         params : {params: Ext.encode(params)},
                         success : function(response, options){
                             var jsonObj = Ext.JSON.decode(response.responseText);
                             just.hideWaitingDlg(jsonObj.info,false);
                             if (jsonObj.status == '200') {
                            	 me._onRefresh();
                            	 Ext.example.msg('系统提示', jsonObj.info);
                             }
                         }
                     });
                 }
             }));
        }
    },
	
	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        system_baseData_grid = refs.system_baseData_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,system_baseData_grid);
 	}

});
