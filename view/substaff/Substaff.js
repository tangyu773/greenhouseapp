Ext.define('Admin.view.substaff.Substaff', {
	extend : 'Ext.container.Container',
	xtype : 'system_contact',
	title : '用户管理',
	requires: [

    ],
	controller : 'substaff_substaff',
	name:'substaff_substaff',
	 reference: 'substaff_substaff',
	viewModel : {
		type : 'substaff_substaff'
	},
	itemId : 'substaff_substaff',
	// 列表布局
	layout : 'column',
	listeners: {
        render: '_loadData'
    },
    items: [{

    	columnWidth : 1.0,
        xtype: 'grid',
        height:Math.floor(Ext.Element.getViewportHeight()-80),
		 bind : {
			store : '{UserGrid}'
		 },
		 viewConfig : {
		
			 stripeRows: true
		 },


	    forceFit: true,
		
	    columnLines:true,
	    columns : [{
                xtype: 'rownumberer'
            }, {
		dataIndex : 'name',
		text : '联系人姓名',
		align: "center",
		width : 90,
		
	}, {
		dataIndex : 'idcard',
		text : '联系人身份证',
		align: "center",
		width : 120,
        
	},
    {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 90,
		align : "center",
        text: '操作',
        items: [{
            iconCls: 'fa fa-pencil-square fa-lg opear-button',
            action: 'update',
            tooltip: '修改联系人',
            handler: 'onusereditClick'
        },{
            iconCls: 'fa fa-trash fa-lg opear-button',
            action: 'update',
            tooltip: '删除联系人',
            handler: '_ondelcontactClick'
        }]
    }],
    dockedItems : [{
        xtype : 'toolbar',
		items : [ {
                    xtype : 'toolbar',
                    items : [ {
								xtype : 'button',
								text : '刷新',
								iconCls : 'icon-refresh',
								ui: 'soft-blue',
								width:65,
								listeners: {
			                        click: '_loadData'
			                        }
							},'|',{
                        xtype : 'button',
                        ui: 'soft-blue',
                        text : '新增联系人',
                        iconCls : 'fa fa-align-left fa-plus-square-o',
                        listeners: {
                        click: 'onuseraddClick'
                        }
                    } ]
                }]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
		displayInfo : true,
		bind : {
			store : '{UserGrid}'
		}
	} ],
	
	}],
	margin : '10 10 5 10'
});
