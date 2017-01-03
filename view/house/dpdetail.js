Ext.define('Admin.view.house.dpdetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.house_dpdetail',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: Ext.getBody().getViewSize().width, //窗体宽度
    height: Ext.getBody().getViewSize().height, //窗体高度
    resizable: false,
    title: '大棚视图',
    layout:'column',

    constrain: true, //是否限制窗口超出浏览器
    defaults: {
        //labelWidth: 85,
      //  labelAlign: 'right',
        columnWidth: 0.33,
        margin:20,
        //padding: 10,
      //  allowBlank: true,
      //  minLength: 0,
      //  maxLength: 16
    },

    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条
    listeners: {  afterrender: function () {
        //just.showWaitingDlg("请稍候...");
    }  },
    controller: 'house_house',
    viewModel: {
        type: 'house_house'
    },
    items: [

    ],




});
