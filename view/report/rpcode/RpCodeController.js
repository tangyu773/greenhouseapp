Ext.define('Admin.view.report.rpcode.RpCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report_rpcode_RpCode',
    _container: undefined,
    init: function() {
        this.control({
        	'report_rpcode_RpCode':{
    			beforerender: this._initViews
        	},
        	'report_rpcode_RpCodeList':{
        		afterrender: this._onRefresh
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
        var rpcodeses = Ext.ComponentQuery.query("form[name='rpcode_RpCodeSearch_from']");
        var rpcodese = rpcodeses[rpcodeses.length-1];
        var formParams =rpcodese.getValues();
        var params = {};
        params.corpname = formParams.corpname;
        params.code_name = formParams.code_name;
        if(formParams.s_date){
        	params.s_date = formParams.s_date + ' 00:00:00';
        }else{
        	params.s_date = formParams.s_date;
        }
        if(formParams.e_date){
        	params.e_date = formParams.e_date + ' 23:59:59';
        }else{
        	params.e_date = formParams.e_date;
        }
        params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('report_rpcode_RpCodeList_Panel');
		var listStore = listGrid.getViewModel().getData().RpCodeGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();
	},
	/**
     * 导出excel
     */
	_onExport : function(){
		var url = '/report/report.action?format=xls&templateBeanId=export_rp_code&';
		var searchParams = this._initSearchParams();
		searchParams.roleid = just.data.user.loginInfo.roleid;
		just.util.toQueryString(searchParams);
		url = url + Ext.Object.toQueryString(searchParams);
		var url = just.getUrl(url);
    	window.location.href = url;
	},
    
	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        rpcode_grid = refs.rpcode_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,rpcode_grid);
 	}

});
