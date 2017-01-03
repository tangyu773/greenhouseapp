Ext.define('Admin.view.plant.plantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.plant_plant',
    _container: undefined,
    init: function() {
        this.control({
        	'plant_plant':{
    			beforerender: this._initViews
        	},
        	'plant_plantList':{
        		afterrender: this._onRefresh
        	},
        	'plant_plantList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'plant_plantAdd button[action=save]': {
        		click: this._onAddplant
        	},

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
        var spinfoses = Ext.ComponentQuery.query("form[name='plant_plantSearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        // params.corpname = formParams.corpname;
        // params.plantname = formParams.plantname;
        // params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('plant_plantList_Panel');
		var listStore = listGrid.getViewModel().getData().plantGrid;
	//	var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
	//	listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();
	},
	 /**
     * 添加经销商
     */
    _onAddplant: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
        params.plantsid = formParams.plantsid;
    		params.plantsname = formParams.plantsname;
    		params.ghstyle = formParams.ghstyle;
    		params.cycle = formParams.cycle;
        params.useflag = formParams.useflag;
    		var listStore = this.getView().getViewModel().getData().plantGrid;
    		just.showWaitingDlg("请稍候...");
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
    _onShowAddWin: function(sedit){
    	var win = Ext.widget("plant_plantAdd");


    },


    /**
     * 显示修改界面
     */
    _onShowEditWin :function(grid, rowIndex, colIndex, node, e, record, rowEl){
      var win = Ext.widget("plant_plantAdd");

      if(record.data==null || record.data==undefined){
        record = rowIndex;
      };
        win.down('form').loadRecord(record);

    },

    /**
     * 删除经销商
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().plantGrid;
        var params = {};
        params.plantsid = record.data.plantsid;
    	if(Ext.MessageBox.confirm("系统提示","是否删除选中？",function(e){
            if(e == 'yes'){
                 just.showWaitingDlg("正在删除选中,请稍候...");
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
        plant_grid = refs.plant_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,plant_grid);
 	}

});
