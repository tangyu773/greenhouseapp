Ext.define('Admin.view.deliver.DeliverController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deliver_controller',


    /**
     * 加载数据
     */
     _loadData : function(page){
    	var ulists =Ext.ComponentQuery.query("container[name='deliver_deliver']");
        var listGrid = ulists[ulists.length-1];
        var listStore = listGrid.getViewModel().getData().deliverGrid;
		var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		//listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
		listStore.load();

    },

    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='deliver_deliver_search_form']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.seqno = formParams.seqno;
        params.st_date = formParams.st_date;
        params.et_date = formParams.et_date+' 23:59:59';
        return params;
    },

    /**
     * 加载界面基础数据数据
     */
     _onLoadBaseData : function(cmp, eOpts){

        //加载角色数据
        var viewModel =  cmp.getViewModel(),
        data = viewModel.getData(),
        roleStore = data.RoleGrid;

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
    onuseraddClick:function(grid, rowIndex, colIndex,b,h,v){

        var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
        height = Math.floor(Ext.Element.getViewportHeight() * 0.6);
        var params= {
            targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '发货',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('deliveradd',params);




            var ulists =Ext.ComponentQuery.query("form[name='deliveradd']");
            var ulist = ulists[ulists.length-1];
            var listViewModel =  ulist.getViewModel(),
            data = listViewModel.getData();
            listStore = data.region,
            listStore.proxy.url = listStore.proxy.api.LISTREGION;
          //  listStore.proxy.extraParams = {params: Ext.encode({saff_id:just.data.user.loginInfo.staff_id})};
            listStore.load();

            actionStore = data.actiontype,
            actionStore.proxy.url = actionStore.proxy.api.ACTIONTYPE;
            actionStore.proxy.extraParams = {params: Ext.encode({module:'deliver',type:'actiontype'})};
            actionStore.load();

            eventStore = data.eventtype,
            eventStore.proxy.url = eventStore.proxy.api.ACTIONTYPE;
            eventStore.proxy.extraParams = {params: Ext.encode({module:'deliver',type:'eventtype'})};
            eventStore.load();

            agencyStore = data.agency,
            agencyStore.proxy.url = agencyStore.proxy.api.AGENCY;
            //eventStore.proxy.extraParams = {params: Ext.encode({module:'deliver',type:'eventtype'})};
            agencyStore.load();
            var me = this,
            refs = me.getReferences(),
            deliveradd = refs.deliveradd;
            deliveradd.loadRecord(v);




            /*  var me = this,
            refs = me.getReferences(),
             contactadd = refs.contactadd;

           contactadd.loadRecord(v);
           var contactadd_idcard = contactadd.down('textfield[name=idcard]');
           contactadd_idcard.setReadOnly(true)  ;*/

       },
       combonblur:function(c,m,v){
           if(!c.forceSelection)
           c.forceSelection = true;
       },
       combfocus:function(c,m,v){
           if( c.forceSelection)
           c.forceSelection = false;
       },

       ontestClick:function(){

            Ext.Ajax.request({
                  url:just.getUrl('/sys/user/ascode_lib_l.action'),
                  success:function(response,opts){
                       var jsonObj = Ext.JSON.decode(response.responseText);
                  }
              });

       },
       onimportClick:function(grid, rowIndex, colIndex,b,h,v){
           var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
           height = Math.floor(Ext.Element.getViewportHeight() * 0.7);
           var params= {
            targetCfg: {

            },
            windowCfg: {
                title: '药监网身份码导入',
                width:width,
                height:height
            }
        };
        this.setCurrentView('AscodeImport',params);
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
    save_ascode_upload: function(cmp) {
        var me = this;

        var listStore = this.getView().getViewModel().getData().ascodeGrid;
        var addUrl = listStore.getProxy().api.REQ;
        var win = cmp.up('window');
        var form = cmp.up('window').down('form');
        var formparams = form.getValues();
            var params={};
            params.corpid =  '1';
            params.productcode =  formparams.productcode;
            params.lv1 =  '';
            params.lv2 =  '';
            params.lv3 =  '';
            params.des = formparams.des;
            params.type = '1';
        Ext.Ajax.request({
        submitEmptyText:true,
        url : addUrl,
        params:{params:Ext.encode(params)},
        success:function(response, opts){
            var jsonObj = Ext.JSON.decode(response.responseText);
            var reqid = form.down('textfield[name=reqid]');
            reqid.setValue(jsonObj.info)
            //just.hideWaitingDlg(jsonObj.info,false);

            if(jsonObj.status == '200'){
                    if(form.isValid()){
                       just.showWaitingDlg("正在上传,请稍候...");

                       form.form.doAction('submit',{
                           submitEmptyText:false,
                           url:just.getUrl('/sys/user/as10_sp_deliver_update_u.action'),
                           method : 'POST',
                           success : function(cmp,response, opts){
                                var jsonObj = Ext.JSON.decode(response.response.responseText);
                                just.hideWaitingDlg(jsonObj.info,true);

                               win.close();
                           },

                       });
                   }
                }
            }
        })

    },
   onusersaveClick: function(view) {

    var me = this;
    var win = view.up('window');
    var form = view.up('window').down('form');
    var formparams = form.getValues();
     if(form.isValid()){
    	 var params={};
         params.corporderid =  formparams.corporderid;
         params.sale_region_code =  formparams.sale_region_code;
         params.tocorpid =  formparams.tocorpid;
         params.actiontype =  formparams.actiontype;
         params.eventtype =  formparams.eventtype;

     Ext.Ajax.request({
     submitEmptyText:true,
     url:just.getUrl('/sys/user/as10_sp_deliver_update_u.action'),
     params:{params:Ext.encode(params)},
     success:function(response, opts){
         var jsonObj = Ext.JSON.decode(response.responseText);

         if(jsonObj.status == '200'){

              just.hideWaitingDlg(jsonObj.info,true);
              win.close();
              me._loadData();
             }
         }
     })
   }
 },
/* just.showWaitingDlg("正在保存,请稍候...");
 form.form.doAction('submit',{
     submitEmptyText:false,
     url:just.getUrl('/sys/user/as10_sp_deliver_update_u.action'),
     method : 'POST',
     params:{params:Ext.encode(params)},
     success : function(cmp,response, opts){
          var jsonObj = Ext.JSON.decode(response.response.responseText);
           just.hideWaitingDlg(jsonObj.info,true);

         win.close();
     },

 });*/


 enterSubmit : function(me, e, e0pts) {
    var key = e.getKey();
    if(key == e.ENTER) {
        this.onusersaveClick(me);
    }
},



initPermission : function(cmp){
    var me = this;
    var refs = me.getReferences(),
    contactgrid = refs.contactgrid;

    var util = Ext.create(just.createUtil('Permission'));
    util.initPermission(cmp,contactgrid);

},



});
