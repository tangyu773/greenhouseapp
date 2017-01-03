Ext.define('Admin.view.product.ProductController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.product_Product',
    _container: undefined,
    init: function() {
        this.control({
        	'product_Product':{
    			beforerender: this._initViews
        	},
        	'product_ProductList':{
        		afterrender: this._onRefresh,
        		itemdblclick: this._onShowEditWin1
        	},
        	'product_ProductList button[action=add]':{
        		click: this._onShowAddWin
        	},
        	'product_ProductAdd button[action=save]':{
        		click: this._onAddProduct
        	},
        	'product_ProductEdit button[action=save]':{
        		click: this._onEditProduct
        	},
        	'product_ProductAdd':{
        		afterrender : this._onClickAddImg
        	},
        	'product_ProductEdit':{
        		afterrender : this._onClickEditImg
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
        var spinfoses = Ext.ComponentQuery.query("form[name='spinfo_ProductSearch_from']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.corpid = just.data.user.loginInfo.corpid;
        params.corpname = formParams.corpname;
        params.prodname = formParams.prodname;
        params.productcode = formParams.productcode;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
		var listGrid = Ext.getCmp('product_ProductList_Panel');
		var listStore = listGrid.getViewModel().getData().ProductGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();
	},
	
	/**
     * 添加产品
     */
    _onAddProduct: function(btn){
		var me = this;
		var listStore = this.getView().getViewModel().getData().ProductGrid;
		var win = btn.up('window');
		var form = win.down('form');
		if(form.isValid()){
			just.showWaitingDlg("正在保存产品信息,请稍候...");
			form.getForm().doAction('submit',{
				url : listStore.getProxy().api.ADD,
				method : 'POST',
				submitEmptyText : false,
				timeout : 60000,
				success : function(response, options){
					var result = options.result;
					just.hideWaitingDlg(result.info, true);
					if(result.success){
						win.close();
						me._loadData(1);
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
     * 显示添加界面
     */
    _onShowAddWin: function(){
    	var win = Ext.widget("product_ProductAdd");
    	//大类
    	var combo = win.down('combo[name=cls1]');
    	this._init_combo_params(combo, 'cls1');
    	//小类
    	var combo = win.down('combo[name=cls2]');
    	this._init_combo_params(combo, 'cls2');
    	//产品分类
    	var combo = win.down('combo[name=subtypeno]');
    	this._init_combo_params(combo, 'subtypeno');
    	//服用类型
    	var combo = win.down('combo[name=usetype]');
    	this._init_combo_params(combo, 'usetype');
    	//保存方式
    	var combo = win.down('combo[name=storage]');
    	this._init_combo_params(combo, 'storage');
    	
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
                var btns =Ext.ComponentQuery.query("button[name='main_Viewport_button']");
                var btn = btns[btns.length-1];
                if(jsonObj.status == '200' && jsonObj.total > 0){ 
                	btn.setText('<span class="form_require_symbol">待处理任务'+jsonObj.total+'条</span>');
                	btn.menu.removeAll();
                	for(var i=0; i<jsonObj.total; i++){
                		btn.menu.add({
                			id: 'menu_'+jsonObj.rows[i].productcode,
                			text:jsonObj.rows[i].prodname + (jsonObj.rows[i].corpname==undefined?'':'-'+ jsonObj.rows[i].corpname),
                			data: jsonObj.rows[i],
                			handler : function(menu,item){
                				var win = Ext.widget('product_ProductEdit');
                				win.down('form').getForm().setValues(menu.config.data);
                				if(menu.config.data.instruse != null && menu.config.data.instruse != ""){
                		        	win.down('image[name=image]').setSrc(just.rootPath() + "/" + menu.config.data.instruse);
                				}else{
                					win.down('image[name=image]').setSrc(just.rootPath()+'/resources/images/spinfo_default_logo.jpg');
                				}
                		        //大类
                		    	var combo = win.down('combo[name=cls1]');
                		    	me._init_combo_params(combo, 'cls1');
                		    	//小类
                		    	var combo = win.down('combo[name=cls2]');
                		    	me._init_combo_params(combo, 'cls2');
                		    	//产品分类
                		    	var combo = win.down('combo[name=subtypeno]');
                		    	me._init_combo_params(combo, 'subtypeno');
                		    	//服用类型
                		    	var combo = win.down('combo[name=usetype]');
                		    	me._init_combo_params(combo, 'usetype');
                		    	//保存方式
                		    	var combo = win.down('combo[name=storage]');
                		    	me._init_combo_params(combo, 'storage');
                   			 	console.log(item);
                   		 	}
            			});
                	}
                }else{
                	btn.menu.removeAll();
                	btn.setText('待处理任务0条');
                }
            }
        });
    },
	
    /**
     * 修改产品
     */
    _onEditProduct: function(btn){
    	var me = this;
		var listStore = this.getView().getViewModel().getData().ProductGrid;
		var win = btn.up('window');
		var form = win.down('form');
		if(form.isValid()){
			just.showWaitingDlg("正在保存产品信息,请稍候...");
			form.getForm().doAction('submit',{
				url : listStore.getProxy().api.UPDATE,
				method : 'POST',
				submitEmptyText : false,
				timeout : 60000,
				success : function(response, options){
					var result = options.result;
					just.hideWaitingDlg(result.info, true);
					if(result.success){
						win.close();
						me._loadData(1);
						if(just.data.user.loginInfo.roleid >= 2){
							me.initTask(just.data.user.loginInfo);
						}
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
     * 初始化combo
     */
    _init_combo_params : function( combo, type){
    	var base_store  = combo.getStore();
    	var params = {};
    	var module ='product_base';
    	params.module = module;
    	params.type = type;
    	base_store.proxy.extraParams = {
  			params: Ext.encode(params)
      	};
    	base_store.proxy.url = base_store.proxy.api.PARAM_NAME_LIST;
    	base_store.load();
    },
    
    /**
     * 显示修改界面
     */
    _onShowEditWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
        var win = Ext.widget('product_ProductEdit');
        win.down('form').loadRecord(record);
        if(record.data.instruse != null && record.data.instruse != ""){
        	win.down('image[name=image]').setSrc(just.rootPath() + "/" + record.data.instruse);
		}else{
			win.down('image[name=image]').setSrc(just.rootPath()+'/resources/images/spinfo_default_logo.jpg');
		}
        //大类
    	var combo = win.down('combo[name=cls1]');
    	this._init_combo_params(combo, 'cls1');
    	//小类
    	var combo = win.down('combo[name=cls2]');
    	this._init_combo_params(combo, 'cls2');
    	//产品分类
    	var combo = win.down('combo[name=subtypeno]');
    	this._init_combo_params(combo, 'subtypeno');
    	//服用类型
    	var combo = win.down('combo[name=usetype]');
    	this._init_combo_params(combo, 'usetype');
    	//保存方式
    	var combo = win.down('combo[name=storage]');
    	this._init_combo_params(combo, 'storage');
    },
    
    _onShowEditWin1: function(cmp, record, item, index, e, eOpts){
    	var win = Ext.widget('product_ProductEdit');
    	win.down('form').loadRecord(record);
        if(record.data.instruse != null && record.data.instruse != ""){
        	win.down('image[name=image]').setSrc(just.rootPath() + "/" + record.data.instruse);
		}else{
			win.down('image[name=image]').setSrc(just.rootPath()+'/resources/images/spinfo_default_logo.jpg');
		}
        //大类
    	var combo = win.down('combo[name=cls1]');
    	this._init_combo_params(combo, 'cls1');
    	//小类
    	var combo = win.down('combo[name=cls2]');
    	this._init_combo_params(combo, 'cls2');
    	//产品分类
    	var combo = win.down('combo[name=subtypeno]');
    	this._init_combo_params(combo, 'subtypeno');
    	//服用类型
    	var combo = win.down('combo[name=usetype]');
    	this._init_combo_params(combo, 'usetype');
    	//保存方式
    	var combo = win.down('combo[name=storage]');
    	this._init_combo_params(combo, 'storage');
    },
	
    /**
     * 删除产品
     */
    _onDelete :function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var listStore = this.getView().getViewModel().getData().ProductGrid;
        var params = {};
        params.productcode = record.data.productcode;
    	if(Ext.MessageBox.confirm("系统提示","是否禁用选中产品？",function(e){
            /*if(e == 'yes'){
                 just.showWaitingDlg("正在禁用选中产品,请稍候...");
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
             }*/
         }));
    },
    
    /**
     * 显示产品详情
     */
    _onShowDetails :function(grid, rowIndex, colIndex, node, e, record, rowEl){
        var editView = Ext.widget('product_ProductDetails');
        editView.down('form').loadRecord(record);
        if(record.data.instruse != null && record.data.instruse != ""){
        	editView.down('image[name=image]').setSrc(just.rootPath() + "/" + record.data.instruse);
		}else{
			editView.down('image[name=image]').setSrc(just.rootPath()+'/resources/images/spinfo_default_logo.jpg');
		}
    },
    
    _onClickAddImg : function(){
    	var imgDom = Ext.getDom("productAdd_image_id");
    	this._onClickImg(imgDom);
    },
    _onClickEditImg : function(){
    	var imgDom = Ext.getDom("productEdit_image_id");
    	this._onClickImg(imgDom);
    },
    /**
	 * 点击图片显示大图
	 */
	_onClickImg : function(imgDom){
		imgDom.onclick = function(){
			window.open(imgDom.src);
		}
    },
    
    
	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        product_grid = refs.product_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,product_grid);
 	}

});
