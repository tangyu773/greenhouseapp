Ext.define('Admin.view.ctl.ssc.SscSubEdit', {
	extend: 'Ext.window.Window',
	alias: 'widget.ctl_ssc_SscSubEdit',
	autoShow: true,//自动打开
    modal: true,//模态窗口
    width: 420,//窗体宽度
//    height : 240,//窗体高度
    resizable: false,
    iconCls: 'editIcon',
    title: '修改遮阳帘控制子配置',
    constrain: true,//是否限制窗口超出浏览器
    plain: true,	//是否设置窗口透明背景
    bodyPadding: '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true,	//是否添加滚动条
	
    controller: 'ctl_ssc_Ssc',
    items:[{
		xtype: 'form',
		layout: 'column',
		defaultType: 'textfield',
		margin: '20 0 0 0',
		defaults: {
			labelWidth: 115,
			labelAlign: 'right',
			columnWidth: 1,
			padding: '0 15 20 10',
			allowBlank: false,
			minLength: 0,
			maxLength: 32
		},
		items : [  {
			xtype: 'hiddenfield',
			name: 'start_date_copy'
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
                        	var listGrid = Ext.ComponentQuery.query('ctl_ssc_SscSubList')[0];
//                        	var listGrid = Ext.getCmp('ctl_ssc_SscSubList_ID');
                    		var listStore = listGrid.getViewModel().getData().SscSubGrid;
                    		var store_temp = Ext.create('Admin.store.ctl.ssc.SscSubStore');
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
            			var listGrid = Ext.ComponentQuery.query('ctl_ssc_SscSubList')[0];
//            			var listGrid = Ext.getCmp('ctl_ssc_SscSubList_ID');
            			var listStore = listGrid.getViewModel().getData().SscSubGrid;
            			var store_temp = Ext.create('Admin.store.ctl.ssc.SscSubStore');
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
            listeners: {
            	'beforerender': function(cmp, eOpts){
            		var rec = this.previousSibling().previousSibling().store.getAt(0);
            		cmp.store.insert(48,rec);
            	}
            },
            validator: function(value){
                var s_minute = Ext.Date.format(this.previousSibling().value, 'H:i');
                if(s_minute && value <= s_minute){
                    return '结束时间不能小于等于开始时间!';
                }else{
                    return true;
                }
            }
		}, {
        	xtype: 'numberfield',
            name: 'minlux',
            fieldLabel: '<span class="form_require_symbol">*</span>遮阳帘流明关闭值',
            minValue: 0,
//            maxValue: 1440,
            emptyText: '请输入遮阳帘流明关闭值',
            blankText: '遮阳帘流明关闭值不能为空',
            validator: function(value){
                var maxlux = this.nextSibling().value;
                if(maxlux && value >= maxlux){
                	return '遮阳帘流明关闭值不能大于等于遮阳帘流明开启值';
                }else{
                	return true;
                }
            }
		}, {
        	xtype: 'numberfield',
            name: 'maxlux',
            fieldLabel: '<span class="form_require_symbol">*</span>遮阳帘流明开启值',
            minValue: 0,
//            maxValue: 1440,
            emptyText: '请输入遮阳帘流明开启值',
            blankText: '遮阳帘流明开启值不能为空',
            validator: function(value){
                var minlux = this.previousSibling().value;
                if(minlux && value <= minlux){
                    return '遮阳帘流明开启值不能小于等于遮阳帘流明关闭值!';
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
		}, {
			xtype: 'displayfield',
//			fieldLabel: '<span class="form_require_symbol">注意</span>',
			value: '<span class="form_require_symbol">注意: 只有在开始时间和结束时间范围内，设置的遮阳帘流明开启值与遮阳帘流明关闭值才有效！</span>'
		}],
		buttonAlign: 'center',
		buttons: [{
			text: '确定',
			disabled: true,
	  		formBind: true,
	  		listeners: {
	  			click: '_onEditSubSsc',
	  		}
		} ]
	}]
	
});

