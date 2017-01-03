Ext.define('Admin.view.house.house_tab', {
	extend: 'Ext.container.Container',
	xtype: 'house_tab',
	title: false,

	cls: 'shadow-panel',
	controller: 'house_house',
	viewModel: {
		type: 'house_house'
	},
	height: Math.floor(Ext.Element.getViewportHeight()-80),
	bodyPadding: '1 1 1 1', 
	layout:'absolute',
	items: [  ],
	margin: '0'
});
