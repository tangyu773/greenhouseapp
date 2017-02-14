Ext.define('Admin.view.house.tabp_housejp', {
	extend: 'Ext.tab.Panel',
	xtype: 'house_tabpjp',
	title: false,
	activeTab: 1,
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	items: [
			{
		    xtype:'house_tab',
		    title: "风机水帘",
		  },
		  {
		    xtype:'house_tab',
		    title: "光照",
		  },
		  {
		    xtype:'house_tab',
		    title: "气温",
		  },
		  {
		    xtype:'house_tab',
		    title: "空气湿度",
		  },
		  {
		    xtype:'house_tab',
		    title: "二氧化碳浓度",
		  },
		  {
		    xtype:'house_tab',
		    title: "遮阳帘",
		  },
		  {
		    xtype:'house_tab',
		    title: "视频",
		  },
		  {
		    xtype:'house_tab',
		    title: "滴灌",
		  },
		  {
		    xtype:'house_tab',
		    title: "土壤干湿度",
		  }
  ],
	margin: '0'
});
