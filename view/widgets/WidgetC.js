Ext.define('Admin.view.widgets.WidgetC', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget-c',
    id: 'widget_c_id',
    cls:'admin-widget shadow-panel',
    items: [
        {
            xtype: 'image',
            id: 'widget-c-image-id',
            cls: 'widget-top-container-first-img',
            height: 66,
            width: 66,
            alt: 'profile-image',
            src: 'resources/images/user-profile/face-1.jpg'
        },
        {
            xtype: 'component',
            cls: 'widget-top-first-third-container postion-class',
            height: 135
        },
        {
            xtype: 'container',
            cls: 'widget-bottom-first-container postion-class',
            height: 175,
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
                    name: 'name',
                    html: "TY"
                },
                {
                    xtype: 'label',
                    name: 'role',
                    html: '系统管理员'
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    cls: 'widget-follower-toolbar',
                    width: '100%',
                    margin: '20 0 0 0',
                    defaults: {
                        xtype: 'displayfield',
                        flex: 1,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                        	name: 'widget_c_1',
                            value: '<div class="color_status_default">企业</div><div></div>'
                        },
                        {
                        	name: 'widget_c_2',
                            cls: 'widget-follower-tool-label',
                            value: '<div class="color_status_default">电话</div><div></div>'
                        },
                        {
                        	name: 'widget_c_3',
                            value: '<div class="color_status_default">邮箱</div><div></div>'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'ondAfterRender',
       
    }
    
});
