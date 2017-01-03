Ext.define('Admin.view.report.verify.VerifyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report_verify_Verify',
    _container: undefined,
    init: function() {
        this.control({
        	'report_verify_Verify':{
    			beforerender: this._initViews
        	},
        	'report_verify_VerifyList':{
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
        var verifyses = Ext.ComponentQuery.query("form[name='verify_VerifySearch_from']");
        var verifyse = verifyses[verifyses.length-1];
        var chkbox = verifyse.down('checkboxfield');
        var formParams =verifyse.getValues();
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
        if (chkbox.checked == false)
			     params.chk1 = '0';
        else
          params.chk1 = '1';
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('report_verify_VerifyList_Panel');
		var listStore = listGrid.getViewModel().getData().VerifyGrid;
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
		var url = '/report/report.action?format=xls&templateBeanId=export_rp_verify&';
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
        verify_grid = refs.verify_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,verify_grid);
 	}

});
