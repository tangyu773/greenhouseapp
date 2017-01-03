Ext.define('Admin.view.ctl.timeperiod.TimePeriodAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.ctl_timeperiod_TimePeriodAdd',
	id : 'ctl_timeperiod_TimePeriodAdd_Panel',
	autoShow : true,//自动打开
    modal : true,//模态窗口
    width: 360,//窗体宽度
//  height: 240,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加时间段',
    constrain: true,//是否限制窗口超出浏览器
    plain: true,	//是否设置窗口透明背景
    bodyPadding: '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true,	//是否添加滚动条
	
    controller : 'ctl_timeperiod_TimePeriod',
	
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType: 'textfield',
		margin: '20 0 0 0',
		defaults: {
			labelWidth: 95,
			labelAlign: 'right',
			columnWidth: 1,
			padding: '0 15 20 10',
			allowBlank: false,
			minLength: 0,
			maxLength: 32
		},
		items : [ {
            xtype: 'timefield',
            name: 'start_minute',
            fieldLabel: '<span class="form_require_symbol">*</span>开始时间',
            format: 'H:i',
            increment: 30,
            emptyText: '请输入开始时间',
            blankText: '开始时间不能为空',
            validator: function(value){
                var e_minute = Ext.Date.format(this.nextSibling().value, 'H:i');
                if(e_minute && value >= e_minute){
                	return '开始时间不能大于等于结束时间';
                }else{
                	return true;
                }
            }
        }, {
        	xtype: 'timefield',
            name: 'stop_minute',
            fieldLabel: '<span class="form_require_symbol">*</span>结束时间',
            format: 'H:i',
            increment: 30,
            emptyText: '请输入结束时间',
            blankText: '结束时间不能为空',
            validator: function(value){
                var s_minute = Ext.Date.format(this.previousSibling().value, 'H:i');
                if(s_minute && value <= s_minute){
                    return '结束时间不能小于等于开始时间!';
                }else{
                    return true;
                }
            }
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
	  			click: '_onAddTimePeriod',
	  		}
		} ]
	}],
});

