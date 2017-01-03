Ext.define('Admin.view.sensor.sensorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sensor_sensor',
    reference: 'sensorController',

    _container: undefined,
    init: function() {
        this.control({
        	'sensor_sensor':{
    			beforerender: this._initViews
        	},
        	'sensor_sensorList':{
        		afterrender: this._onRefresh
        	},
        	'sensor_sensorList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'sensor_sensorAdd button[action=save]': {
        		click: this._onAddsensor
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
	_onRefresh:function(cmp){



    /*cmp.getEl().swallowEvent([
                    'mousedown', 'mouseup', 'click',
                    'contextmenu', 'mouseover', 'mouseout',
                    'dblclick', 'mousemove'
        ], true);
        cmp.down('textfield[name=keyword]').getEl().swallowEvent([
                        'mousedown', 'mouseup', 'click',
                        'contextmenu', 'mouseover', 'mouseout',
                        'dblclick', 'mousemove'
            ], false);*/
		this._loadData();

	},
	/**
     * 初始化搜索参数
     * @private
     */
    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='sensor_sensorSearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.keyword = formParams.keyword;
        // params.sensorname = formParams.sensorname;
        // params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('sensor_sensorList_Panel');
		var listStore = listGrid.getViewModel().getData().sensorGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();

    listGrid.plugins[0]._store.load();
	},
	 /**
     * 添加经销商
     */
    _onAddsensor: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
      var devtpid = form.down('combo[name=devtypeid]').rawValue;




    	if(form.isValid()){
    		var formParams = form.getValues();
        var isrs = devtpid.substring(devtpid.lastIndexOf('-')+1,devtpid.length);
    		var params = {};

        params.devtypeid = formParams.devtypeid;
    		params.compid = formParams.compid;
    		params.gwid = formParams.gwid;
        params.devaddr = formParams.devaddr;
    		params.x = formParams.x;
    		params.y = formParams.y;
    		params.z = formParams.z;
    		params.useflag = formParams.useflag;
        params.sn = formParams.sn;
        params.isrs = isrs;
        params.ipparam = formParams.ipparam;




    		var listStore = this.getView().getViewModel().getData().sensorGrid;
        var url =listStore.proxy.api.ADD;
        if(formParams.senid != '0')
        {
          params.senid = formParams.senid;
          url = listStore.proxy.api.upd;

        }
    		just.showWaitingDlg("请稍候...");
    		Ext.Ajax.request({
    			url: url,
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
      else{
        Ext.Msg.alert('系统提示','参数不全！');
      }
    },

    /**
     * 显示添加界面
     */
     addlogicdata:function(cmp){
  
      cmp.getEl().swallowEvent([
                      'mousedown', 'mouseup', 'click',
                      'contextmenu', 'mouseover', 'mouseout',
                      'dblclick', 'mousemove'
          ], true);
      cmp.down('textfield[name=keyword]').getEl().swallowEvent([
                          'mousedown', 'mouseup', 'click',
                          'contextmenu', 'mouseover', 'mouseout',
                          'dblclick', 'mousemove'
              ], false);


     },
    _onShowAddWin: function(sedit){
    	var win = Ext.widget("sensor_sensorAdd");
      win.down('combo[name=devaddr]').cflag = 1;
      var corpid_combo = win.down('combo[name=compid]');
      var _store  = corpid_combo.getStore();
      _store.proxy.url = _store.proxy.api.LIST;
      _store.load();
      var gateway_combo = win.down('combo[name=gwid]');
      var _gwstore  = gateway_combo.getStore();
      _gwstore.proxy.url = _gwstore.proxy.api.LIST;
      _gwstore.load();
      var dev_combo = win.down('combo[name=devtypeid]');
      var _devstore  = dev_combo.getStore();
      //_devstore.proxy.url = _devstore.proxy.api.LIST;
      _devstore.load();
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
      var win = Ext.widget("sensor_sensorAdd");
      win.down('combo[name=devaddr]').cflag = 0;
      var corpid_combo = win.down('combo[name=compid]');
      var _store  = corpid_combo.getStore();
      _store.proxy.url = _store.proxy.api.LIST;
      _store.load();
      var gateway_combo = win.down('combo[name=gwid]');
      var _gwstore  = gateway_combo.getStore();
      _gwstore.proxy.url = _gwstore.proxy.api.LIST;
      _gwstore.load();
      var dev_combo = win.down('combo[name=devtypeid]');
      var _devstore  = dev_combo.getStore();
      //_devstore.proxy.url = _devstore.proxy.api.LIST;
      _devstore.load();
        win.down('form').loadRecord(record);
      if(just.data.user.loginInfo.roleid > 1){
        corpid_combo.setValue(just.data.user.loginInfo.corpid);
        corpid_combo.setReadOnly(true);
        corpid_combo.setFieldStyle('background:#F7F7F7;');
      }


    },

    /**
     * 删除经销商
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().sensorGrid;
        var params = {};
        params.sensorid = record.data.senid;
    	if(Ext.MessageBox.confirm("系统提示","是否删除选中？",function(e){
            if(e == 'yes'){
                 just.showWaitingDlg("正在删除,请稍候...");
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
dev_change:function (c,nv,ov,opts) {
  var myform = c.up('form');
  var isrs =  c.rawValue;
  isrs = isrs.substring(isrs.lastIndexOf('-')+1,isrs.length);
  var ipparam = myform.down('textfield[name=ipparam]');
  var gwid = myform.down('combo[name=gwid]');
  var devaddr = myform.down('combo[name=devaddr]');
  if(isrs == '0'){
    ipparam.show();
    gwid.hide();
    devaddr.hide();
    ipparam.allowBlank = false;
    gwid.allowBlank = true;
    devaddr.allowBlank = true;
  }
  else{
    ipparam.hide();
    gwid.show();
    devaddr.show(true);
    ipparam.allowBlank = true;
    gwid.allowBlank = false;
    devaddr.allowBlank = false;
  }
},
gw_change:function(c,nv,ov,opts){
  var comb = c.up('form').down('combo[name=devaddr]');
  if(comb.cflag === 1){
     comb.setValue(null);
  }
  //  comb.setValue(null);


        if(c.isValid())
        {
            comb.setReadOnly(false) ;
            comb.getStore().proxy.extraParams = {gwid:nv };
            comb.getStore().load();

          /*  Ext.Ajax.request({
              url: 'sys/product/searchdevaddr.action',
              params: {gwid:nv },
              success: function(response, options){
                var jsonObj = Ext.JSON.decode(response.responseText);

                comb.getStore().loadData(jsonObj);


              }
            });*/


        }

},
	/**
	 * 初始化权限
	 */
   test:function (cmp) {
     console.log(cmp);
   },
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        sensor_grid = refs.sensor_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,sensor_grid);
 	},
  _onseevideo:function (cmp, cell, index, row, event, raw, eOpts){
    Ext.Msg.alert('系统提示','catch you！');
		/*var component = 'exam.test.TestPaperView';
		var audit=raw.get("audit");
		var flag=0;
		if(audit==0)
			flag=1;
		this._testPaperController.forward(component, raw,flag);*/

	},


});
