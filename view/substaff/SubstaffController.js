Ext.define('Admin.view.substaff.SubstaffContraller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.substaff_substaff',
   	
	
	/**
	 * 加载数据
	 */
	_loadData : function(page){
        var ulists =Ext.ComponentQuery.query("container[name='substaff_substaff']");
       var ulist = ulists[ulists.length-1];
        var listViewModel =  ulist.getViewModel(),
        data = listViewModel.getData(),
        listStore = data.UserGrid;

        /*var me = this,
           viewModel = me.getViewModel(),

		data = viewModel.getData(),
		listStore = data.UserGrid;*/
		
		
		listStore.load();
        //Ext.toast('数据加载成功', '提示','t');
	},

    
/*	showEditView : function(record){
        var win = Ext.widget('system_user_UserEdit');
        win.down('form').loadRecord(record);
        
        win.down('textfield[name=account]').setValue(record.data.account);
	},*/
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
    _ondelcontactClick:function(grid, rowIndex, colIndex,b,h,v){


        var me = this,
        viewModel = me.getViewModel(),

        data = viewModel.getData(),
        listStore = data.UserGrid;
        var params = {};
        params.id = v.data.idcard;
        if(Ext.MessageBox.confirm("系统提示","是否删除联系人？",function(e){
            if(e == 'yes'){
                just.showWaitingDlg("请稍候...");
                Ext.Ajax.request({
                    url: listStore.getProxy().api.DEL,
                    params : {
                   	   params: Ext.encode(params)
                     },
                    success : function(response, options){
                        var json = Ext.JSON.decode(response.responseText);
                        just.hideWaitingDlg(json.info,false);
                        if (json.status == '200') {
                            me._loadData();
                            Ext.example.msg('系统提示', json.info);
                        	
                        }
                   }
                });
            }
        }));
    },
    onuseraddClick:function(){

        var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
            height = Math.floor(Ext.Element.getViewportHeight() * 0.27);
        var params= {
                targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '添加常用联系人',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('contactadd',params);
            var me = this,
            refs = me.getReferences(),
             contactadd = refs.contactadd;
            
           contactadd.loadRecord(v);
           var contactadd_idcard = contactadd.down('textfield[name=idcard]');
           contactadd_idcard.setReadOnly(false)  ;
          
    },
    onusereditClick:function(grid, rowIndex, colIndex,b,h,v){
    

            var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
            height = Math.floor(Ext.Element.getViewportHeight() * 0.27);

       
 
        
            var params= {
                targetCfg: {
                    
                },
                windowCfg: {
                    
                    title: '编辑常用联系人',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('contactadd',params);
            var me = this,
            refs = me.getReferences(),
             contactadd = refs.contactadd;
            
           contactadd.loadRecord(v);
           var contactadd_idcard = contactadd.down('textfield[name=idcard]');
           contactadd_idcard.setReadOnly(true)  ;
           

   
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

           // Ext.create(cfg);
            this.getView().add(Ext.create(cfg));
    },
   
    onusersaveClick: function(view) {
        var me = this;
        var listStore = this.getView().getViewModel().getData().UserGrid;
        var addUrl = listStore.getProxy().api.ADD;
        var me = this;
       
        var win = view.up('window');
        var form = view.up('window').down('form');
        var type   = form.down('textfield[name=idcard]').readOnly?1:0;

        var formparams = form.getValues();
        if(form.isValid()){
           just.showWaitingDlg("正在保存,请稍候...");
            var params={};
            params.usrname =  formparams.name;
            params.idcard =  formparams.idcard;
            params.acttype = type;
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
    },
 

});
