Ext.define('Admin.view.outgo.OutgoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.outgo_controller',


    /**
     * 加载数据
     */
    _loadData : function(page){
        var ulists =Ext.ComponentQuery.query("container[name='outgo_outgo']");
        var ulist = ulists[ulists.length-1];
        var listViewModel =  ulist.getViewModel(),
        data = listViewModel.getData(),
        listStore = data.outgo;
        var params = this._initSearchParams();
		if(!page){
			page = 1;
		}
		//listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
        listStore.load();

    },

    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='outgo_search_form']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.st_date = formParams.st_date;
        params.et_date = formParams.et_date;
        params.corporderid = formParams.corporderid;
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
    onuseraddClick:function(){

        var width = Math.floor(Ext.Element.getViewportWidth() * 0.5),
        height = Math.floor(Ext.Element.getViewportHeight() * 0.5);
        var params= {
            targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '上传出库文件',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('outgoadd',params);
         /*   var me = this,
            refs = me.getReferences(),
             contactadd = refs.contactadd;


           var contactadd_idcard = contactadd.down('textfield[name=idcard]');
           contactadd_idcard.setReadOnly(false)  ;*/

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
                           url:just.getUrl('/sys/ascode/add.action'),
                           method : 'POST',
                           success : function(cmp,response, opts){
                                var jsonObj = Ext.JSON.decode(response.response.responseText);
                                just.hideWaitingDlg(jsonObj.info,true);

                               win.close();
                               me._loadData();
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
     just.showWaitingDlg("正在上传,请稍候...");
           form.form.doAction('submit',{
               submitEmptyText:false,
               url:just.getUrl('/sys/ascode/importoutgo.action'),
               method : 'POST',
               success : function(cmp,response, opts){
                    var jsonObj = Ext.JSON.decode(response.response.responseText);
                     just.hideWaitingDlg(jsonObj.info,true);

                   win.close();
                   me._loadData();
               },
               error: function(cmp,response, opts) {
                 var jsonObj = Ext.JSON.decode(response.response.responseText);
                    just.hideWaitingDlg("超时，或者网络错误！",true);
               },

           });
   }
 },


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

_onDownloadtemple: function(cmp, cell, index, row, event, raw, eOpts) {
  //window.location.href = just.getUrl(Ext.String.format("/download/fd.action?filePath={0}",'/template/系统出库文件模版.xml'));
        window.location.href = just.getUrl(Ext.String.format("/download/fdtxt.action?path={0}",'/template/系统出库文件模版.xml'));
        Ext.Msg.alert("提示","操作完成！");
    },

});
