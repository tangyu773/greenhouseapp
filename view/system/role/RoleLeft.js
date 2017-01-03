Ext.define('Admin.view.system.role.RoleLeft', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.system_role_RoleLeft',
	
	id: 'system_role_RoleLeft_panel',
	height:Math.floor(Ext.Element.getViewportHeight()-115),
	bind : {
		store : '{roleGrid}'
	},
	
	viewConfig : {
		preserveScrollOnRefresh : true,
		preserveScrollOnReload : true
	},
	selModel : {
		checkOnly : true,
		showHeaderCheckbox : true
	},
	//headerBorders : false,
	forceFit: true,
	rowLines : true,
	columns : [
			{
				text : "角色名称",
				dataIndex : "roledes",
				align : "center",
		        /*renderer: function(v, m){
		            m.innerCls = 'grid_row_content_bold_left';
		            return v;
		        }*/
			},
			{
				text : "角色状态",
				dataIndex : "useflag",
				align : "center",
				renderer : function(v) {
					return just.util.valueTransText(v, just.data.CUR_STATUS,
							'color_status');
				}
			}
			,
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
            tooltip: '修改',
            handler: '_onShowEditWin'
        }]
    }],
	dockedItems : [ {
		xtype : 'toolbar',
		items : [ {
			xtype : 'button',
			text : '刷新',
			ui: 'soft-blue',
			iconCls : 'icon-refresh',
			action : 'refresh',
			width:60
		 }]
	}]
});
