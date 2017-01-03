Ext.define('Admin.view.ctl.wc.WcSubAdd', {
	extend: 'Ext.window.Window',
	alias: 'widget.ctl_wc_WcSubAdd',
	autoShow: true,//自动打开
    modal: true,//模态窗口
    width: 360,//窗体宽度
//    height: 240,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加营养液循环泵控制子配置',
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
			labelWidth: 95,
			labelAlign: 'right',
			columnWidth: 1,
			padding: '0 15 20 10',
			allowBlank: false,
			minLength: 0,
			maxLength: 32
		},
		items : [ {
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
                    	var result = '';
                    	var s_date_pre = '';
                    	var e_date_pre = '';
                    	var listGrids = Ext.ComponentQuery.query('ctl_wc_WcSubList');
                    	var listGrid = listGrids[listGrids.length - 1];
//                    	var listGrid = Ext.getCmp('ctl_wc_WcSubList_ID');
                		var listStore = listGrid.getViewModel().getData().WcSubGrid;
                		var store_temp = Ext.create('Admin.store.ctl.wc.WcSubStore');
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
                		}else{
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
            			var s_date_next = '';
            			var listGrids = Ext.ComponentQuery.query('ctl_wc_WcSubList');
                    	var listGrid = listGrids[listGrids.length - 1];
//            			var listGrid = Ext.getCmp('ctl_wc_WcSubList_ID');
            			var listStore = listGrid.getViewModel().getData().WcSubGrid;
            			var store_temp = Ext.create('Admin.store.ctl.wc.WcSubStore');
            			just.util.storeClone(listStore, store_temp);
            			store_temp.sort('start_date', 'ASC');
            			store_temp.each(function(record){
            				if(record.get('start_date').substr(0,10) > s_date){
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
	  			click: '_onAddSubWc',
	  		}
		} ]
	}],
	
});

