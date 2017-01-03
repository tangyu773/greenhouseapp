Ext.define('Admin.view.house.tabp_house', {
	extend: 'Ext.tab.Panel',
	xtype: 'house_tabp',
	title: false,

	activeTab: 1,
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	items: [ {
    xtype:'house_tab',
    title: "风机",
  },
  {
    xtype:'house_tab',
    title: "采集箱",
  },
  {
    xtype:'house_tab',
    title: "循环泵",
  },
  {
    xtype:'house_tab',
    title: "光照",
  },
  {
    xtype:'house_tab',
    title: "温度",
  },
  {
    xtype:'house_tab',
    title: "湿度",
  },
  {
    xtype:'house_tab',
    title: "二氧化碳",
  },
  {
    xtype:'house_tab',
    title: "酸碱度",
  },
  {
    xtype:'house_tab',
    title: "盐分",
  },
  {
    xtype:'house_tab',
    title: "水帘",
  },
  {
    xtype:'house_tab',
    title: "视频",
  }],
	margin: '0'
});
