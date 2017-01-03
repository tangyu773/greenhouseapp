Ext.define('Admin.view.order.OrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.order_order',
    _container: undefined,
    _listGrid: undefined,
    _searchGrid: undefined,
    init: function() {
        this.control({
        	'order_order':{
    			//afterrender: this._onLoadBaseData
        	},
	        'system_user_UserSearch button[action=search]': {
	            click: this._onRefresh
	        },
        	'system_user_UserList':{
	            //afterrender: this._loadData
        	},
		    'system_user_UserList actioncolumn': {  
		    	onShowEditWin: this._onShowEditWin,
		    	onResetPassword: this._onResetPassword,
		    	onDelete: this._onDelete
	        },
	        'system_user_UserEdit': {
	        	//render: this._onLoadBaseData
	        }
        });
    },	
    /**
     * 界面加载后
     */
	_initViews : function(cmp, eOpts){
		
	},

	/**
     * 初始化搜索参数
     * @private
     */
    _initSearchParams:function(){
        var userses = Ext.ComponentQuery.query("form[name='order_search_form']");
        var userse = userses[userses.length-1];
                var formParams =userse.getValues();

       // var formParams =Ext.ComponentQuery.query("form[name='system_user_UserSearch']")[0].getValues();
        //var formParams = Ext.getCmp('system_user_UserSearch').getValues();
        var params = {};
        params.seqno = formParams.seqno;
        params.st = formParams.st_date;
        params.et = formParams.et_date;
        params.statu = formParams.status;
        return params;
    },
	/**
	 * 加载数据
	 */
	_loadData : function(page){
       var ulists =Ext.ComponentQuery.query("container[name='container_order_main']");
       var ulist = ulists[ulists.length-1];
        // var ulist = Ext.getCmp('system_user_UserList');
      //  console.log(win);
        var listViewModel =  ulist.getViewModel(),
        //var listViewModel =  this._listGrid.getViewModel(),
		data = listViewModel.getData(),
		listStore = data.UserGrid;
		var params = this._initSearchParams();
		
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
        var ulists =Ext.ComponentQuery.query("container[name='container_order_main']");
       var ulist = ulists[ulists.length-1];
        // var ulist = Ext.getCmp('system_user_UserList');
      //  console.log(win);
        var viewModel =  ulist.getViewModel(),
		//加载角色数据

		data = viewModel.getData(),
		roleStore = data.order;
      	//角色
	   /* var params = {};
        params.usertype1 = '';
        roleStore.proxy.extraParams = {params: Ext.encode(params)};*/
        var params = this._initSearchParams();
        roleStore.proxy.extraParams = {params: Ext.encode(params)};
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
                            Ext.example.msg('系统提示!', json.info);
                        	
                        }
                   }
                });
            }
        }));
    },
    onuseraddClick:function(){
        var me =this;
        var width = Math.floor(Ext.Element.getViewportWidth() * 0.45),
            height = Math.floor(Ext.Element.getViewportHeight() * 0.6);
        var params= {
                targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '添加订单',
                    width:width,
                    height:height
                }
            };
            me.setCurrentView('orderadd',params);
           // var ulists =Ext.ComponentQuery.query("container[name='container_order_main']");
          /* var ulists =Ext.ComponentQuery.query("form[name='orderadd']");
        var ulist = ulists[ulists.length-1];

        var listViewModel =  ulist.getViewModel(),
        data = listViewModel.getData(),
        listStore = data.station;
        listStore.proxy.url = listStore.proxy.api.STATION;
        listStore.proxy.extraParams = {params: Ext.encode({saff_id:just.data.user.loginInfo.staff_id})};
      
        listStore.load(
            { 
                callback: function(records, options, success){
                    if(records.length > 0)
                    {
                        
                        var ulists =Ext.ComponentQuery.query("combo[name='to_station']");
                        var ulist = ulists[ulists.length-1],
                        store = ulist.getStore();
                        store.proxy.url = store.proxy.api.STATION;
                        store.proxy.extraParams = {params: Ext.encode({saff_id:''})};
                        store.load();     
                        var clists =Ext.ComponentQuery.query("tagfield[name='order_add_tagf']");
                        var clist = clists[clists.length-1],
                        cstore = clist.getStore();
                        cstore.proxy.url = cstore.proxy.api.CONTACT;
                        cstore.load();                               
                    }
                    else
                    {
                        ulist.up('window').close();
                        Ext.example.msg('系统提示！', '当前用户没有满足条件的发站，无法添加订单！');
                    }
                } 
            }
        );*/
        
          
    },
    onusereditClick:function(grid, rowIndex, colIndex,b,h,v){
        var width = Math.floor(Ext.Element.getViewportWidth() * 0.4),
        height = Math.floor(Ext.Element.getViewportHeight() * 0.5);
      
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

            this.setCurrentView('orderadd',params);
            var win = Ext.getCmp('orderadd');
            
           win.loadRecord(v);
           var te = win.down('textfield[name=staff_id]');
           te.setValue(v.data.staff_id);
           te.setReadOnly(true)  ;
           var re = win.down('radiogroup');
           re.setValue({useflag:v.data.useflag});

   
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

            
       this.getView().add(Ext.create(cfg));
    },
   
    onordersaveClick: function(view) {
        var me = this;
        var listStore = this.getView().getViewModel().getData().order;
        var addUrl = listStore.getProxy().api.ADDORDER;
        var me = this;
       
        var win = view.up('window');
        var form = view.up('window').down('form');
        var ids_g=form.down('tagfield[name=order_add_tagf]').getValue();
        for(var ele in ids_g){
            if(!just.util.idcard(ids_g[ele]))
            {
                //Ext.toast('保存失败！<br>身份证：'+ids_g[ele]+'格式不正确', '提示','t');
                Ext.Msg.alert("系统提示",'保存失败！<br>身份证：'+ids_g[ele]+'格式不正确');
                return;
            }
        };
      
        var from_name = form.down('combo[name=from_station]').getRawValue();
        var to_name = form.down('combo[name=to_station]').getRawValue();
        var seat_type_str = form.down('combo[name=seat_type_code]').getRawValue();
        var ids = form.down('tagfield[name=order_add_tagf]').getValue().join('#')+'#';

        var formparams = form.getValues();

        if(form.isValid()){
            just.showWaitingDlg("正在保存,请稍候...");
            var params={};
            params.train_date = formparams.train_date1;
            params.station_train_code =  Ext.util.Format.uppercase(formparams.station_train_code); 
            params.from_station =  formparams.from_station;
            params.from_station_name =  from_name;
            params.to_station =  formparams.to_station;

            params.to_station_name =  to_name;
            params.seat_type_code = formparams.seat_type_code;
            params.seat_type_str = seat_type_str;
            params.total_num =  formparams.total_num;
            params.id_types = '1';

            params.di_nos = ids;//
            params.bureau_code = formparams.from_station.substring(formparams.from_station.length-1,formparams.from_station.length);
            params.child_num = formparams.child_num;
            params.ani = just.data.user.loginInfo.mobilenum;
            Ext.Ajax.request({
                submitEmptyText:true, 
                url : addUrl,
                params:{params:Ext.encode(params)},
                success:function(response, opts){
                    var jsonObj = Ext.JSON.decode(response.responseText);
            
                    just.hideWaitingDlg(jsonObj.info,false);
                    Ext.example.msg('系统提示', jsonObj.info);
                   
                    if(jsonObj.status == '200'){   
                        
                       
                        win.close();//关闭窗体
                         me._onLoadBaseData();
                    }
                }
            })
        }
    },
    combonblur:function(c,m,v){
        if(!c.forceSelection)
        c.forceSelection = true;
    },
    combfocus:function(c,m,v){
        if( c.forceSelection)
        c.forceSelection = false;
    },
    traincodeblur:function(c,m,v){

        var comb = c.up('form[name]').down('combo[name=seat_type_code]');
         comb.setValue(null);
        if(c.isValid())
        {
            comb.setReadOnly(false) ;
   

                var patt = new RegExp('[GDCgdc]');//要查找的字符串为'Adam

                if(patt.test(c.getValue())){//字符串存在返回true否则返回false
                    comb.setStore(just.ST_SEAT_TYPE_g);
                }else{
                    comb.setStore(just.ST_SEAT_TYPE_p);
                }


        }
        else
        {
           
            comb.setReadOnly(true) ;
        }
    },
    onselect:function(cmp,v){
        
        var ulists =Ext.ComponentQuery.query("datefield[name='train_date1']");
        var df = ulists[ulists.length-1];
          //  df.setReadOnly(false);
 //console.log('sdfdsf' ); 
        
      //     console.log(df.isPickerField ); 
        
    
       df.setMinValue( Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, v.data.from_period_1), 'Y-m-d'));
       df.setMaxValue( Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, v.data.to_period_1+7), 'Y-m-d'));
    },
    onidnoselect:function(cmp,v){
        var c_num = this.getView().down('numberfield[name=child_num]').getValue();

        var a_num = this.getView().down('tagfield[name=order_add_tagf]').getValue().length;

        this.getView().down('textfield[name=total_num]').setValue(a_num+c_num);
        this.getView().down('displayfield[name=total_numdis]').setValue('张（含'+c_num+'张小孩票）');
      
    },
    onorderexport:function(){
        console.log(just.data.user.loginInfo);
        var params = this._initSearchParams();
        var url = '/report/report.action?format=xls&isAutoColumns=true&templateBeanId=order_report&staffid='+ encodeURIComponent(just.data.user.loginInfo.staff_id)
        +"&seqno="+encodeURIComponent(params.seqno)+"&st="+encodeURIComponent(params.st)+"&et="+encodeURIComponent(params.et)+"&useflag="+encodeURIComponent(params.statu); 
        var url = just.getUrl(url);
        window.location.href = url;
        
    },
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        ordergrid = refs.ordergrid;
        
        var util = Ext.create(just.createUtil('Permission'));
                util.initPermission(cmp,ordergrid);
                
             },

});


