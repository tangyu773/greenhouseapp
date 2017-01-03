Ext.define('Admin.view.post.pdir.Pdir', {
	extend : 'Ext.container.Container',
	xtype : 'pdir_pdir',
	requires: [
		'Admin.view.post.pdir.PdirController',
		'Admin.view.post.pdir.PdirAdd',
		'Admin.view.main.Window',
		'Admin.view.post.pdir.PdirViewModel',
		'Admin.store.pdir',
		'Admin.view.post.pdir.PdirEdit'
    ],
	controller : 'pdir_controller',
	name:'pdir_pdir',
	reference: 'pdir_pdir',
	viewModel : {
		type: 'pdir_pdir'
	},
	cls: 'shadow-panel',
//	itemId : 'batch_batch',
	// 列表布局
	layout : 'column',
	listeners: {
      render: '_loadData'
    },
    items: [{
    	title : '栏目管理',
    	columnWidth : 1.0,
        xtype: 'grid',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{pdir}'
		 },
		 viewConfig : {
			enableTextSelection:true  ,
			 stripeRows: true
		 },

		 defaults : {
          // width:160
        },
	    forceFit: true,

	    columnLines:true,
	    columns : [ {
		dataIndex : 'dirid',
		text : 'ID',
		width:80,
		align: "center",
	}, {
		dataIndex : 'dir_logo',
		text : '栏目logo',
		align: "center",
		//locked:true,
		width:100,
        renderer:function(v,meta,record){
        	if(!Ext.isEmpty(v)){
        		return '<div data-qtip="'+Ext.String.format("<img src='{0}' width=192 height=192/>",v)+'"> '
        			+Ext.String.format("<img src='{0}' width=32 height=32/>", v)+'</div>';
        	}
        	return '<div data-qtip="暂无产品图片，请上传"> '+Ext.String.format("<img src='{0}' width=32 height=32/>",just.getUrl('/images/no_preview.png'))+'</div>';
		}
	}, {
		dataIndex : 'dirname',
		text : '栏目名称',
		align: "center",
		width:80


	}, {
		dataIndex : 'note',
		text : 'note',
		align: "center",
		width:200,


	}, {
		dataIndex : 'post_count',
		text : '文章数',
		width:80,
		align: "center",
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
					tooltip: '修改栏目',
					handler: 'ondireditClick'
			}, {
				iconCls: 'fa fa-trash fa-lg opear-button',
				action: 'del',
					tooltip: '删除栏目',
					handler: '_onDeletedir'
			}]
	}
    ],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ {
											xtype : 'button',
											ui: 'soft-blue',
											text : '新增栏目',
											width:100,
											iconCls : 'fa fa-align-left fa-plus-square-o',
											action:'add',
											listeners: {
											click: 'ondiraddClick'
											}
                    },'| ',{
                    	xtype : 'form',
        name :'pdir_search_form',
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
	name : 'pdir_keys',
	fieldLabel : '<span style="font-weight:bold">关键字</span>',
	emptyText : '请输入关键字',
	width:240,
	blankText : '不能为空'
},
		// {
		// 	xtype: 'datefield',
    //         fieldLabel: '出库日期',
    //         name: 'st_date',
    //         emptyText : '请输入开始日期',
    //         width:200,
    //         value: Ext.Date.add(new Date(), Ext.Date.DAY,-7),
    //         format:'Y-m-d'
		// },{
		// 	xtype: 'datefield',
    //         fieldLabel: '结束日期',
    //         name: 'et_date',
    //         emptyText : '请输入结束日期',
    //         width:200,
		//
    //         value: new Date(),
    //         format:'Y-m-d'
		// },

   {
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
				// ,{
        //             	xtype: 'button',
        //                     iconCls: 'icon-download-alt',
        //                     text : '下载出库模板',
        //                     action: 'search',
        //                     width:130,
        //                     margin: '0 0 0 10',
        //                     columnWidth : 0.15,
        //                     listeners: {
        //                                 click: '_onDownloadtemple'
        //                                 }
				//
        //             }
									]


                    }/*,'| ',{
                    	xtype : 'button',
                        ui: 'soft-blue',
                        text : '导   出',
                        width:80,
                        iconCls : 'fa fa-align-left fa-sign-out ',
                        listeners: {
                        click: 'onorderexport'
                        }

                    }*/]
                }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{pdir}'
		}
	} ],

	}],
	margin : '10 10 5 10'
});
