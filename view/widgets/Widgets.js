Ext.define('Admin.view.widgets.Widgets', {
    extend: 'Ext.container.Container',
    xtype: 'widgets',

    requires: [
        'Admin.view.widgets.WidgetA',
        'Admin.view.widgets.WidgetB',
        'Admin.view.widgets.WidgetC',
        'Admin.view.widgets.WidgetD',
        'Admin.view.widgets.WidgetE',
        'Admin.view.widgets.WidgetF',
        'Admin.view.widgets.WidgetUserEdit',
        'Admin.model.DataXY',
        'Admin.model.MultiDataXY',
        'Admin.model.Subscription',


        'Ext.slider.Single',
        'Ext.form.field.Display',
        'Admin.view.widgets.WidgetController',

    ],
    listeners : {
      render : 'w_render'
    },
    viewModel: {
        type: 'dashboard'
    },
    height:Math.floor(Ext.Element.getViewportHeight()-80),
    autoScroll : true,
    controller: 'Widgets',

    layout:'column',
    defaults: {
      columnWidth: 0.33,
      margin:15,
    },

    items: [

              /*   {
                    xtype: 'widget-c',
                    responsiveCls: 'big-100 small-100'
                },
       {
            xtype: 'dashboardservicespanel',
            responsiveCls: 'big-100 small-100',

        },{
                      xtype: 'dashboardnetworkpanel',
            responsiveCls: 'big-100 small-100',

        }*/
    ]
});
