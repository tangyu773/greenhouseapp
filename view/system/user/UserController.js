Ext.define('Admin.view.system.user.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_user_User',
    _container: undefined,
    _listGrid: undefined,
    _searchGrid: undefined,
    init: function() {
        this.control({
        	'system_user_User':{
    			beforerender: this._initViews
        	},
	        'system_user_UserSearch button[action=search]': {
	            click: this._onRefresh
	        },
        	'system_user_UserList':{
	            afterrender: this._onRefresh
        	},
		    'system_user_UserList actioncolumn': {
		    	onShowEditWin: this._onShowEditWin,
		    	onResetPassword: this._onResetPassword,
		    	onDelete: this._onDelete
	        },
	        'system_user_UserEdit': {
	        	render: this._onLoadBaseData
	        },
            'system_user_User treepanel[name=usertree]>treeview ':{
                beforedrop:this.beforeiteminsert        ,
                drop:this.iteminsert ,
            },
        });
    },
    /**
     * 界面加载后
     */
	_initViews : function(cmp, eOpts){
        // if(just.data.user.loginInfo.roleid == '1')
        // {
        //     cmp.down('panel[name=user_tree]').setHidden(false);
        // }
		this._container = cmp;
		this._listGrid = cmp.down('system_user_UserList');
		this._searchGrid = cmp.down('system_user_UserSearch');
	},
    /**
	 * 刷新
	 */
	_onRefresh:function(){
       //var dd =  this.lookupReference('userAdd');
    //   var roleViewModel =  this.getView();
		this._loadData();
	},
	/**
     * 初始化搜索参数
     * @private
     */
    _initSearchParams:function(){
        var userses = Ext.ComponentQuery.query("form[name='user_UserSearch_from']");
        var userse = userses[userses.length-1];
                var formParams =userse.getValues();

       // var formParams =Ext.ComponentQuery.query("form[name='system_user_UserSearch']")[0].getValues();
        //var formParams = Ext.getCmp('system_user_UserSearch').getValues();
        var params = {};
        params.name = formParams.usrname;
        params.corpname = formParams.compname;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
       var ulists =Ext.ComponentQuery.query("gridpanel[name='system_user_UserList']");
       var ulist = ulists[ulists.length-1];
        var listViewModel =  ulist.getViewModel(),
		data = listViewModel.getData(),
		listStore = data.UserGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();
	},
	/**
	 * 修改用户
	 */
    _onShowEditWin: function(column, grid, rowIndex, colIndex, node, e, record, rowEl){
        this.showEditView(record);
    },

	showEditView : function(record){
        /*this._isOnceEdit = true;
		this._isSchoolidEdit = true;*/
        var win = Ext.widget('system_user_UserEdit');
        win.down('form').loadRecord(record);
        win.down('textfield[name=account]').setValue(record.data.account);
	},
	/**
	 * 加载界面基础数据数据
	 */
	_onLoadBaseData : function(cmp, eOpts){
		//加载角色数据
		var viewModel =  cmp.getViewModel(),
		data = viewModel.getData(),
		roleStore = data.RoleGrid;
      	//角色
	   /* var params = {};
        params.usertype1 = '';
        roleStore.proxy.extraParams = {params: Ext.encode(params)};*/
        roleStore.proxy.url = roleStore.proxy.api.LIST;
        roleStore.load();

	},
    /**
     * 重置密码
     */
    _onResetPassword:function(grid, rowIndex, colIndex,b,h,v){
        var me = this;
        var params = {};
        params.id = v.data.staff_id;
        if(Ext.MessageBox.confirm("系统提示","是否重置密码？",function(e){
            if(e == 'yes'){
                just.showWaitingDlg("正在重置,请稍候...");
                Ext.Ajax.request({
                    url: me._listGrid.getStore().getProxy().api.REPWD,
                    params : {
                   	   params: Ext.encode(params)
                     },
                    success : function(response, options){
                        var json = Ext.JSON.decode(response.responseText);
                        just.hideWaitingDlg(json.info,false);
                        if (json.status == '200') {
                            me._loadData(me._listGrid.store.currentPage);
                            Ext.example.msg('系统提示', json.info);

                        }
                   }
                });
            }
        }));
    },

    /**
     * 禁用用户
     */
    _onDelete:function(grid, rowIndex, colIndex,b,h,v){
    	var me = this;
        var params = {};
        params.id = v.data.staff_id;
        console.log(params);
        if(v.data.useflag == 0){
        	params.useflag = 1;
        	if(Ext.MessageBox.confirm("系统提示","是否启用该用户？",function(e){
                if(e == 'yes'){
                    just.showWaitingDlg("正在启用用户,请稍候...");
                    Ext.Ajax.request({
                        url: me._listGrid.getStore().getProxy().api.DELETE,
                        params : {
                       	   params: Ext.encode(params)
                         },
                        success : function(response, options){
                            var json = Ext.JSON.decode(response.responseText);
                            just.hideWaitingDlg(json.info,false);
                            if (json.status == '200') {
                                me._loadData(me._listGrid.store.currentPage);
                                Ext.example.msg('系统提示', json.info);

                            }
                       }
                    });
                }
            }));
        }else{
        	params.useflag = 0;
        	if(Ext.MessageBox.confirm("系统提示","是否禁用该用户？",function(e){
                if(e == 'yes'){
                    just.showWaitingDlg("正在禁用用户,请稍候...");
                    Ext.Ajax.request({
                        url: me._listGrid.getStore().getProxy().api.DELETE,
                        params : {
                       	   params: Ext.encode(params)
                         },
                        success : function(response, options){
                            var json = Ext.JSON.decode(response.responseText);
                            just.hideWaitingDlg(json.info,false);
                            if (json.status == '200') {
                                me._loadData(me._listGrid.store.currentPage);
                                Ext.example.msg('系统提示', json.info);

                            }
                       }
                    });
                }
            }));
        }
    },

    onuseraddClick:function(){
        var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
            height = Math.floor(Ext.Element.getViewportHeight() * 0.56);
        var params= {
                targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '添加用户',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('userAdd',params);
            var win = Ext.getCmp('userAdd');
            var te = win.down('textfield[name=staff_id]');
            te.setReadOnly(false)  ;
            /*var corpid_combo = win.down('combo[name=corpid]');
            var _store  = corpid_combo.getStore();
            _store.proxy.url = _store.proxy.api.LIST;
            _store.load();*/

            if(just.data.user.loginInfo.roleid == 3 || just.data.user.loginInfo.roleid == 4){
            	corpid_combo.setValue(just.data.user.loginInfo.corpid);
            	corpid_combo.setReadOnly(true);
            	corpid_combo.setFieldStyle('background:#F7F7F7;');
            }

    },
    onusereditClick:function(grid, rowIndex, colIndex,b,h,v){
//        console.log(v.data);
        var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
        	height = Math.floor(Ext.Element.getViewportHeight() * 0.52);

        var params= {
            targetCfg: {
                //put any extra configs for your view here
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: '编辑用户',
                width:width,
                height:height
            }
        };

        this.setCurrentView('userAdd',params);
        var win = Ext.getCmp('userAdd');
      //	win.down('textfield[name=pwd]').setVisible(false);
      	if(v.data.roleid == just.data.user.loginInfo.roleid){
      		win.down('combo[name=roleid]').setVisible(false);
      	}

      	win.loadRecord(v);
      	var te = win.down('textfield[name=staff_id]');
      	te.setValue(v.data.staff_id);
      	te.setReadOnly(true)  ;
      	te.setFieldStyle('background:#F7F7F7;');

      	var re = win.down('radiogroup');
      	re.setValue({useflag:v.data.useflag});

      	/*var corpid_combo = win.down('combo[name=corpid]');
      	var _store  = corpid_combo.getStore();
      	_store.proxy.url = _store.proxy.api.LIST;
      	_store.load();
      	corpid_combo.setReadOnly(true);
      	corpid_combo.setFieldStyle('background:#F7F7F7;');*/

    },
    setCurrentView: function(view, params) {
       var cfg = Ext.apply({
                xtype: 'window',
                items: [
                    Ext.apply({
                        xtype: view
                    }, params.targetCfg)
                ]
            }, params.windowCfg);

            Ext.create(cfg);
    },

    onusersaveClick: function(view) {
        var me = this;
        var listStore = this.getView().getViewModel().getData().UserGrid;
        var addUrl = listStore.getProxy().api.ADD;
        var me = this;

        var win = view.up('window');
        var form = view.up('window').down('form');
        var type   = form.down('textfield[name=staff_id]').readOnly?1:0;

        var formparams = form.getValues();
        if(form.isValid()){
        	Ext.Ajax.request({
                submitEmptyText:true,
                url : just.getUrl('/sp/spinfo/as10_sp_spinfo_add_c.action'),
                params:{params:Ext.encode({corpid:formparams.compid})},
                success:function(response, opts){
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    if(jsonObj.status == '200'){
                    	var params = {};
		                params.staffid = formparams.staff_id;
		                params.staffname =  formparams.usrname;
		                params.phone =  formparams.mobilenum;
		                params.email =  formparams.email;
		                params.useflag =  formparams.useflag;
		                params.roleid =  formparams.roleid;
		                params.corpid =  jsonObj.info;
		                params.acttype = type;
		                just.showWaitingDlg("正在保存,请稍候...");
		                Ext.Ajax.request({
		                	submitEmptyText:true,
		                	url : addUrl,
		                	params:{params:Ext.encode(params)},
		                	success:function(response, opts){
		                		var jsonObj = Ext.JSON.decode(response.responseText);

		                		just.hideWaitingDlg(jsonObj.info,false);
		                		Ext.example.msg('系统提示', jsonObj.info);

		                		if(jsonObj.status == '200'){
		                			me._loadData();
		                			win.close();//关闭窗体
		                		}
		                	}
		                })
                    }
                }
            })
        }
    },
    _inituseraddView:function(cmp){
      var corpid_combo = cmp.down('combo[name=compid]');
      var _store  = corpid_combo.getStore();
      _store.proxy.url = _store.proxy.api.LIST;
      _store.load();
    },
    beforeiteminsert: function(node, data, overModel, dropPosition, dropHandlers) {//注：此处事件是gridviewdragdrop 的放置监听事件
              dropHandlers.wait = true;



              Ext.MessageBox.confirm('提示', '真的要移动吗？', function(btn){

                  if (btn === 'yes') {
                      dropHandlers.processDrop();
                  } else {
                      dropHandlers.cancelDrop();
                  }
              });
          },
    iteminsert: function( node, data, overModel, dropPosition, eOpts) {





              Ext.Ajax.request({
                    submitEmptyText:true,
                    url : just.getUrl('/sys/user/droptreepanel.action'),
                     params : {
                        id:data.records[0].raw.id,
                        pid: overModel.raw.pid
                     },

                    success:function(response, opts){
                       var jsonObj = Ext.JSON.decode(response.responseText);

                    Ext.Msg.alert('系统提示',jsonObj.info);

                    }
                });

          } ,
       _loadsubstaion:function(){
            var clists =Ext.ComponentQuery.query("window[name='Userstationlistwin']");
            var clist = clists[clists.length-1],


            listViewModel =  clist.getViewModel(),
            data = listViewModel.getData(),
            listStore = data.UserGrid;

            listStore.proxy.extraParams = {params: Ext.encode({saff_id:clist.win_staff_id})};
            listStore.proxy.url = listStore.proxy.api.LOADSTATION;
            listStore.load();
          },



        onsubstationaddClick:function(c){
            var sub_staffid = c.up('window').win_staff_id;
            var win = this.lookupReference('Userstationwin');

            if (!win) {
                win = new Admin.view.system.user.Userstationwin();
                this.getView().add(win);
            }

            win.show();
            win.win_staff_id = sub_staffid;


           this._loadaddsubstation();
        },


    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        user_grid = refs.user_grid;

        var util = Ext.create(just.createUtil('Permission'));
                util.initPermission(cmp,user_grid);

             },


});
