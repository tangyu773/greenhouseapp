Ext.define('Admin.view.house.housedetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.house_housedetail',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: Ext.getBody().getViewSize().width, //窗体宽度
    height: Ext.getBody().getViewSize().height, //窗体高度
    resizable: false,
    title: '大棚传感',
    layout:'fit',
    _ghid:undefined,
    _task:undefined,
    constrain: true, //是否限制窗口超出浏览器
    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条
    listeners: {
       close: '_stop_stask',
      // beforerender:'loadhousedetail'
       },
    controller: 'house_house',
    viewModel: {
        type: 'house_house'
    },
    items: [
/*      {
        xtype:'house_tabp'

      }*/
      // {
      //   xtype:'dp_sensorpanel',
      //   x:5,
      //   y:5,
      //   data: {
      //       icon: 'cloud-icon.png',
      //       forecast: '温度采集点',
      //       temperature: 25,
      //       tooltip: '修改网关',
      //   },
      //   tpl: '<div data-qtip='+'"This is a quick tip<br> from markup!" style="background:#82d9EA;height:40px;width:50px;float:left;text-align:center;"><img src="resources/images/icons/{icon}" alt="{forecast}"/></div>',
      //
      // }
    ],




});
