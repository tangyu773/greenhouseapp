Ext.define('Admin.view.main.Viewport', {
    extend: 'Ext.container.Viewport',
	alias: 'widget.main_Viewport',
    xtype: 'mainviewport',
    id:'main_Viewport',
    requires : [
                'Admin.view.product.ProductEdit'
        	],
    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    requires : [
        'Ext.layout.container.HBox',
        'Admin.view.main.UserRepwd',
        'Admin.view.main.Window',

    ],
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo">&nbsp;&nbsp;&nbsp;  <i class="icon icon-icon"></i> &nbsp; GH后台管理</div>',
                    width: 220
                },
                {
                    margin: '0 0 0 8',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-navicon',
                    handler: 'onToggleNavigationSize'
                },{
                    xtype: 'tbspacer',
                    flex: 1
                }
                //,{
                ////	 xtype: 'button',
                //	 name: 'main_Viewport_button',
              //       iconCls: 'icon-bullhorn',
//                     text: '<span class="form_require_symbol">待处理任务4条</span>',
                    // text: '待处理任务0条',
                	 //menu: [
                     /*{
                		 id: 'menu1',
                		 text:'产品一',
                		 handler : function(menu,item){
                			 console.log(menu.getId());
                			 console.log(item);
                		 }
                	 },{
                		 text:'Menu Item 2'
                	 },{
                		 text:'Menu Item 3'
                	 }*/
                 //]
              //  }
                ,{
                	cls: 'delete-focus-bg',
                	iconCls: 'x-fa fa-key xiangqing_color',
                	width:100,
                	tooltip: '修改密码',
                    text:'修改密码',
                    handler:'onrepwdclick'
                },{
                    cls: 'delete-focus-bg ',
                    iconCls: 'x-fa fa-power-off dengcu_color',
                    text:'登出',
                    width:80,
                    tooltip: '退出',
                    handler: 'onloginClick'
                }/*,
                {
                	cls: 'delete-focus-bg',
                	iconCls: 'x-fa fa-user',
                	tooltip: '修改用户信息'
                }*/,
                {
                    xtype: 'tbtext',
                    text: '角色：用户名',
                    name:'main_Viewport_tbtextjs',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'当前用户图片',
                    src: 'resources/images/user-profile/face-1.jpg'
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    bind : {
                        store : '{ModuleTreeGrid}'
                    },
                    //store: 'NavigationTree',
                    width: 220,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
