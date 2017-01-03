Ext.define('Admin.view.ctl.sensor.SensorSubEdit', {
	extend: 'Ext.window.Window',
	alias: 'widget.ctl_sensor_SensorSubEdit',
	autoShow: true,//自动打开
    modal: true,//模态窗口
    width: 360,//窗体宽度
//    height : 240,//窗体高度
    resizable: false,
    iconCls: 'editIcon',
    title: '修改采集调度子配置',
    constrain: true,//是否限制窗口超出浏览器
    plain: true,	//是否设置窗口透明背景
    bodyPadding: '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true,	//是否添加滚动条
	
    controller: 'ctl_sensor_Sensor',
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
		items: [ {
			xtype: 'hiddenfield',
			name: 'start_date_copy'
		}, {
			xtype: 'hiddenfield',
			name: 'startminute_copy'
		}, {
			xtype: 'hiddenfield',
			name: 'trigid'
		}, {
			xtype: 'hiddenfield',
			name: 'subid'
		}, {
            xtype: 'datefield',
            name: 'start_date',
            fieldLabel: '<span class="form_require_symbol">*</span>生效开始日期',
            format: 'Y-m-d',
            emptyText: '请输入生效开始日期',
            blankText: '生效开始日期不能为空',
            msgTarget: 'under',
            validator: function(value){
            	if(value){
            		var e_date = Ext.Date.format(this.nextSibling().value, 'Y-m-d');
                    if(e_date && value > e_date){
                    	return '生效开始日期不能大于生效结束日期';
                    }else{
                    	var start_date_copy = this.previousSibling('hiddenfield[name=start_date_copy]').value;
                    	if(!start_date_copy){
                    		return true;
                    	}
                    	var start_date = start_date_copy.substr(0,10);
                    	if(value == start_date){
                    		return true;
                    	}else{
                    		var result = '';//返回文本
                        	var s_date_pre = '';	//上一记录开始日期
                        	var e_date_pre = '';	//上一记录结束日期
                        	var listGrid = Ext.ComponentQuery.query('ctl_sensor_SensorSubList')[0];
//                        	var listGrid = Ext.getCmp('ctl_sensor_SensorSubList_ID');
                    		var listStore = listGrid.getViewModel().getData().SensorSubGrid;
                    		var store_temp = Ext.create('Admin.store.ctl.sensor.SensorSubStore');
                    		just.util.storeClone(listStore, store_temp);
                    		store_temp.sort('start_date', 'DESC');
                    		store_temp.each(function(record){
                    			//如果开始日期已存在，设置result, 结束遍历
                    			if(record.get('start_date').substr(0,10) == value){
                    				result = '该生效开始日期已存在，请选择其他日期！';
                    				return false;
                    			}
                    			//找到比开始日期小的上一记录，取得这记录的结束日期,结束遍历
                    			if(Ext.Date.parse(record.get('start_date').substr(0,10), "Y-m-d") < Ext.Date.parse(value, "Y-m-d")){
                    				s_date_pre = record.get('start_date').substr(0,10);
                    				e_date_pre = record.get('stop_date').substr(0,10);
                    				return false;
                    			}
                    		});
                    		if(result != ''){
                    			return result;
                    		}
                    		if(e_date_pre && start_date == s_date_pre){
                    			return true;
                    		}
                    		
                    		if(e_date_pre != '' && Ext.Date.parse(value, "Y-m-d") <= Ext.Date.parse(e_date_pre, "Y-m-d")){
                				return '日期【' + value + '】在 【' + s_date_pre + '】 与 【' + e_date_pre + ' 】范围内， 请选择其他日期！'; 
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
            xtype: 'datefield',
            name: 'stop_date',
            fieldLabel: '<span class="form_require_symbol">*</span>生效结束日期',
            format: 'Y-m-d',
            emptyText: '请输入生效结束日期',
            blankText: '生效结束日期不能为空',
            msgTarget: 'under',
            validator: function(value){
            	if(value){
            		var s_date = Ext.Date.format(this.previousSibling().value, 'Y-m-d');
            		if(!s_date){
            			return '请先选择生效开始日期！';
            		}
            		if(s_date && value < s_date){
            			return '生效结束日期不能小于生效开始日期!';
            		}else{
            			var start_date_copy = this.previousSibling('hiddenfield[name=start_date_copy]').value;
                    	if(!start_date_copy){
                    		return true;
                    	}
                    	var start_date = start_date_copy.substr(0,10);
                    	
            			var s_date_next = '';
            			var listGrid = Ext.ComponentQuery.query('ctl_sensor_SensorSubList')[0];
//            			var listGrid = Ext.getCmp('ctl_sensor_SensorSubList_ID');
            			var listStore = listGrid.getViewModel().getData().SensorSubGrid;
            			var store_temp = Ext.create('Admin.store.ctl.sensor.SensorSubStore');
            			just.util.storeClone(listStore, store_temp);
            			store_temp.sort('start_date', 'ASC');
            			store_temp.each(function(record){
            				if(record.get('start_date').substr(0,10) > s_date && record.get('start_date').substr(0,10) !=start_date){
            					s_date_next = record.get('start_date').substr(0,10);
            					return false;
            				}
            			});
            			if(s_date_next != '' && Ext.Date.parse(value, "Y-m-d") >= Ext.Date.parse(s_date_next, "Y-m-d")){
            				return '请选择【' + s_date + '】与 【' + s_date_next + '】之间的日期';
            			}else{
            				return true;
            			}
        			}
                }else{
                	return true;
                }
        	}
        }, {
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
            name: 'startminute',
            fieldLabel: '<span class="form_require_symbol">*</span>开始时间',
            format: 'H:i',
            increment: 30,
            emptyText: '请输入开始时间',
            blankText: '开始时间不能为空',
            msgTarget: 'under',
            validator: function(value){
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
            			var startminute_copy = this.previousSibling('hiddenfield[name=startminute_copy]').value;
                    	if(!startminute_copy){
                    		return true;
                    	}
                    	if(startminute_copy == just.util.transTimeToValue(s_minute)){
                    		return true;
                    	}else{
                    		var result = '';
                        	var s_minute_pre = undefined;
                        	var e_minute_pre = undefined;
                        	var listGrid = Ext.ComponentQuery.query('ctl_sensor_SensorSubList')[0];
//                			var listGrid = Ext.getCmp('ctl_sensor_SensorSubList_ID');
                    		var listStore = listGrid.getViewModel().getData().SensorSubGrid;
                    		var store_temp = Ext.create('Admin.store.ctl.sensor.SensorSubStore');
                    		just.util.storeClone(listStore, store_temp);
                    		store_temp.sort('startminute', 'DESC');
                    		store_temp.each(function(record){
                    			//如果开始日期已存在，设置result, 结束遍历
                    			if( record.get('startminute') ==  just.util.transTimeToValue(s_minute)){
                    				result = '该开始时间已存在，请选择其他时间！';
                    				return false;
                    			}
                    			//找到比开始日期小的上一记录，取得这记录的结束日期,结束遍历
                    			if( record.get('startminute') < just.util.transTimeToValue(s_minute)){
                    				s_minute_pre = record.get('startminute');
                    				e_minute_pre = record.get('stopminute');
                    				return false;
                    			}
                    		});
                    		if(result != ''){
                    			return result;
                    		}
                    		if(e_minute_pre != undefined && startminute_copy == s_minute_pre){
                    			return true;
                    		}
                    		
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
            name: 'stopminute',
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
            			var startminute_copy = this.previousSibling('hiddenfield[name=startminute_copy]').value;
                    	if(!startminute_copy){
                    		return true;
                    	}
            			
            			var s_minute_next = undefined;
            			var listGrid = Ext.ComponentQuery.query('ctl_sensor_SensorSubList')[0];
//            			var listGrid = Ext.getCmp('ctl_sensor_SensorSubList_ID');
            			var listStore = listGrid.getViewModel().getData().SensorSubGrid;
            			var store_temp = Ext.create('Admin.store.ctl.sensor.SensorSubStore');
            			just.util.storeClone(listStore, store_temp);
            			store_temp.sort('startminute', 'ASC');
            			store_temp.each(function(record){
            				if( record.get('startminute') > just.util.transTimeToValue(s_minute) && record.get('startminute') != startminute_copy){
            					s_minute_next = record.get('startminute');
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
        	xtype: 'numberfield',
            name: 'intval',
            fieldLabel: '<span class="form_require_symbol">*</span>调度频率(分钟)',
            minValue: 0,
            maxValue: 1440,
            emptyText: '请输入调度频率(分钟)',
            blankText: '调度频率不能为空',
		}, {
			xtype: 'combo',
			name: 'useflag',
			fieldLabel : '<span class="form_require_symbol">*</span>启用标志',
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
	  			click: '_onEditSubSensor',
	  		}
		} ]
	}],
	
});

