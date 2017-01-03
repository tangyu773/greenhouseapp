/**
 * 用户界面 Created by xiaozou on 15-10-20.
 */

Ext.define('Admin.view.system.user.User', {
	extend : 'Ext.container.Container',
	xtype : 'system_user_User',
	//title : '用户管理',
	title : false,
	requires: [
	    'Admin.view.system.user.UserList',
	    'Admin.view.email.UserAdd',
        'Admin.view.system.user.Userstationwin',
        'Admin.view.system.user.Userstationlistwin'

    ],
    cls: 'shadow-panel',
	controller : 'system_user_User',
	viewModel : {
		type : 'system_user_User'
	},
	listeners: {
        afterrender: 'initPermission'
    },
	height:Math.floor(Ext.Element.getViewportHeight()-80),
	defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },
	itemId : 'system_user_User',
	// 列表布局
	//layout : 'column',
	layout: 'border',
  items: [  // {
    // 		xtype:'panel',
    // 	    hidden :true,
    //         title: '用户组管理',
    //         region:'west',
    //         floatable: false,
    //         margin: '1 0 1 1',
    //         width: 250,
    //         minWidth: 100,
    //        // height: 370,
    //         maxWidth: 250,
    //         name:'user_tree',
    //
    //         bodyPadding: 0,
    //         items:[
	  //           {
	  //           	xtype:'treepanel',
	  //           	forceFit: true,
		// 		    frame: true,
		// 		    rootVisible: false,
		// 		    border:0,
		// 		    lines: false,
		// 		    name:'usertree',
		// 		    height:Math.floor(Ext.Element.getViewportHeight()-110),
		// 		    useArrows: true,
    //             	colspan: 2,
		// 		    bind : {
		// 				store : '{fileGrid}'
		// 			},
		// 		    viewConfig: {
		// 		        // plugins: { ptype: 'treeviewdragdrop' },
		// 		         //appendOnly:true   //只能拖着带非叶节点上
		// 		    },
		// 		    columns:[
		// 	             {xtype:'treecolumn',sortable: false,text: "用户树形结构",  dataIndex: "text" },
		// 	         ],
	  //           }
    //         ]
    //     },
        {
            title: false,
            collapsible: false,
            region: 'center',
            margin: '1 1 1 0',
            items:[
	            /*{
					columnWidth : 1.0,
				        xtype: 'system_user_UserSearch'
				}, */{
						columnWidth : 1.0,
				        xtype: 'system_user_UserList'
				}
            ]
        }],
	margin : '5 10 5 10'
});
