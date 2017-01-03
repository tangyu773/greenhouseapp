Ext.define('Admin.view.sp.spinfo.SpInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sp_spinfo_SpInfo',
    _container: undefined,
    init: function() {
        this.control({
        	'sp_spinfo_SpInfo':{
    			beforerender: this._initViews
        	},
        	'sp_spinfo_SpInfoList':{
        		afterrender: this._onRefresh,
        		itemdblclick: this._onShowDetails
        	},
        	'sp_spinfo_SpInfoEdit button[action=save]':{
        		click: this._onSave
        	},
        	'sp_spinfo_SpInfoEdit' :{
        		afterrender : this._onClickImg
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
        var spinfoses = Ext.ComponentQuery.query("form[name='spinfo_SpInfoSearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.corpname = formParams.corpname;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('sp_spinfo_SpInfoList_Panel');
		var listStore = listGrid.getViewModel().getData().SpInfoGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load({
		    scope: this,
		    callback: function(records, operation, success) {
		    	var formPanel = Ext.getCmp('sp_spinfo_SpInfoEdit_Panel');
				formPanel.loadRecord(records[0]);
				if(records[0].data.catalog != null && records[0].data.catalog != ""){
					formPanel.down('image[name=image]').setSrc(just.rootPath() + "/" + records[0].data.catalog);
				}
		    }
		});
	},
	/**
	 * 显示详细
	 */
	_onShowDetails: function(cmp, record, item, index, e, eOpts){
		var formPanel = Ext.getCmp('sp_spinfo_SpInfoEdit_Panel');
		formPanel.loadRecord(record);
		if(record.data.catalog != null && record.data.catalog != ""){
			formPanel.down('image[name=image]').setSrc(just.rootPath() + "/" + record.data.catalog);
		}else{
			formPanel.down('image[name=image]').setSrc(just.rootPath()+'/resources/images/spinfo_default_logo.jpg');
		}
	},
	/**
	 * 保存信息
	 */
	_onSave: function(btn){
		var me = this;
		var listStore = this.getView().getViewModel().getData().SpInfoGrid;
		var form = btn.up('form');
		if(form.isValid()){
			just.showWaitingDlg("正在保存企业信息,请稍候...");
			form.getForm().doAction('submit',{
				url : listStore.getProxy().api.SAVE,
				method : 'POST',
				submitEmptyText : false,
				timeout : 60000,
				success : function(response, options){
					var result = options.result;
					just.hideWaitingDlg(result.info, true);
					if(result.success){
						me._loadData(1);
//						form.reset();
					}
				},
				failure : function(response, options){
					var result = options.result;
					just.hideWaitingDlg(result.info, true);
				}
			});
		}
	},
	/**
	 * 点击图片显示大图
	 */
	_onClickImg : function(){
		// var eleDom = Ext.getDom("spinfoEdit_image_id");
		// eleDom.onclick = function(){
		// 	window.open(eleDom.src);
		// }
    },

	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        spinfo_grid = refs.spinfo_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,spinfo_grid);
        if(cmp.rawParams.c == 0 || cmp.rawParams.u == 0){
        	var formPanel = Ext.getCmp('sp_spinfo_SpInfoEdit_Panel');
        	formPanel.down('button').setVisible(false);
        }
 	}

});
