Ext.define('Admin.view.post.post.PostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.post_controller',
   _note:undefined,
    _ffile :undefined,
    _image :undefined,
    _contenturl:undefined,
    /**
     * 加载数据
     */
    _loadData : function(page){
        var ulists =Ext.ComponentQuery.query("container[name='post_post']");
        var ulist = ulists[ulists.length-1];
        var listViewModel =  ulist.getViewModel(),
        data = listViewModel.getData(),
        listStore = data.post;
        params = this._initSearchParams();
		// if(!page){
		// 	page = 1;
		// }
		//listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
    listStore.load();

    },

    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='post_search_form']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.postkey = formParams.postkey;
        params.st_date = formParams.st_date;
        params.et_date = formParams.et_date;
        return params;
    },

 _initpostaddview:function(cmp){
       this._note = cmp.down('textareafield[name=content]');
       this._ffile = cmp.down('filefield');
       this._image = cmp.down('image');
       this._contenturl = cmp.down('textfield[name=content_url]');
       var viewModel =  cmp.getViewModel(),
       data = viewModel.getData(),
       dirStore = data.spost_dir;

       dirStore.proxy.url = dirStore.proxy.api.LIST;
       dirStore.load();
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

    onpostaddClick:function(){

        var width = Math.floor(Ext.Element.getViewportWidth() * 0.4),
        height = Math.floor(Ext.Element.getViewportHeight() * 0.8);
        var params= {
            targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '发帖',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('postadd',params);

       },
       changtypecomb: function(cmp,r){
           var me = this;
       switch( cmp.getValue())
       {
            case 1:
               me._note.show();
               me._ffile.show();
               me._image.show();
               me._contenturl.hide();
              //this._hedit.setReadOnly(false);
              break;
            case 2:
               me._note.hide();
               me._ffile.hide();
               me._image.hide();
               me._contenturl.show();
               break;

            default:
              break;
       }
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
    onpostadd: function(view) {
     var me = this;
     var win = view.up('window');
     var form = view.up('window').down('form');
     var formparams = form.getValues();
     var url = just.getUrl('/sys/user/post_add.action');
     if(formparams.posttype == 2)
         url = just.getUrl('/sys/user/posturl_add.action');
     if(form.isValid()){
      just.showWaitingDlg("正在上传,请稍候...");
            form.form.doAction('submit',{
                submitEmptyText:false,
                url:url,
                method : 'POST',
                success : function(cmp,response, opts){
                     var jsonObj = Ext.JSON.decode(response.response.responseText);
                     just.hideWaitingDlg(jsonObj.info,true);
                     win.close();
                     me._loadData();
                },
            });
    }
  },


  onposteditClick:function(grid, rowIndex, colIndex,b,h,v){
      var width = Math.floor(Ext.Element.getViewportWidth() * 0.4),
      height = Math.floor(Ext.Element.getViewportHeight() * 0.8);
      var params= {
       targetCfg: {

       },
       windowCfg: {
           title: '编辑帖子',
           width:width,
           height:height
       }
   };
   this.setCurrentView('postadd',params);
   var win = Ext.getCmp('postadd');

   win.loadRecord(v);

  },



initPermission : function(cmp){
    var me = this,
     refs = me.getReferences(),
    contactgrid = refs.contactgrid;

    var util = Ext.create(just.createUtil('Permission'));
    util.initPermission(cmp,contactgrid);
},

_onDeletepost:function(grid, rowIndex, colIndex,b,h,v){
      var me = this;
      if(Ext.MessageBox.confirm("系统提示","是否删除选中帖子？",function(e){
         if(e == 'yes'){
          Ext.Ajax.request({
             submitEmptyText:false,
             url:just.getUrl('/sys/user/post_del.action'),
             params:{postid:v.data.postid},
             success : function(cmp,response, opts){
                   var jsonObj = Ext.JSON.decode(cmp.responseText);
                   Ext.example.msg('系统提示', jsonObj.info);
                   me._loadData();
             },
         });
       }
     }));
},

});
