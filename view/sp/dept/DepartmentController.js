Ext.define('Admin.view.sp.dept.DepartmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sp_dept_Department',
    _container: undefined,
    _departmentGrid: undefined,
    init: function() {
        this.control({
        	'sp_dept_Department':{
    			beforerender: this._initViews
        	},
        	'sp_dept_StaffList':{
        		afterrender: this._onShowNoDeptStaff,
        	},
        	'sp_dept_DepartmentList':{
        		itemclick: this._onShowDeptStaff
        	},
        	'sp_dept_DepartmentList button[action=add]': {
        		click: this._onShowAddWin
        	},
        	'sp_dept_DepartmentAdd button[action=save]':{
        		click: this._onAddDept
        	},
        	'sp_dept_DepartmentList button[action=edit]': {
        		click: this._onShowEditWin
        	},
        	'sp_dept_DepartmentEdit button[action=save]':{
        		click: this._onEditDept
        	},
        	'sp_dept_DepartmentList button[action=delete]': {
        		click: this._onDeleteDept
        	},
        	
        	'sp_dept_ButtonView button[action=add]':{
        		click: this._onAddDeptStaff
        	},
        	'sp_dept_ButtonView button[action=delete]':{
        		click: this._onDeleteDeptStaff
        	},
        	
        });
    },	
    
	 /**
     * 界面加载后
     */
	_initViews : function(cmp, eOpts){
		this._container = cmp;
		this._departmentGrid = cmp.down('sp_dept_DepartmentList');
	},
	/**
	 * 初始化权限
	 */
    initPermission : function(cmp){
        var me = this;
        var refs = me.getReferences(),
        dept_grid = refs.dept_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp,dept_grid);
        var btn_panel = Ext.getCmp('sp_dept_ButtonView_Panel');
        if(cmp.rawParams.c == 0 || cmp.rawParams.u == 0){
        	var btn_add = btn_panel.down('button[action=add]');
        	btn_add.disable();
        }
        if(cmp.rawParams.d == 0 ){
        	var btn_delete = btn_panel.down('button[action=delete]');
        	btn_delete.disable();
        }
 	},
 	/**
     * 查询未添加部门员工
     */
    _onShowNoDeptStaff: function(){
    	this._onRefresh_Staff();
    },
    /**
	 * 刷新未添加部门员工grid
	 */
	_onRefresh_Staff:function(page){
		var ulists =Ext.ComponentQuery.query("gridpanel[name='sp_dept_StaffList']");
		var ulist = ulists[ulists.length-1];
		var listStore =  ulist.getViewModel().getData().StaffGrid;
		if(!page){
 			page = 1;
 		}
		listStore.currentPage = page;
 		listStore.proxy.extraParams = {params: Ext.encode({corpid: just.data.user.loginInfo.corpid})};
 		listStore.load();
	},
	/**
     * 显示部门员工
     */
    _onShowDeptStaff: function(cmp, record, item, index, e, eOpts){
    	this._onRefresh_dept_staff();
    },
	/**
	 * 刷新部门员工grid
	 */
	_onRefresh_dept_staff:function(page){
		var ulists = Ext.ComponentQuery.query("panel[name='sp_dept_DepartmentList']");
        var ulist = ulists[ulists.length-1];
        var records = ulist.getSelectionModel().getSelection();
        if(records.length == 0 || records == undefined){
			Ext.Msg.alert("系统提示", "请选择一个部门!");
			return;
		}
		
        var ulists2 =Ext.ComponentQuery.query("gridpanel[name='sp_dept_DepartmentStaffList']");
        var ulist2 = ulists2[ulists2.length-1];
        var listViewModel =  ulist2.getViewModel(),
 		data = listViewModel.getData(),
 		listStore = data.StaffGrid;
        var page;
 		if(!page){
 			page = 1;
 		}
 		listStore.currentPage = page;
 		listStore.proxy.url = listStore.proxy.api.DEPT_STAFF;
 		listStore.proxy.extraParams = {params: Ext.encode({corpid: records[0].data.corpid, departid: records[0].data.id})};
 		listStore.load();
	},
    
    /**
     * 显示添加界面
     */
    _onShowAddWin: function(){
    	var records = this._departmentGrid.getSelectionModel().getSelection();
        var pid = 0;
        if(records.length != 0 && records != undefined){
			pid = records[0].data.id;
		}
    	var win = Ext.widget("sp_dept_DepartmentAdd");
    	win.down('treepicker[name=parentid]').setValue(pid);
    	win.down('treepicker[name=parentid]').getStore().load();
    },
    /**
     * 添加部门
     */
    _onAddDept: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.corpid = just.data.user.loginInfo.corpid;
    		params.departname = formParams.departname;
    		params.parentid = formParams.parentid;
    		params.contacts = formParams.contacts;
    		params.telno = formParams.telno;
    		var listStore = this.getView().getViewModel().getData().DepartmentGrid;
    		just.showWaitingDlg("正在添加部门,请稍候...");
    		Ext.Ajax.request({
    			url: listStore.proxy.api.ADD,
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefresh_dept();
    				}
    			}
    		});
    	}
    },
    /**
	 * 刷新部门
	 */
	_onRefresh_dept:function(){
		var ulists =Ext.ComponentQuery.query("panel[name='sp_dept_DepartmentList']");
        var ulist = ulists[ulists.length-1];
        var listStore =  ulist.getViewModel().getData().DepartmentGrid;
        listStore.load();
        ulist.getSelectionModel().deselectAll();
	},
	/**
     * 显示修改界面
     */
    _onShowEditWin: function(btn){
    	var records = this._departmentGrid.getSelectionModel().getSelection();
        if(records.length != 1){
			Ext.Msg.alert("系统提示", "请选择一个部门!");
			return;
		}
        var win = Ext.widget("sp_dept_DepartmentEdit");
        var record = records[0];
        win.down('form').loadRecord(record);
        win.down('treepicker[name=pid]').getStore().load();
    },
    
    /**
     * 修改部门
     */
    _onEditDept: function(btn){
    	var me = this;
    	var win = btn.up('window');
    	var form = win.down('form');
    	if(form.isValid()){
    		var formParams = form.getValues();
    		var params = {};
    		params.corpid = just.data.user.loginInfo.corpid;
    		params.departid = formParams.id;
    		params.departname = formParams.text;
    		params.parentid = formParams.pid;
    		params.contacts = formParams.contacts;
    		params.telno = formParams.telno;
    		var listStore = this.getView().getViewModel().getData().DepartmentGrid;
    		just.showWaitingDlg("正在修改部门,请稍候...");
    		Ext.Ajax.request({
    			url: listStore.proxy.api.UPDATE,
    			params: {params: Ext.encode(params)},
    			success: function(response, options){
    				var jsonObj = Ext.JSON.decode(response.responseText);
    				just.hideWaitingDlg(jsonObj.info,true);
    				if(jsonObj.status == '200'){
    					win.close();
    					me._onRefresh_dept();
    				}
    			}
    		});
    	}
    },
    
    /**
     * 删除部门
     */
    _onDeleteDept: function(){
    	var me = this;
    	var records = this._departmentGrid.getSelectionModel().getSelection();
        if(records.length != 1){
			Ext.Msg.alert("系统提示", "请选择一个部门!");
			return;
		}
        var params = {departid : records[0].data.id};
        var listStore = this.getView().getViewModel().getData().DepartmentGrid;
        Ext.MessageBox.confirm("系统提示","该部门下的员工也将移除,是否删除选中部门?", function(e){
			if(e == 'yes'){
				just.showWaitingDlg("正在删除选中部门，请稍候...");
				Ext.Ajax.request({
					url: listStore.getProxy().api.DELETE,
					params: {params: Ext.encode(params)},
					success: function(response, options){
						var jsonObj = Ext.JSON.decode(response.responseText);
						just.hideWaitingDlg(jsonObj.info, true);
						if(jsonObj.status == '200'){
							me._onRefresh_dept();
							me._onRefresh_Staff();
	    					me._onRefresh_dept_staff();
						}
					}
				});
			}
		});
    },
    
    /**
     * 部门添加员工
     */
    _onAddDeptStaff: function(btn){
    	var me = this;
    	var ulists =Ext.ComponentQuery.query("gridpanel[name='sp_dept_StaffList']");
        var ulist = ulists[ulists.length-1];
        var listStore =  ulist.getViewModel().getData().StaffGrid;
        
        var records = ulist.getSelectionModel().getSelection();
		if(records.length == 0 || records == undefined){
			Ext.Msg.alert("系统提示", "请至少选择一条记录!");
			return;
		}
		
		var ulists2 =Ext.ComponentQuery.query("panel[name='sp_dept_DepartmentList']");
        var ulist2 = ulists2[ulists2.length-1];
        
        var records2 = ulist2.getSelectionModel().getSelection();
        if(records2.length == 0 || records2 == undefined){
			Ext.Msg.alert("系统提示", "请选择一个部门!");
			return;
		}
		
        var param = [];
        Ext.each(records, function(record){
        	param.push(record.data.staffid);
        });
        
        var params = {};
        params.departid = records2[0].data.id;
        params.staff_ids = param.join(",");
        just.showWaitingDlg("正在添加部门员工,请稍候...");
        Ext.Ajax.request({
        	url: listStore.proxy.api.ADD_DEPT_STAFF,
        	params: {params: Ext.encode(params)},
        	success: function(response, options){
        		var jsonObj = Ext.JSON.decode(response.responseText);
        		just.hideWaitingDlg(jsonObj.info,true);
        		if(jsonObj.status == '200'){ 
        			listStore.load();
        			me._onRefresh_dept_staff();
                }
        	}
        });
        
    },
    /**
     * 部门删除员工
     */
    _onDeleteDeptStaff: function(btn){
    	var me = this;
    	var ulists =Ext.ComponentQuery.query("gridpanel[name='sp_dept_DepartmentStaffList']");
        var ulist = ulists[ulists.length-1];
        var listStore =  ulist.getViewModel().getData().StaffGrid;
        
        var records = ulist.getSelectionModel().getSelection();
		if(records.length == 0 || records == undefined){
			Ext.Msg.alert("系统提示", "请至少选择一条记录!");
			return;
		}
		
		var ulists2 =Ext.ComponentQuery.query("panel[name='sp_dept_DepartmentList']");
        var ulist2 = ulists2[ulists2.length-1];
        
        var records2 = ulist2.getSelectionModel().getSelection();
        if(records2.length == 0 || records2 == undefined){
			Ext.Msg.alert("系统提示", "请选择一个部门!");
			return;
		}
		
        var param = [];
        Ext.each(records, function(record){
        	param.push(record.data.staffid);
        });
        
        var params = {};
        params.departid = records2[0].data.id;
        params.staff_ids = param.join(",");
        just.showWaitingDlg("正在移除部门员工,请稍候...");
        Ext.Ajax.request({
        	url: listStore.proxy.api.DELETE_DEPT_STAFF,
        	params: {params: Ext.encode(params)},
        	success: function(response, options){
        		var jsonObj = Ext.JSON.decode(response.responseText);
        		just.hideWaitingDlg(jsonObj.info,true);
        		if(jsonObj.status == '200'){  
        			listStore.load();
        			me._onRefresh_Staff();
                }
        	}
        });
    },
    
});
