Ext.define('Admin.view.widgets.WidgetD', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-d',

    cls:'admin-widget shadow-panel',

    items: [
        {
            xtype: 'image',
            cls: 'widget-top-container-first-img',
            height: 66,
            width: 66,
            alt: 'profile-image',
            src: 'resources/images/user-profile/face-1.jpg'
        },
        {
            xtype: 'component',
            cls: 'widget-top-first-fourth-container postion-class',
            height: 135
        },
        {
            xtype: 'container',
            cls: 'widget-bottom-first-container postion-class',
            height: 120,
            padding: '30 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'widget-name-text',
                    name:'name',
                    html: 'TY'
                },
                {
                    xtype: 'label',
                    name:'role',
                    html: '系统管理员'
                },{
                    xtype: 'toolbar',
                    flex: 1,
                    cls: 'widget-follower-toolbar',
                    width: '100%',
                    margin: '0 0 0 0',
                    defaults: {
                        xtype: 'displayfield',
                        flex: 1,
                        labelAlign: 'top'
                    },
                    items: [
                        /*{   
                            name:'widget_d_1',
                            value: '订单总数<br>0（单）'
                        },
                        {
                            name:'widget_d_2',
                            cls: 'widget-follower-tool-label',
                            value: '成功订单总数<br>0（单）'
                        },
                        {
                            name:'widget_d_3',
                             value: '成功订票总张数<br>0（张）'
                        }*/
                    ]
                }
            ]
        }

    ]
    ,
     listeners: {
            afterrender: 'ondAfterRender',
           
        }
});
