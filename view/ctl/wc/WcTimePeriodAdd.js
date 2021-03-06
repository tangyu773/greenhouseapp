Ext.define('Admin.view.ctl.wc.WcTimePeriodAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.ctl_wc_WcTimePeriodAdd',
	id : 'ctl_wc_WcTimePeriodAdd_Panel',
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
	
    controller : 'ctl_wc_Wc',
	
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
		items : [  {
        	xtype: 'timefield',
        	name: 'temp_time',
        	hidden: true,
        	format: 'H:i',
        	value: '23:59',
        	minValue: '23:59',
        	maxValue: '23:59',
        	increment: 1,
        	allowBlank: true
        }, {
            xtype: 'timefield',
            name: 'start_minute',
            fieldLabel: '<span class="form_require_symbol">*</span>开始时间',
            format: 'H:i',
            increment: 30,
            emptyText: '请输入开始时间',
            blankText: '开始时间不能为空',
            msgTarget: 'under',
            validator: function(value){
            	console.log(value);
            	if(value){
            		var s_minute = undefined;
            		if(value  instanceof Date){
            			s_minute = value;//要format再转换, 因为选择后再点击框时间会改变 (会多次调用验证函数) Thu Oct 13 2016 02:00:00 GMT+0800 (ä¸­å½æ åæ¶é´) --->  Tue Jan 01 2008 00:30:00 GMT+0800 (ä¸­å½æ åæ¶é´)
            		}else{
            			 s_minute = Ext.Date.parse(value, 'H:i')
            		}
            		var e_minute = this.nextSibling().value;
            		if(e_minute && just.util.transTimeToValue(s_minute) >= just.util.transTimeToValue(e_minute)){
            			return '开始时间不能大于等于结束时间';
            		}else{
            			var result = '';
                    	var s_minute_pre = undefined;
                    	var e_minute_pre = undefined;
                    	var listGrids = Ext.ComponentQuery.query('ctl_wc_WcTimePeriodList');
                	    var listGrid = listGrids[listGrids.length - 1];
//            			var listGrid = Ext.getCmp('ctl_wc_WcTimePeriodList_Panel');
                		var listStore = listGrid.store;
                		var store_temp = Ext.create('Admin.store.ctl.timeperiod.TimePeriodStore');
                		just.util.storeClone(listStore, store_temp);
                		store_temp.sort('start_minute', 'DESC');
                		store_temp.each(function(record){
                			//如果开始日期已存在，设置result, 结束遍历
                			if( record.get('start_minute') ==  just.util.transTimeToValue(s_minute)){
                				result = '该开始时间已存在，请选择其他时间！';
                				return false;
                			}
                			//找到比开始日期小的上一记录，取得这记录的结束日期,结束遍历
                			if( record.get('start_minute') < just.util.transTimeToValue(s_minute)){
                				s_minute_pre = record.get('start_minute');
                				e_minute_pre = record.get('stop_minute');
                				return false;
                			}
                		});
                		if(result != ''){
                			return result;
                		}else{
                			if(e_minute_pre != undefined && just.util.transTimeToValue(s_minute) < e_minute_pre){
                				return ' 时间【' + Ext.Date.format(s_minute, 'H:i') + '】在 【' + just.util.transValueToTime(s_minute_pre) + '】 与 【' + just.util.transValueToTime(e_minute_pre) + ' 】范围内， 请选择其他时间！'; 
                			}else{
                				return true;
                			}
                		}
            		}
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
            msgTarget: 'under',
            listeners: {
            	'beforerender': function(cmp, eOpts){
            		var rec = this.previousSibling().previousSibling().store.getAt(0);
            		cmp.store.insert(48,rec);
            	}
            },
            validator: function(value){
            	if(value){
            		var e_minute = undefined;
            		if(value  instanceof Date){
            			e_minute = value;
            		}else{
            			e_minute = Ext.Date.parse(value, 'H:i')
            		}
            		var s_minute = this.previousSibling().value;
            		if(s_minute && just.util.transTimeToValue(e_minute) <= just.util.transTimeToValue(s_minute)){
            			return '结束时间不能小于等于开始时间!';
            		}else{
            			var s_minute_next = undefined;
            			var listGrids = Ext.ComponentQuery.query('ctl_wc_WcTimePeriodList');
                	    var listGrid = listGrids[listGrids.length - 1];
//            			var listGrid = Ext.getCmp('ctl_wc_WcTimePeriodList_Panel');
            			var listStore = listGrid.store;
            			var store_temp = Ext.create('Admin.store.ctl.timeperiod.TimePeriodStore');
            			just.util.storeClone(listStore, store_temp);
            			store_temp.sort('start_minute', 'ASC');
            			store_temp.each(function(record){
            				if( record.get('start_minute') > just.util.transTimeToValue(s_minute)){
            					s_minute_next = record.get('start_minute');
            					return false;
            				}
            			});
            			just.util.transTimeToValue(s_minute)
            			if(s_minute_next != undefined && just.util.transTimeToValue(e_minute) > s_minute_next){
            				return '请选择【' + Ext.Date.format(s_minute, 'H:i') + '】与 【' + just.util.transValueToTime(s_minute_next) + '】之间的时间';
            			}else{
            				return true;
            			} 
            		}
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

