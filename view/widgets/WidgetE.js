Ext.define('Admin.view.widgets.WidgetE', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-e',
    _ghid:undefined,
    _xsize:undefined,
    _ysize:undefined,
    _compid:undefined,
    height:180,

    //cls: 'admin-widget-small sale-panel info-card-item shadow-panel',
    cls: 'shadow-panel',

    containerColor: '',
    title: '广州公司',
    layout:'column',
    defaults: {
        columnWidth: 0.166,
        margin:2,
    },

    tools:[{
    type:'right',
    tooltip: '进入大棚',
    // hidden:true,
    handler: 'intodp',
},
],
    items: [ ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    }
});
