Ext.define('Admin.view.ctl.wc.WcAdd', {
	extend: 'Ext.window.Window',
	alias: 'widget.ctl_wc_WcAdd',
	autoShow: true,//自动打开
    modal: true,//模态窗口
    width: 360,//窗体宽度
//    height: 240,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加营养液循环泵控制配置',
    constrain: true,//是否限制窗口超出浏览器
    plain: true,	//是否设置窗口透明背景
    bodyPadding: '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true,	//是否添加滚动条
	
    controller: 'ctl_wc_Wc',
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType: 'textfield',
		margin: '20 0 0 0',
		defaults: {
			labelWidth: 65,
			labelAlign: 'right',
			columnWidth: 1,
			padding: '0 15 20 10',
			allowBlank: false,
			minLength: 0,
			maxLength: 32
		},
		items: [ {
            xtype: 'combo',
            name: 'compid',
            fieldLabel: '<span class="form_require_symbol">*</span>所属公司',
            editable: false,
            emptyText: '请选择所属公司',
            blankText: '所属公司不能为空',
            mode: 'local',
            store: Ext.create('Admin.store.ctl.sp.SpInfo'),
            valueField: 'compid',
            displayField: 'compname'
        }, {
			name: 'dispname',
			fieldLabel: '<span class="form_require_symbol">*</span>名称',
			emptyText: '请输入名称',
			blankText: '名称不能为空',
		}, {
			xtype: 'combo',
			name: 'useflag',
			fieldLabel: '<span class="form_require_symbol">*</span>启用标志',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 1,
            store: just.ST_CUR_STATUS1
		} ],
		buttonAlign: 'center',
		buttons: [{
			text: '确定',
			disabled: true,
	  		formBind: true,
	  		listeners: {
	  			click: '_onAddWc',
	  		}
		} ]
	}],
	
});

