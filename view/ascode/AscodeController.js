Ext.define('Admin.view.ascode.AscodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ascode_controller',
    _cascade1:0,
    _cascade2:0,
    _cascade3:0,

    /**
     * 加载数据
     */
     _loadData : function(page){
        var ulists =Ext.ComponentQuery.query("container[name='ascode_ascode']");
        var ulist = ulists[ulists.length-1];
        var listViewModel =  ulist.getViewModel(),
        data = listViewModel.getData(),
        listStore = data.ascodeGrid;
        var params = this._initSearchParams();
    		if(!page){
    			page = 1;
    		}
    		//listStore.currentPage = page;
    		listStore.proxy.extraParams = {params: Ext.encode(params)};
            listStore.load();

    },
    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='ascodereq_search_form']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.reqid = formParams.reqid;
        params.st_date = formParams.st_date+ ' 00:00:00';
        params.et_date = formParams.et_date+ ' 23:59:59';
        return params;
    },


    /**
     * 加载界面基础数据数据
     */
     _onLoadBaseData : function(cmp, eOpts){

        //加载角色数据
        var viewModel =  cmp.getViewModel(),


        data = viewModel.getData(),
        roleStore = data.productlist;
        roleStore.proxy.url = roleStore.proxy.api.LIST;
      //  roleStore.load();

        // roleStore1 = data.productlist1;
        // roleStore1.proxy.url = roleStore1.proxy.api.LIST;
        // roleStore1.load();
    },
    _onLoadBaseData1 : function(cmp, eOpts){
       var viewModel =  cmp.getViewModel(),

       data = viewModel.getData(),
       roleStore1 = data.productlist1;
       roleStore1.proxy.url = roleStore1.proxy.api.LIST;
      // roleStore1.load();
      //  this._productcomb1 =  cmp.down('combo[name=productcode]');
      //  var firstValue = this._productcomb1.store.reader.jsonData[0].text;
      //   　　 this._productcomb1.setValue(firstValue);//同时下拉框会将与name为firstValue值对应的 text显示
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
        height = Math.floor(Ext.Element.getViewportHeight() * 0.75);
        var params= {
            targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '从本系统申请身份码',
                    width:width,
                    height:height
                }
            };
          //  this.setCurrentView('ascodebadlist',params);
           this.setCurrentView('ascodeadd',params);
         /*   var me = this,
            refs = me.getReferences(),
             contactadd = refs.contactadd;


           var contactadd_idcard = contactadd.down('textfield[name=idcard]');
           contactadd_idcard.setReadOnly(false)  ;*/

       },
       onbadcodelistshow:function(_reqid){
         var win = Ext.widget("ascodebadlist");
         var viewModel =  win.down('grid').getViewModel(),
         data = viewModel.getData(),
         dirStore = data.badcodelist;
         dirStore.proxy.extraParams = {params: Ext.encode({reqid:_reqid})};
         dirStore.proxy.url = dirStore.proxy.api.BADCODE;
         dirStore.load();
          //  var width = Math.floor(Ext.Element.getViewportWidth() * 0.5),
          //  height = Math.floor(Ext.Element.getViewportHeight() * 0.8);
          //  var params= {
          //      targetCfg: {
          //              //put any extra configs for your view here
          //          },
          //          windowCfg: {
          //              // Any configs that you would like to apply for window popup goes here
          //              title: '导入失败,以下身份码重复',
          //              width:width,
          //              height:height
          //          }
          //      };
          //      this.setCurrentView('ascodebadlist',params);


          },
       ontestClick:function(){

            Ext.Ajax.request({
                  url:just.getUrl('/sys/user/ascode_lib_l.action'),
                  success:function(response,opts){
                       var jsonObj = Ext.JSON.decode(response.responseText);
                  }
              });

       },
       _initbadlistview:function(cmp){

             var viewModel =  cmp.getViewModel(),
             data = viewModel.getData(),
             dirStore = data.badcodelist;
             dirStore.proxy.extraParams = {params: Ext.encode({reqid:3390})};
             dirStore.proxy.url = dirStore.proxy.api.BADCODE;
             dirStore.load();
         },
       onimportClick:function(grid, rowIndex, colIndex,b,h,v){


           var width = Math.floor(Ext.Element.getViewportWidth() * 0.3),
           height = Math.floor(Ext.Element.getViewportHeight() * 0.75);




           var params= {
            targetCfg: {

            },
            windowCfg: {

                title: '药监网身份码导入',
                width:width,
                height:height
            }
        };

        this.setCurrentView('AscodeImport1',params);




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
            params.productcode =  formparams.productcode;
            params.lv1 =  '';
            params.lv2 =  '';
            params.lv3 =  '';
            params.des = formparams.des;
            params.type = '1';
            params.casecode = '';
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
                             // Ext.example.msg('系统提示', jsonObj.info);
                              // win.close();
                                var paramswz={};
                                    paramswz.reqid =  jsonObj.rows.reqid;
                                    paramswz.productcode =  jsonObj.rows.productcode;
                                    paramswz.prodname =  jsonObj.rows.prodname;
                                    paramswz.lv1_filepath =  jsonObj.rows.lv1_filepath;
                                    paramswz.lv2_filepath = jsonObj.rows.lv2_filepath;
                                    paramswz.lv3_filepath = jsonObj.rows.lv3_filepath;
                                Ext.Ajax.request({
                                    submitEmptyText:true,
                                    url:just.getUrl('/sys/user/as10_sp_web_ascode_importbywz_c.action'),
                                    params:{params:Ext.encode(paramswz)},
                                    success:function(response, opts,cmp){

                                        var jsonObj = Ext.JSON.decode(response.responseText);
                                        just.hideWaitingDlg(jsonObj.rows[0].info,false);
                                        if(jsonObj.rows[0].result == '200'){

                                            win.close();
                                             me._loadData();
                                             Ext.example.msg('系统提示','导入成功！' );
                                         }
                                         else if (jsonObj.rows[0].result == '-100'){

                                            me._loadData();
                                            win.close();
                                           me.onbadcodelistshow(jsonObj.rows[0].info);
                                           Ext.example.msg('系统提示','导入失败' );
                                         }
                                    }

                                })



                           },

                       });
                   }
                }
            }
        })

    },
    onproductfocus:function(cmp,opts) {
      cmp.store.proxy.url = cmp.store.proxy.api.LIST;
      cmp.store.reload();

    },
   onusersaveClick: function(view) {
     var me = this;
     var listStore = this.getView().getViewModel().getData().ascodeGrid;
     var addUrl = listStore.getProxy().api.REQ;
     var me = this;
     var win = view.up('window');
     var _casecode = win.down('displayfield').getValue();
     var form = view.up('window').down('form');
     var formparams = form.getValues();
     if(form.isValid()){
     // just.showWaitingDlg("正在保存,请稍候...");
      var params={};
      params.productcode =  formparams.productcode;
      params.lv1 =  formparams.lv1_num;
      params.lv2 =  formparams.lv2_num;
      params.lv3 =  formparams.lv3_num;
      params.des = formparams.des;
      params.type = '2';
      params.casecode = _casecode;
      Ext.Ajax.request({
         submitEmptyText:true,
         url : addUrl,
         params:{params:Ext.encode(params)},
         success:function(response, opts){
             var jsonObj = Ext.JSON.decode(response.responseText);
            // just.hideWaitingDlg(jsonObj.info,false);
             //Ext.example.msg('系统提示', jsonObj.info);
             if(jsonObj.status == '200'){
                         Ext.Ajax.request({
                            submitEmptyText:false,
                            url:just.getUrl('/sys/ascode/reqascode.action'),
                            params:{reqid:jsonObj.info},
                            success : function(cmp,response, opts){
                                  var jsonObj = Ext.JSON.decode(cmp.responseText);
                                  Ext.example.msg('系统提示', jsonObj.info);
                                  win.close();
                                  me._loadData();
                            },

                        });
                 }
             }
         })
     }
 },



 enterSubmit : function(me, e, e0pts) {
    var key = e.getKey();
    if(key == e.ENTER) {
        this.onusersaveClick(me);
    }
},

/**
     * 下载身份码
     */
    _onDownload1: function(cmp, cell, index, row, event, raw, eOpts) {
        var lv1_filepath=raw.get("lv1_filepath");

        if(lv1_filepath !=''){//"../template/单选题模版.xls";
            window.location.href = just.getUrl(Ext.String.format("/download/fdtxt.action?path={0}",'/ascode/'+lv1_filepath));
            return;
        }
        //Ext.Msg.alert("提示","该题型无对应模版信息");
    },
    _onDownload2: function(cmp, cell, index, row, event, raw, eOpts) {
        var lv2_filepath=raw.get("lv2_filepath");

        if(lv2_filepath !=''){//"../template/单选题模版.xls";
            window.location.href = just.getUrl(Ext.String.format("/download/fdtxt.action?path={0}",'/ascode/'+lv2_filepath));
            return;
        }

      //  Ext.Msg.alert("提示","该题型无对应模版信息");
    },
    _onDownload3: function(cmp, cell, index, row, event, raw, eOpts) {
        var lv3_filepath=raw.get("lv3_filepath");

        if(lv3_filepath !=''){
          //"../template/单选题模版.xls";
            window.location.href = just.getUrl(Ext.String.format("/download/fdtxt.action?path={0}",'/ascode/'+lv3_filepath));
            return;
        }

        //Ext.Msg.alert("提示","该题型无对应模版信息");
    },
    _onDownloadtemple: function(cmp, cell, index, row, event, raw, eOpts) {
        window.location.href = just.getUrl(Ext.String.format("/download/fdtxt.action?path={0}",'/template/身份码导入模版.txt'));
    Ext.Msg.alert("提示","操作完成！");
    // this.onbadcodelistshow('3390');
    },

initPermission : function(cmp){
    var me = this;
    var refs = me.getReferences(),
    contactgrid = refs.contactgrid;

    var util = Ext.create(just.createUtil('Permission'));
    util.initPermission(cmp,contactgrid);

},
onaddproductClick:function(){
  var win = Ext.widget("ascodeproductadd");
  win._flag = 0;
},
onaddproductClick1:function(){
  var win = Ext.widget("ascodeproductadd");
  win._flag = 1;
},
onproductselect:function(cmp,record,opts){

  this._cascade1 = parseInt(record.data.cascade1);
 this._cascade2 = parseInt(record.data.cascade2);
  this._cascade3 = parseInt(record.data.cascade3);
  cmp.up('form').down('displayfield').setValue(record.data.cascade3+':'+record.data.cascade2+':'+record.data.cascade1);

},
on_lv1num_change:function(cmp,v){
  if(v>0){
    var er=Math.ceil((v*this._cascade2)/this._cascade1);
    var san = Math.ceil((er*this._cascade3)/this._cascade2);
    if (!isNaN(er))
      cmp.up('form').down('numberfield[name=lv2_num]').setValue(er);
      if (!isNaN(er))
        cmp.up('form').down('numberfield[name=lv3_num]').setValue(san);
  }

},
 onaddproduct: function(btn){
    var me = this;
    var win = btn.up('window');
    var form = win.down('form');
    var formparams = form.getValues();
    if(parseInt(formparams.cascade2) < parseInt(formparams.cascade3) )
    {
      just.hideWaitingDlg('二级码比例不能小于三级码比例！', true);
      return;
    }
    if(parseInt(formparams.cascade1) < parseInt(formparams.cascade2) )
    {
      just.hideWaitingDlg('一级码比例不能小于二级码比例！', true);
      return;
    }
    if(form.isValid()){
      just.showWaitingDlg("正在保存产品信息,请稍候...");
      form.getForm().doAction('submit',{
        url : just.getUrl('/sys/product/add.action'),
        method : 'POST',
        submitEmptyText : false,
        timeout : 20000,
        success : function(response, options){
          var result = options.result;
          just.hideWaitingDlg(result.info, true);
          if(result.success){
            if(win._flag==1)
              me._onLoadBaseData(win);
            else {
              me._onLoadBaseData1(win);
            }
          //  me._onLoadBaseData1(win);
                win.close();
          }
        },
        failure : function(response, options){
          win.close();
          var result = options.result;
          just.hideWaitingDlg(result.info, true);
        }
      });
    }
    },

});
