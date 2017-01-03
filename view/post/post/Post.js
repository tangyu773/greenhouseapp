Ext.define('Admin.view.post.post.Post', {
	extend : 'Ext.container.Container',
	xtype : 'post_post',
	title : '发帖',
	requires: [
		'Admin.view.post.post.PostController',
		'Admin.view.post.post.PostAdd',
		'Admin.view.main.Window',
		'Admin.view.post.post.PostViewModel',
		'Admin.store.post',
		'Admin.store.pdir'
    ],
	controller : 'post_controller',
	name:'post_post',
	reference: 'post_post',
	viewModel : {
		type: 'post_post'
	},
	cls: 'shadow-panel',
//	itemId : 'batch_batch',
	// 列表布局
	layout : 'column',
	listeners: {
       render: '_loadData'
    },
    items: [{
    	title : '发帖',
    	columnWidth : 1.0,
        xtype: 'grid',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{post}'
		 },
		 viewConfig : {
			enableTextSelection:true  ,
			 stripeRows: true
		 },

		 defaults : {
           width:200
        },
	  //  forceFit: true,

	    columnLines:true,
	    columns : [ {
		dataIndex : 'postid',
		text : 'ID',
		width : 40,
		align: "center",
	}, {
		dataIndex : 'dirname',
		text : '栏目',
		align: "center",


	}, {
		dataIndex : 'title',
		text : '标题',
		align: "center",
		width:260


	}, {
		dataIndex : 'content',
		text : '内容',
		align: "center",
		width:360,


	},{
			menuDisabled: true,
			sortable: false,
		 // locked   : true,
			xtype: 'actioncolumn',
			//flex: 90,
	align : "center",
			text: '操作',
			items: [{
					iconCls: 'fa fa-pencil-square fa-lg opear-button',
					action: 'edit',

					tooltip: '修改帖子',
					handler: 'onposteditClick'
			}, {
				iconCls: 'fa fa-trash fa-lg opear-button',
				action: 'del',
					tooltip: '删除帖子',

					handler: '_onDeletepost'
			}]
	},{
		dataIndex : 'content_url',
		text : 'url',
		align: "center",
		width:260,


	}, {
		dataIndex : 'create_time',
		text : '发帖时间',
		align: "center",
	}, {
		dataIndex : 'status',
		text : '状态',
		align: "center",
		width : 90,
		renderer : function(v) {
			return just.util.valueTransText(v, just.data.CUR_STATUS,
					'color_status');
		}
	}
    ],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ {
											xtype : 'button',
											ui: 'soft-blue',
											width:100,
											text : '新增帖子',
											iconCls : 'fa fa-align-left fa-plus-square-o',
											listeners: {
											click: 'onpostaddClick'
											}
                    },'| ',{
                    	xtype : 'form',
        name :'post_search_form',
        layout : 'column',// 列布局
		margin : '0 0 0 0',
		defaultType : 'textfield',// 默认的Form表单组件
		defaults : {
		labelWidth : 60,
		labelAlign : 'right',
		//columnWidth : 0.15,// 列宽百分百
		padding : '0 0 0 0',// 行列间距
		selectOnFocus : true,// 选中所有内容
		allowBlank : true,
    height: 25,
		minLength : 0,
		maxLength : 30
	},
	items : [
{
	name : 'postkey',
	fieldLabel : '<span style="font-weight:bold">关键字</span>',
	emptyText : '请输入关键字',
	width:240,
	blankText : '关键字不能为空'
},
		{
			xtype: 'datefield',
      fieldLabel: '发表日期',
      name: 'st_date',
      emptyText : '请输入开始日期',
      width:200,
      value: Ext.Date.add(new Date(), Ext.Date.DAY,-7),
      format:'Y-m-d'
		},{
			xtype: 'datefield',
            fieldLabel: '结束日期',
            name: 'et_date',
            emptyText : '请输入结束日期',
            width:200,

            value: new Date(),
            format:'Y-m-d'
		},{
            xtype: 'button',
            iconCls: 'icon-search',
            text : '搜索',
            action: 'search',
            width:80,
            margin: '0 0 0 20',
            columnWidth : 0.15,
            listeners: {
                        click: '_loadData'
                        }
        }
        ]
                    }]
                }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{post}'
		}
	} ],

	}],
	margin : '10 10 5 10'
});
