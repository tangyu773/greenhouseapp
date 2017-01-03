Ext.define('Admin.view.widgets.WidgetB', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-b',
    _ghid:undefined,
    _xsize:undefined,
    _ysize:undefined,
    _compid:undefined,
    height:360,

    //cls: 'admin-widget-small sale-panel info-card-item shadow-panel',
    cls: 'shadow-panel',

    containerColor: '',
    title: '广州公司',
    layout:'column',
    defaults: {
        columnWidth: 0.11,
        margin:2,
    },

    /*tools:[{
    type:'next',
    tooltip: '进入大棚',
    // hidden:true,
    handler: 'intodp',
},
],*/
    items: [ ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    }
});
