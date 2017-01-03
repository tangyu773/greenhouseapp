Ext.define('Admin.view.ctl.at.AtController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctl_at_At',
    init: function() {
        this.control({
        	'ctl_at_At': {
        		afterrender: this._initPermission,
        	},
        	'ctl_at_AtList': {
        		beforerender: this._onSetSubAtRefresh,
        		afterrender: this._onRefreshAt,
        		itemclick: this._onRefreshSubAt
        	},
        	'ctl_at_AtList button[action=add]': {
        		click: this._onShowAddAtWin
        	},
        	'ctl_at_AtSubList': {
        		beforerender: this._onSetSubAtRefresh,
        		itemdblclick: this._onShowAddAutoAtWin
        	},
        	'ctl_at_AtSubList button[action=add]': {
        		click: this._onShowAddSubAtWin
        	}
        });
    },	
    
    
	/**
	 * 初始化权限
	 */
    _initPermission: function(cmp){
    	var refs = this.getReferences();
        var at_grid = refs.ctl_at_grid,
        at_sub_grid = refs.ctl_at_sub_grid;
        var tab = cmp.up('ctl_CtlViewTab');
        if(tab == undefined){
            return;
        }
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(tab,at_grid);
        util.initPermission(tab,at_sub_grid);
 	},
 	
 	/**
	 * 刷新风机控制配置
	 */
    _onRefreshAt: function(){
		this._loadAtData();
	},
	
	/**
	 * 加载风机控制配置数据
	 */
	_loadAtData: function(page){
		var listGrid = Ext.ComponentQuery.query('ctl_at_AtList')[0];
//		var listGrid = Ext.getCmp('ctl_at_AtList_ID');
		var listStore = listGrid.getViewModel().getData().AtGrid;
		if(!page){
			page = 1;
		}
		listStore.currentPage = page;
		listStore.load();
		//子表清空
		var listGrid1 = Ext.ComponentQuery.query('ctl_at_AtSubList')[0];
//		var listGrid1 = Ext.getCmp('ctl_at_AtSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().AtSubGrid;
		listStore1.removeAll();
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){//权限控制会把它删除，所以要判断
			btn.setDisabled(true);
		}
		var btn1 = listGrid1.down('toolbar').down('button[action=refresh]');
		btn1.setDisabled(true);
		//子grid 刷新不可见
//		just.util.setGridPagingToolbarRefresh(listGrid1);
	},
	
	 /**
     * 显示添加风机控制界面
     */
    _onShowAddAtWin: function(){
    	var win = Ext.widget("ctl_at_AtAdd");
    },
    
    /**
     * 添加风机控制配置
     */
	_onAddAt: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.compid = formParams.compid;
    		params.dispname = formParams.dispname;
    		params.useflag = formParams.useflag;
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_at_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefreshAt();
    				}
    			}
    		});
    	}
    }, 
    
    /**
     * 设置子grid刷新按钮状态
     */
    _onSetSubAtRefresh: function(cmp){
    	//因为这个刷新不会刷新子table,所以去掉
    	just.util.setGridPagingToolbarRefresh(cmp);
    },
    
    /**
	 * 刷新风机控制子配置
	 */
    _onRefreshSubAt: function(){
		this._loadSubAtData();
	},
    
    /**
	 * 加载风机控制子配置数据
	 */
    _loadSubAtData: function(page){
    	var listGrid = Ext.ComponentQuery.query('ctl_at_AtList')[0];
//    	var listGrid = Ext.getCmp('ctl_at_AtList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    	}
    	var params = {};
    	params.trigid = records[0].data.trigid;
    	
    	var listGrid1 = Ext.ComponentQuery.query('ctl_at_AtSubList')[0];
//    	var listGrid1 = Ext.getCmp('ctl_at_AtSubList_ID');
		var listStore1 = listGrid1.getViewModel().getData().AtSubGrid;
		var btn = listGrid1.down('toolbar').down('button[action=add]');
		if(btn){
			btn.setDisabled(false);
		}
		var btn1 = listGrid1.down('toolbar').down('button[action=refresh]');
		btn1.setDisabled(false);
		if(!page){
			page = 1;
		}
		listStore1.currentPage = page;
		listStore1.proxy.extraParams = {
            params: Ext.encode(params)
		};
		listStore1.load();
		//子grid 刷新可见
//		just.util.setGridPagingToolbarRefresh(listGrid1, true);
		listGrid1.plugins[0]._store.load();
    },
    
    /**
     * 显示添加风机控制子配置界面
     */
    _onShowAddSubAtWin: function(){
    	var win = Ext.widget("ctl_at_AtSubAdd");
    },
    
    /**
     * 添加风机控制子配置
     */
	_onAddSubAt: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	
    	var listGrid = Ext.ComponentQuery.query('ctl_at_AtList')[0];
//    	var listGrid = Ext.getCmp('ctl_at_AtList_ID');
    	var records = listGrid.getSelectionModel().getSelection();
    	if(records && records.length != 1){
    		Ext.Msg.alert("系统提示", "请选择一条记录");
    		return;
    	}
    	
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.trigid = records[0].data.trigid;
    		params.start_date = formParams.start_date;
    		params.stop_date = formParams.stop_date;
    		params.style = formParams.style;
    		params.max_minute = formParams.max_minute;
    		params.start_temp = formParams.start_temp;
    		params.stop_temp = formParams.stop_temp;
    		params.start_temp_type = formParams.start_temp_type;
    		params.stop_temp_type = formParams.stop_temp_type;
    		params.slow_step = formParams.slow_step;
    		params.useflag = formParams.useflag;
    		
    		console.log(params);
    		just.showWaitingDlg("正在提交数据,请稍候...");
    		Ext.Ajax.request({
    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_at_add_c.action'),
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._loadSubAtData();
    				}
    			}
    		});
    	}
    }, 
    
    /**
     * 显示风机控制子配置修改界面
     */
    _onShowEditSubAtWin: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var win = Ext.widget("ctl_at_AtSubEdit");
    	win.down('form').loadRecord(record);
    	
    	var start_date = Ext.Date.parse(record.data.start_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=start_date]').setValue(start_date);
        var stop_date = Ext.Date.parse(record.data.stop_date, "Y-m-d H:i:s");
        win.down('form').down('datefield[name=stop_date]').setValue(stop_date);
        
        win.down('form').down('hiddenfield[name=start_date_copy]').setValue(record.data.start_date);
        
    },
    
    /**
     * 修改风机控制子配置
     */
    _onEditSubAt: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	
    	if(form.isValid()){
    		Ext.MessageBox.confirm("系统提示","如果缩小了温度范围, 则在温度范围外的记录将会被删除!", function(e){
    			if(e == 'yes'){
    				var formParams = form.getValues();
    	    		var params = {};
    	    		params.trigid = formParams.trigid;
    	    		params.subid = formParams.subid;
    	    		params.start_date = formParams.start_date;
    	    		params.stop_date = formParams.stop_date;
    	    		params.style = formParams.style;
    	    		params.max_minute = formParams.max_minute;
    	    		params.start_temp = formParams.start_temp;
    	    		params.stop_temp = formParams.stop_temp;
    	    		params.start_temp_type = formParams.start_temp_type;
    	    		params.stop_temp_type = formParams.stop_temp_type;
    	    		params.slow_step = formParams.slow_step;
    	    		params.useflag = formParams.useflag;
    	    		console.log(params);
    	    		just.showWaitingDlg("正在提交数据,请稍候...");
    	    		Ext.Ajax.request({
    	    			url: just.getUrl('/sys/ctl/gh10_ctl_sub_at_update_u.action'),
    	    			params: {params: Ext.encode(params)},
    	    			success: function(response, options){
    	    				var jsonObj = Ext.JSON.decode(response.responseText);
    	    				just.hideWaitingDlg(jsonObj.info,true);
    	    				if(jsonObj.status == '200'){
    	    					win.close();
    	    					me._loadSubAtData();
    	    				}
    	    			}
    	    		});
    			}
    		});
    	}
    },
    
    /**
     * 删除风机控制子配置(禁用)
     */
    _onDeleteSubAt: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var params = {};
    	params.trigid = record.data.trigid;
    	params.subid = record.data.subid;
    	params.useflag = record.data.useflag == 1 ? 0 : 1 ;
    	if(record.data.useflag == 0){
    		params.useflag = 1;
    		Ext.MessageBox.confirm("系统提示","是否启用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在启用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_at_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubAtData();
    						}
    					}
    				});
    			}
    		});
    	}else{
    		params.useflag = 0;
    		Ext.MessageBox.confirm("系统提示","是否禁用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在禁用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_sub_at_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							me._loadSubAtData();
    						}
    					}
    				});
    			}
    		});
    	}
    },
    
    /**
     * 删除风机自动控制记录（禁用）
     */
    _onDeleteAuto: function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var me = this;
    	var params = {};
    	params.trigid = record.data.trigid;
    	params.subid = record.data.subid;
    	params.t_min = record.data.t_min;
    	params.useflag = (record.data.useflag == 1 ? 0 : 1);
    	Ext.Ajax.request({
    		url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_delete_d.action'),
			params: {params: Ext.encode(params)},
			success: function(response, options){
				var jsonObj = Ext.JSON.decode(response.responseText);
				if(jsonObj.status == '200'){
					grid.store.load();
				}
			}
		});
   /* 	if(record.data.useflag == 0){
    		params.useflag = 1;
    		just.showWaitingDlg("正在启用选中记录,请稍候...");
    		Ext.MessageBox.confirm("系统提示","是否启用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在启用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							grid.store.load();
    						}
    					}
    				});
    			}
    		});
    	}else{
    		params.useflag = 0;
    		just.showWaitingDlg("正在禁用选中记录,请稍候...");
    		Ext.MessageBox.confirm("系统提示","是否禁用选中记录?", function(e){
    			if(e == 'yes'){
    				just.showWaitingDlg("正在禁用选中记录,请稍候...");
    				Ext.Ajax.request({
    					url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_delete_d.action'),
    					params: {params: Ext.encode(params)},
    					success: function(response, options){
    						var jsonObj = Ext.JSON.decode(response.responseText);
    						just.hideWaitingDlg(jsonObj.info, true);
    						if(jsonObj.status == '200'){
    							grid.store.load();
    						}
    					}
    				});
    			}
    		});
    	}*/
    },
    
    /**
     * 添加温度控制
     */
    onAddAuto: function(btn){
    	var win = btn.up('window');
    	var cob = win.down('combo[name=temp]');
    	var val = cob.getValue();
    	if(!val){
    		Ext.Msg.alert('系统提示', '请选择一个温度值');
    		return;
    	}
    	var formParams = win.down('form').getValues();
    	var params = {};
    	params.trigid = formParams.trigid;
    	params.subid = formParams.subid;
    	params.temp_val = val;
    	
    	Ext.Ajax.request({
			url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_temp_add_c.action'),
			params: {params: Ext.encode(params)},
			success: function(response, options){
				var jsonObj = Ext.JSON.decode(response.responseText);
				if(jsonObj.status == '200'){
					win.down('grid').store.load();
					win.down('multislider').addThumb(val);
					var record1;
					cob.store.each(function(record) {   
						if(record.get('field1') == val){
							record1 = record;
						}
				 	}); 
					cob.reset();
					cob.store.remove(record1);
				}
			}
		});
    	
    },
    
    
    /**
     * 双击显示风机自动控制界面
     */
    _onShowAddAutoAtWin: function(cmp, record, item, index, e, eOpts){
    	var me = this;
    	var win = Ext.widget("ctl_at_AtAutoAdd");
    	//监听窗口关闭事件，刷新grid
    	win.on({
    		close: function(w){
    			cmp.up('grid').plugins[0]._store.reload();
    			cmp.up('grid').store.load();
    		}
    	});
    	
    	win.down('form').loadRecord(record);
    	var mutiSlider = win.down('multislider');
    	var cob = win.down('combo[name=temp]');
    	
    	var temp_value = [];
    	var slider_value = [];
    	var start_temp = record.data.start_temp;
    	var stop_temp = record.data.stop_temp;
    	for(var i = stop_temp; i < start_temp; i++){
    		temp_value.push(i);
    	};
    	
    	var params = {};
    	params.trigid  = record.data.trigid;
    	params.subid = record.data.subid;
    	var grid = win.down('grid');
    	grid.store.proxy.extraParams = {
            params: Ext.encode(params)
    	};
    	grid.store.proxy.url = grid.store.proxy.api.QUERY_BY_ID;
    	grid.store.load({
            scope: this,
            callback: function(records, operation, success) {
            	if(records){
            		for(var i = 0; i < records.length; i++){
            			var val = records[i].data.t_min;
            			temp_value._remove(val);
            			slider_value.push(val);
            		}
            	}
            	cob.bindStore(null);
            	cob.bindStore(temp_value);
            	mutiSlider.setMinValue(record.data.stop_temp);
            	mutiSlider.setMaxValue(record.data.start_temp - 1);
            	if(slider_value.length == 1){
            		mutiSlider.setValue(0, slider_value[0]);
            	}else{
            		mutiSlider.setValue(0, slider_value[0]);
            		for(var j = 1; j < slider_value.length; j++ ){
                		mutiSlider.addThumb(slider_value[j]);
                	}
            	}
            	mutiSlider.originalValue = mutiSlider.getValues();
            }
    	});
    	//监听滑块拖动完成事件，更新温度范围与可添加温度范围的值
    	mutiSlider.on({
    	    changecomplete: function(cmp, newValue, thumb, eOpts){
    	    	var params = {};
    	    	
    	    	var values = cmp.getValues();
    	    	var originalValue = cmp.originalValue;
    	    	
    	    	params.trigid  = record.data.trigid;
    	    	params.subid = record.data.subid;
    	    	params.oldValue = thumb.dragStartValue;
    	    	params.newValue = newValue;
    	    	
    	    	if(originalValue._indexOf(newValue) != -1){
    	    		var index = originalValue._indexOf(thumb.dragStartValue);
    	    		if(thumb.dragStartValue > newValue){
    	    			originalValue.splice(index, 1, (newValue + 1));
    	    			params.newValue = newValue + 1;
    	    		}else{
    	    			originalValue.splice(index, 1, (newValue - 1));
    	    			params.newValue = newValue - 1;
    	    		}
    	    		values = originalValue;
    	    	}
    	    	cmp.setValue(values);
    	    	cmp.originalValue = values;
    	    	if(params.newValue != params.oldValue){
    	    		Ext.Ajax.request({
    	    			url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_temp_update_u.action'),
    	    			params: {params: Ext.encode(params)},
    	    			success: function(response, options){
    	    				var jsonObj = Ext.JSON.decode(response.responseText);
    	    				if(jsonObj.status == '200'){
    	    					temp_value._remove(params.newValue);
    	    					temp_value.push(params.oldValue);
    	    					cob.bindStore(null);
    	    					cmp.up('window').down('grid').store.load();
    	    					cmp.up('window').down('combo[name=temp]').bindStore(temp_value.sort());
    	    				}
    	    			}
    	    		});
    	    	}
    	    	
    	    },
    	    scope: this // Important. Ensure "this" is correct during handler execution
    	});
    	
    }
    
});
