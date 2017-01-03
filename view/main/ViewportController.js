Ext.define('Admin.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
    _treestore:undefined,
	init : function() {
		this.control({
		    'main_Viewport':{
                beforerender:this.initUserInfo
            }
		});
	},
    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    /**
     * 设置隐藏、展示左边菜单
     */
    onToggleNavigationSize: function () {
    	//查找到左边控件是扩展还是隐藏，并设置宽度
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 220;
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();
            //设置上面标题的宽度
            refs.senchaLogo.setWidth(new_width);
            //设置左边菜单项的宽度
            navigationList.setWidth(new_width);
            //设置隐藏还是展示
            navigationList.setMicro(collapsing);
            //回复布局
            Ext.resumeLayouts();
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();
        }
        else {
            if (!collapsing) {
                navigationList.setMicro(false);
            }
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                    },
                    single: true
                });
            }
        }
    },
    /**
     * 初始化用户信息
     * @param cmp
     * @param eOpts
     */
    initUserInfo: function(cmp, eOpts){
        var me = this;

        Ext.Ajax.request({
            url:just.getUrl('/sys/user/loadLoginInfo.action'),
            waitMsg :'...加载用户信息',
            success:function(response,opts){
                if(response.status == 200){
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    var loginInfo = jsonObj.rows;
                    var ulists =Ext.ComponentQuery.query("tbtext[name='main_Viewport_tbtextjs']");
                    var ulist = ulists[ulists.length-1];
                    ulist.setText(loginInfo.roledes +' : '+loginInfo.staffname)  ;
                    just.data.user.loginInfo  = loginInfo;
                    console.log(  just.data.user.loginInfo);
                    if(loginInfo.roleid>1){
                    //	me.initTask(loginInfo);
                    }
                }else{
                    me.initUserInfo(cmp,eOpts);
                }
            }
        });
    },

    /**
     * 初始化combo
     */
    _init_combo_params : function( combo, type,param){
    	var base_store  = combo.getStore();
    	var params = {};
    	var module =param+'_base';
    	params.module = module;
    	params.type = type;
    	base_store.proxy.extraParams = {
  			params: Ext.encode(params)
      	};
    	base_store.proxy.url = base_store.proxy.api.PARAM_NAME_LIST;
    	base_store.load();
    },

    /**
     * 根据compoment 获取模块信息
     */
    _getModuleData: function(compoment){
    	var params = {};
    	Ext.Ajax.request({
    		async : false,
            url : just.getUrl('/sys/module/sys_module_data_query_r.action'),
            params:{params:Ext.encode({compoment:compoment})},
            success:function(response, opts){
                var jsonObj = Ext.JSON.decode(response.responseText);
                console.log(jsonObj);
                if(jsonObj.rows!=undefined){
                	params.compoment = jsonObj.rows[0].compoment;
                	params.moduledes = jsonObj.rows[0].moduledes;
                	params.moduleid = jsonObj.rows[0].moduleid;
                	params.moduleurl = jsonObj.rows[0].moduleurl;
                	params.param = jsonObj.rows[0].param;
                }
            }
        })
        return params;
    },

    /**
     * 初始化任务数量
     */
    initTask: function(loginInfo){
    	var me = this;
    	var params = {};
    	params.roleid = loginInfo.roleid;
    	params.corpid = loginInfo.corpid;
    	Ext.Ajax.request({
            url: just.getUrl('/sys/user/sys_user_task_query_r.action'),
            params: {params:Ext.encode(params)},
            success: function(response, opts){
                var jsonObj = Ext.JSON.decode(response.responseText);
                console.log(jsonObj);
                if(jsonObj.status == '200' && jsonObj.total > 0){
                	var btns =Ext.ComponentQuery.query("button[name='main_Viewport_button']");
                	var btn = btns[btns.length-1];
                	btn.setText('<span class="form_require_symbol">待处理任务'+jsonObj.total+'条</span>');
                	for(var i=0; i<jsonObj.total; i++){
                		btn.menu.add({
                			iconCls: 'icon-circle-blank',
                			id: 'menu_'+jsonObj.rows[i].productcode,
                			text:jsonObj.rows[i].prodname + (jsonObj.rows[i].corpname==undefined?'':'-'+ jsonObj.rows[i].corpname),
                			data: jsonObj.rows[i],
                			handler : function(menu,item){
                				var module = me._getModuleData("product.Product");
                				console.log(module);
                				me.setCurrentView(module.param?module.param:'');
                				var win = Ext.widget('product_ProductEdit');
                				console.log(menu.config.data);
                				win.down('form').getForm().setValues(menu.config.data);
                				if(menu.config.data.instruse != null && menu.config.data.instruse != ""){
                		        	win.down('image[name=image]').setSrc(just.rootPath() + "/" + menu.config.data.instruse);
                				}else{
                					win.down('image[name=image]').setSrc(just.rootPath()+'/resources/images/spinfo_default_logo.jpg');
                				}
                		        //大类
                		    	var combo = win.down('combo[name=cls1]');
                		    	me._init_combo_params(combo, 'cls1',module.param);
                		    	//小类
                		    	var combo = win.down('combo[name=cls2]');
                		    	me._init_combo_params(combo, 'cls2',module.param);
                		    	//产品分类
                		    	var combo = win.down('combo[name=subtypeno]');
                		    	me._init_combo_params(combo, 'subtypeno',module.param);
                		    	//服用类型
                		    	var combo = win.down('combo[name=usetype]');
                		    	me._init_combo_params(combo, 'usetype',module.param);
                		    	//保存方式
                		    	var combo = win.down('combo[name=storage]');
                		    	me._init_combo_params(combo, 'storage',module.param);
                   		 	}
            			});
                	}
                }
            }
        });
    },

    /**
     * 初始化数据
     */
    onMainViewRender:function(cmp) {

    },

    /**
     * 跳转界面
     */
    setCurrentView: function(menuid,nodes) {

        var me = this,
        refs = me.getReferences();
        navigationList = refs.navigationTreeList,
        store = navigationList.getStore();
        if(this._treestore == undefined){
            this._treestore = Ext.create('Admin.store.NavigationTree');
            this._treestore.load({
            callback: function(records, options, success){

                 me.setCurrentView_back(menuid,nodes,me._treestore);


            }
        });
        }
        else{
            me.setCurrentView_back(menuid,nodes,me._treestore);
        }

    },

    setCurrentView_back:function(menuid,nodes,listStore){
            var me = this,
            refs = me.getReferences();

            var node = listStore.findNode('param', menuid),
                view = node ? node.get('compoment') : null,
                mainCard = refs.mainCardPanel,
                mainLayout = mainCard.getLayout(),
                viewModel = me.getViewModel(),
                vmData = viewModel.getData(),
                existingItem = mainCard.child('component[menuid=' + menuid + ']'),
                lastView = vmData.currentView,
                newView;

                if (lastView && lastView.isWindow) {
                    lastView.destroy();
                }
                lastView = mainLayout.getActiveItem();
                if (!existingItem) {
                    newView = Ext.create('Admin.view.' + (view /*|| 'pages.Error404Window'*/), {
                        hideMode: 'offsets',
                        menuid: menuid,
                        rawParams:node.raw,
                    });
                }
                //判断当前界面是不是刚执行的页面
                if (!newView || !newView.isWindow) {
                    if (existingItem) {
                        if (existingItem !== lastView) {
                            mainLayout.setActiveItem(existingItem);
                        }
                        newView = existingItem;
                    }
                    else {
                        Ext.suspendLayouts();
                        mainLayout.setActiveItem(mainCard.add(newView));
                        Ext.resumeLayouts(true);
                    }
                }
                //设置当前选择的界面
                navigationList.setSelection(node);
                if (newView.isFocusable(true)) {
                    newView.focus();
                }
                vmData.currentView = newView;
        },
    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('compoment')) {
            this.redirectTo(node.get("param"));
        }
    },
    onMainViewRender:function() {
        if (!window.location.hash) {
          this.redirectTo("widgets");
           //var newView = Ext.create('Admin.view.authentication.LockScreen' );
            //this.redirectTo("widgets");
        }
    },
    onRouteChange:function(id){
        this.setCurrentView(id);
    },
    onloginClick:function(){
      //   var newView = Ext.create('Admin.view.authentication.LockScreen' );
      //   return;
      var me = this;
         if(Ext.MessageBox.confirm("系统提示","是否要退出系统",function(e){
            if(e == 'yes'){
              Ext.Ajax.request({
                  url: 'logout.action',

               success : function(response, options){
                  var newLoginForm = Ext.create('Admin.view.authentication.LockScreen' );
                //  newLoginForm.down('textfield[name="account"]').focus( );
                //  newLoginForm.down('textfield[name="password"]').setValue(null );
              }
          });
              //  window.location.href='login.html';


            }
        }));
    },

    onrepwdclick:function(grid, rowIndex, colIndex,b,h,v){
      var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
      height = Math.floor(Ext.Element.getViewportHeight() * 0.4);

      var params= {
       targetCfg: {

       },
       windowCfg: {

           title: '修改密码',
           width:width,
           height:height
       },
   };
   //
    this.setwinView('userrepwd',params);
         //Ext.MessageBox.prompt('请输入', '请输入旧密码', this.showResultText, this);



     },
     setwinView: function(view, params) {
      var cfg = Ext.apply({
         xtype: 'window',
         items: [
         Ext.apply({
             xtype: view
         }, params.targetCfg)
         ]
     }, params.windowCfg);

            // Ext.create(cfg);
      this.getView().add(Ext.create(cfg));
        },
     showResultText: function(btn, text) {
        if(btn == 'ok'){

        var me =this;

        var params={};
            params.account = just.data.user.loginInfo.staff_id;
            params.password =  text;

            Ext.Ajax.request({

                submitEmptyText:true,
                url : 'validatepwd.action',
                params : {
                        account: just.data.user.loginInfo.staff_id,
                        password: Ext.util.MD5(text)
                     },
                success:function(response, opts){
                    var jsonObj = Ext.JSON.decode(response.responseText);

                    if( jsonObj.success)
                    {
                        Ext.MessageBox.prompt('请输入', '请输入新密码', me.showResultText1, this);
                    }
                    else
                    {
                        Ext.example.msg('系统提示', jsonObj.info );
                    }


                }
            })
        }
    },
    showResultText1: function(cmp) {
        var me =this;
        var win = cmp.up('window');
        var form = cmp.up('window').down('form');
        var formparams = form.getValues();

            if(formparams.repeatPassword != formparams.password){
    		Ext.Msg.alert('提示', '两次输入的新密码不一致！');
    		return;
    	};
            Ext.Ajax.request({

                submitEmptyText:true,
                url : 'updatepwd.action',
                params : {
                        account: just.data.user.loginInfo.staff_id,
                        oldpassword: Ext.util.MD5(formparams.oldpassword),
                        password: Ext.util.MD5(formparams.password)
                     },
                success:function(response, opts){
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    win.close();
                    Ext.example.msg('系统提示', jsonObj.info);
                }
            })

    },

});
