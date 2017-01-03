Ext.define('Admin.view.area.areaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.area_area',
    _container: undefined,
    init: function() {
        this.control({
        	'area_area':{
    			beforerender: this._initViews
        	},
        	'area_areaList':{
        		afterrender: this._onRefresh
        	},
        	'area_areaList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'area_areaAdd button[action=save]': {
        		click: this._onAddarea
        	},

        });
    },

_initareaaddView:function (cmp) {
  var corpid_combo = cmp.down('combo[name=compid]');
  var _store  = corpid_combo.getStore();
  _store.proxy.url = _store.proxy.api.LIST;
  _store.load();
  if(just.data.user.loginInfo.roleid >1){
    corpid_combo.setValue(just.data.user.loginInfo.corpid);
    corpid_combo.setReadOnly(true);
    corpid_combo.setFieldStyle('background:#F7F7F7;');
  }

},
comp_change: function(c, nv, ov, opts) {
    var comb = c.up('form').down('tagfield');
    comb.setValue(null);
    /*if (comb.cflag === 1) {
        comb.setValue(null);
    }
    else{
      return;
    }*/

    if (c.isValid()) {
        comb.setReadOnly(false);
        comb.getStore().proxy.extraParams = {
            params: Ext.encode({
                compid: nv
            })
        };
        comb.getStore().proxy.url = comb.getStore().proxy.api.stafflist;
        comb.getStore().load();
    }

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
        var spinfoses = Ext.ComponentQuery.query("form[name='area_areaSearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        // params.corpname = formParams.corpname;
        // params.areaname = formParams.areaname;
        // params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('area_areaList_Panel');
		var listStore = listGrid.getViewModel().getData().areaGrid;
		var params = this._initSearchParams();
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
    _onAddarea: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
        params.areaid = formParams.areaid;
    		params.areaname = formParams.areaname;
        params.areacontactmobile = formParams.areacontactmobile;
    		params.compid = formParams.compid;

    		params.gh_num = formParams.gh_num;
    		params.gw_num = formParams.gw_num;
    		params.sensor_num = formParams.sensor_num;

        if (formParams.staffids != '') {
            params.staffids = formParams.staffids.join(',');
        } else {
            params.staffids = '';
        }

    		var listStore = this.getView().getViewModel().getData().areaGrid;
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
    	var win = Ext.widget("area_areaAdd");
      var staffids_tagfile = win.down('combo[name=staffids]');
      staffids_tagfile.cflag = 1;
    },


    /**
     * 显示修改界面
     */
    _onShowEditWin :function(grid, rowIndex, colIndex, node, e, record, rowEl){
      var win = Ext.widget("area_areaAdd");

      if(record.data==null || record.data==undefined){
        record = rowIndex;
      };
      var staffids_tagfile = win.down('combo[name=staffids]');



    //  staffids_tagfile.setReadOnly(false);
    //  staffids_tagfile.setValue(record.data.staffids.split(','));
      //  win.down('form').loadRecord(record);




    var feedback_store = staffids_tagfile.getStore();
    feedback_store.proxy.extraParams = {
          params: Ext.encode({
              compid: record.data.compid
          })
      };
      feedback_store.proxy.url = feedback_store.proxy.api.stafflist;

      feedback_store.load({
          callback: function(records, operation, success) {
              if (success) {
                  if (record.data.staffids != null) {
                      //staffids_tagfile.setValue(record.feedback_field_names.split(','));
                      win.down('form').loadRecord(record);
                      staffids_tagfile.setValue(record.data.staffids.split(','));
                  }
              }


          }
      });

    },

    /**
     * 删除经销商
     */
    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().areaGrid;
        var params = {};
        params.areaid = record.data.areaid;
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
        area_grid = refs.area_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,area_grid);
 	}

});
