Ext.define('Admin.view.post.pdir.PdirController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pdir_controller',


    /**
     * 加载数据
     */
    _loadData : function(page){
        var ulists =Ext.ComponentQuery.query("container[name='pdir_pdir']");
        var ulist = ulists[ulists.length-1];
        var listViewModel =  ulist.getViewModel(),
        data = listViewModel.getData(),
        listStore = data.pdir;
        var params = this._initSearchParams();
		// if(!page){
		// 	page = 1;
		// }
		//listStore.currentPage = page;
		listStore.proxy.extraParams = {params: Ext.encode(params)};
        listStore.load();

    },

    _initSearchParams:function(){
        var spinfoses = Ext.ComponentQuery.query("form[name='pdir_search_form']");
        var spinfose = spinfoses[spinfoses.length-1];
        var formParams =spinfose.getValues();
        var params = {};
        params.pdir_keys = formParams.pdir_keys;

        return params;
    },


    ondiraddClick:function(){

        var width = Math.floor(Ext.Element.getViewportWidth() * 0.4),
        height = Math.floor(Ext.Element.getViewportHeight() * 0.8);
        var params= {
            targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: '添加栏目',
                    width:width,
                    height:height
                }
            };

            this.setCurrentView('pdiradd',params);
         /*   var me = this,
            refs = me.getReferences(),
             contactadd = refs.contactadd;


           var contactadd_idcard = contactadd.down('textfield[name=idcard]');
           contactadd_idcard.setReadOnly(false)  ;*/

       },
       _onDeletedir:function(grid, rowIndex, colIndex,b,h,v){
         var me = this;
         if(Ext.MessageBox.confirm("系统提示","是否删除选中栏目？",function(e){
          if(e == 'yes'){
           Ext.Ajax.request({
              submitEmptyText:false,
              url:just.getUrl('/sys/user/dir_del.action'),
              params:{dirid:v.data.dirid},
              success : function(cmp,response, opts){
                    var jsonObj = Ext.JSON.decode(cmp.responseText);
                    Ext.example.msg('系统提示', jsonObj.info);

                  me._loadData();
              },
          });
        }
      }));
       },
       ondireditClick:function(grid, rowIndex, colIndex,b,h,v){
           var width = Math.floor(Ext.Element.getViewportWidth() * 0.4),
           height = Math.floor(Ext.Element.getViewportHeight() * 0.8);
           var params= {
            targetCfg: {

            },
            windowCfg: {
                title: '编辑栏目',
                width:width,
                height:height
            }
        };
        this.setCurrentView('pdiredit',params);
        var win = Ext.getCmp('pdiredit');

        win.loadRecord(v);

    },
   ondiradd: function(view) {
    var me = this;
    var win = view.up('window');
    var form = view.up('window').down('form');
    var formparams = form.getValues();
    if(form.isValid()){
     just.showWaitingDlg("正在上传,请稍候...");
           form.form.doAction('submit',{
               submitEmptyText:false,
               url:just.getUrl('/sys/user/dir_add.action'),
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

ondiredit:function(view) {
   var me = this;
   var win = view.up('window');
   var form = view.up('window').down('form');
   var formparams = form.getValues();
   if(form.isValid()){
    just.showWaitingDlg("正在上传,请稍候...");
          form.form.doAction('submit',{
              submitEmptyText:false,
              url:just.getUrl('/sys/user/dir_edit.action'),
              method : 'POST',
              success : function(cmp,response, opts){
                   var jsonObj = Ext.JSON.decode(response.response.responseText);
                   just.hideWaitingDlg(jsonObj.info,true);
                   me._loadData();
                   win.close();
              },
          });
  }
},




initPermission : function(cmp){
    var me = this;
    var refs = me.getReferences(),
    contactgrid = refs.contactgrid;

    var util = Ext.create(just.createUtil('Permission'));
    util.initPermission(cmp,contactgrid);

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
}

});
