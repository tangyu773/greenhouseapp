Ext.define('Admin.view.gateway.gatewayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gateway_gateway',
    _container: undefined,
    init: function() {
        this.control({
        	'gateway_gateway':{
    			beforerender: this._initViews
        	},
        	'gateway_gatewayList':{
        		afterrender: this._onRefresh
        	},
        	'gateway_gatewayList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'gateway_gatewayAdd button[action=save]': {
        		click: this._onAddgateway
        	},

        });
    },
netstylerender:function (cmp) {
  var _store = cmp.getStore();
  var params = {};

  params.type = 'net_type';
  params.des = '';
  _store.proxy.extraParams = {params: Ext.encode(params)};
  _store.load();
},
potocolrender:function (cmp) {
  var _store = cmp.getStore();
  var params = {};

  params.type = 'protocol';
  params.des = '';
  _store.proxy.extraParams = {params: Ext.encode(params)};
  _store.load();
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
        var spinfoses = Ext.ComponentQuery.query("form[name='gateway_gatewaySearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
         params.keyword = formParams.keyword;
        // params.gatewayname = formParams.gatewayname;
        // params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('gateway_gatewayList_Panel');
		var listStore = listGrid.getViewModel().getData().gatewayGrid;
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
    _onAddgateway: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
        params.gwid = formParams.gwid;
    		params.compid = formParams.compid;
    		params.dispname = formParams.dispname;
        params.netstyle = formParams.netstyle;
    		params.ipaddr = formParams.ipaddr;
    		params.port = formParams.port;
    		params.frametimeout = formParams.frametimeout;
    		params.rsptimeout = formParams.rsptimeout;
    		params.potocol = formParams.potocol;
        params.coninterval = formParams.coninterval;
    		params.devtype = formParams.devtype;
        params.loopinterval = formParams.loopinterval;
        params.start_date = formParams.start_date;
        params.pay_flag = formParams.pay_flag;
    		params.mainten_flag = formParams.mainten_flag;
        params.useflag = formParams.useflag;
    		var listStore = this.getView().getViewModel().getData().gatewayGrid;
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
    	var win = Ext.widget("gateway_gatewayAdd");
      var corpid_combo = win.down('combo[name=compid]');
      var _store  = corpid_combo.getStore();
      _store.proxy.url = _store.proxy.api.LIST;
      _store.load();
      if(just.data.user.loginInfo.roleid > 1){
        corpid_combo.setValue(just.data.user.loginInfo.corpid);
        corpid_combo.setReadOnly(true);
        corpid_combo.setFieldStyle('background:#F7F7F7;');
      }

    },


    /**
     * 显示修改界面
     */
    _onShowEditWin :function(grid, rowIndex, colIndex, node, e, record, rowEl){
      var win = Ext.widget("gateway_gatewayAdd");
      var corpid_combo = win.down('combo[name=compid]');
      var _store  = corpid_combo.getStore();
      _store.proxy.url = _store.proxy.api.LIST;
      _store.load();
      if(record.data==null || record.data==undefined){
        record = rowIndex;
      };
        win.down('form').loadRecord(record);
      if(just.data.user.loginInfo.roleid > 1){
        corpid_combo.setValue(just.data.user.loginInfo.corpid);
        corpid_combo.setReadOnly(true);
        corpid_combo.setFieldStyle('background:#F7F7F7;');
      }
      var date = win.down('datefield[name=start_date]');
      date.setValue(record.data.start_date.substring(0,10));

    },
    _onseesensor :function(grid, rowIndex, colIndex, node, e, record, rowEl){
      this.redirectTo('sensor');
      var spinfoses = Ext.ComponentQuery.query("form[name='sensor_sensorSearch_from']");
      var spinfose = spinfoses[spinfoses.length-1];
      var keyword = spinfose.down('textfield[name=keyword]');
      keyword.setValue(record.data.dispname);
      var serchbutton = spinfose.up('toolbar').down('button[action=refresh]');
      console.log(serchbutton);
      serchbutton.fireEvent('click');
      //serchbutton.Click();

    },
    /**
     * 删除经销商
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().gatewayGrid;
        var params = {};
        params.gatewayid = record.data.gwid;
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
dp_comb_render:function(cmp) {
  var _store = cmp.getStore();
  _store.proxy.url = _store.proxy.api.glist;
  _store.load();
},
	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        gateway_grid = refs.gateway_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,gateway_grid);
 	}

});
