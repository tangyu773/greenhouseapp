/**
 * 模块管理控制器
 * Created by xiaozou on 15-10-22.
 */
Ext.define('Admin.view.system.role.RoleController',{
    extend: 'Ext.app.ViewController',   
    alias: 'controller.system_role_Role',
    _roleListGrid: undefined,
    _moduleListGrid: undefined,
    init: function() {
        this.control({
            'system_role_Role':{
                beforerender: this._initViews
            },
            'system_role_RoleLeft':{
                render: this._onRoleRefresh,
                itemclick: this._onRoleItemClick
            },           
            'system_role_RoleLeft button[action=refresh]':{
                click: this._onRoleRefresh
            },
            'system_role_RoleLeft button[action=add]':{
                click : this._onShowAddWin
            },
            'system_role_RoleLeft button[action=edit]':{
                click : this._onShowEditWin
            },            
            'system_role_RoleLeft button[action=delete]':{
                click : this._onDeleteRole
            },
            'system_auth_RoleAdd combo[name=role_type]': {
                change: this._onRoleTypeChange
            },
            'system_auth_RoleAdd button[action=save]':{
                click : this._onAddRole
            },
            'system_auth_RoleEdit combo[name=role_type]': {
                change: this._onRoleTypeChange
            },
            'system_auth_RoleEdit button[action=save]':{
                click : this._onEditRole
            },
            'system_role_RoleRight':{
                afterrender: this._onModuleLoad
            },
            'system_role_RoleRight [action=roleright]':{
                checkchange : this._cellcheckchange
            }
        });
    },
    /**
     * 界面加载后
     */
    _initViews : function(cmp, eOpts){
        this._container = cmp;
        this._roleListGrid = cmp.down('system_role_RoleLeft');
        this._moduleListGrid = cmp.down('system_role_RoleRight');
        this._hideSchoolView(this._roleListGrid);
    },
    /**
     * 角色刷新
     */
    _onRoleRefresh:function(){
        var roleViewModel =  this.getView().getViewModel(),
        data = roleViewModel.getData(),
        roleStore = data.roleGrid;
        roleStore.load();
    },
    /**
     * 显示添加角色界面
     */
    _onShowAddWin : function(cmp,eOpts){
        var addWin = Ext.widget('system_auth_RoleAdd');
        this._hideSchoolView(addWin);
    },
    /**
     * 显示修改角色界面
     */
    _onShowEditWin :function(grid, rowIndex, colIndex,b,h,v){
        /*var records = this._roleListGrid.getSelectionModel().getSelection();
        if(records.length != 1){
            Ext.Msg.alert("系统提示","请选择一条记录！");
            return;
        }
        var record = records[0];*/
        var editView = Ext.widget('system_auth_RoleEdit');
        editView.down('form').loadRecord(v);
    },
    /**
     * 关联名称
     */
    _onRoleTypeChange : function(cmp, newValue, oldValue, eOpts){
        //院系名称
        var params = {};
        params.role_type = newValue;
        cmp.up("form").down("combo[name=relateid]").reset();
        var relateStore = this.getView().getViewModel().data.roleGrid;
        relateStore.proxy.extraParams = {params: Ext.encode(params)};
        relateStore.proxy.url = relateStore.proxy.api.RELATELIST;
        relateStore.load();
    },
    /**
     * 添加角色保存
     */
    _onAddRole : function(cmp, eOpts){
        var roleViewModel =  this.getView().getViewModel(),
        data = roleViewModel.getData(),
        roleStore = data.roleGrid;
        var me = this;
        var win = cmp.up('window');
        var form = cmp.up('window').down('form');
        var formParams = form.getValues();
        if(form.isValid()){
            just.showWaitingDlg("正在保存角色信息,请稍候...");
            var params={};
            params.rolename=formParams.rolename;
            params.status=formParams.status;   
            params.relateid=formParams.relateid;            
            params.role_type=formParams.role_type; 
            Ext.Ajax.request({
                url:roleStore.getProxy().api.ADD,
                params:{params:Ext.encode(params)
                },
                success:function(response, opts){
                    var json = Ext.JSON.decode(response.responseText);
                    just.hideWaitingDlg(json.info, true);
                    if (json.status == '200') {
                        Ext.Msg.alert("系统提示",json.info);
                        Ext.getCmp('system_role_RoleLeft_panel').store.load();
                        win.close();
                    }
                }
            })
        }
    },
    /**
     * 编辑角色界面
     */
    _onEditRole: function(cmp, eOpts){
        var roleViewModel =  this.getView().getViewModel(),
        data = roleViewModel.getData(),
        roleStore = data.roleGrid;
        var me = this;
        var win = cmp.up('window');
        var form = cmp.up('window').down('form');
        var formParams = form.getValues();
        if(form.isValid()){
            just.showWaitingDlg("正在保存角色信息,请稍候...");
            var params={};
            params.roleid=formParams.roleid;   
            params.rolename=formParams.roledes;
            params.status=formParams.useflag;   
            Ext.Ajax.request({
                url: roleStore.getProxy().api.UPDATE,
                params:{params:Ext.encode(params)
                },
                success:function(response, opts){
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    just.hideWaitingDlg(jsonObj.info,false);
                    Ext.Msg.alert('系统提示',jsonObj.info);
                    if(jsonObj.status == '200'){                 
                        Ext.getCmp('system_role_RoleLeft_panel').store.load();
                        Ext.getCmp('system_role_RoleLeft_panel').getSelectionModel().deselectAll();
                        win.close();//关闭窗体
                    }
                }
            })
        }
    },
    /**
     * 删除角色
     */
    _onDeleteRole : function(cmp,eOpts){
        var me = this;
        var records = this._roleListGrid.getSelectionModel().getSelection();
        if(records.length != 1){
            Ext.Msg.alert("系统提示","请选择一条记录！");
            return;
        }
        var record = records[0];
        var params = {};
        params.id = record.data.roleid;
        if(Ext.MessageBox.confirm("系统提示","是否删除选中角色？",function(e){
            if(e == 'yes'){
                just.showWaitingDlg("正在删除选中的角色,请稍候...");
                Ext.Ajax.request({
                    url: me._roleListGrid.getStore().getProxy().api.DELETE,
                    params : {
                       params: Ext.encode(params)
                    },
                    success : function(response, options){
                        var json = Ext.JSON.decode(response.responseText);
                        just.hideWaitingDlg(json.info,true);
                        if (json.status == '200') {
                            me._onRoleRefresh();
                            me._roleListGrid.getSelectionModel().deselectAll();
                        }
                   }
                });
            }
        }));
    },
    /**
     * 角色右边权限管理初始化数据
     */
    _onModuleLoad : function(cmp){    
        this.roleId = 0;
        this.role_type = 0;
    },
    /**
     * 点击角色
     */
    _onRoleItemClick : function(v, record, item, index, e, eOpts){
        this.roleId = record.data.roleid;
        this.role_type = record.data.role_type;
        this._moduleListGrid.getStore().load({
        	params:{roleid:this.roleId, role_type:this.role_type},
        	callback: function(records, operation, success) {
                // 对象 operation 包含
                // 所有 load 操作的详细信息
                console.log(records);
            }
        });
    },
    /**
     * 权限管理
     */
    _cellcheckchange : function(column, rowIndex, checked, eOpts){
        var me = this;
        if(this.roleid || this.roleId === 0){
            Ext.MessageBox.alert("系统提示","请从角色列表中选择需要授权的角色。");
            return;
        }
        var ur = this._moduleListGrid.getStore().getUpdatedRecords();
        var leaf  = ur[0].data.leaf;
        var actionType = column.actionType;
        var flag = (checked==true)?1:0;
        var params = [];
        var nodesParams =[];
        var selectNodes = me.getSelectNodes(ur[0]);
        if(ur[0].get(actionType)){//选中？
            Ext.Array.push(selectNodes,this._getParentNodes(ur[0]));
        }else{
            var uncheckParentNodes = this._getUncheckParentNodes(ur[0],actionType);
            Ext.Array.push(selectNodes,uncheckParentNodes);
        }
        for(var i = 0;i < selectNodes.length;i++){   
            params.push(selectNodes[i].data.moduleid);
            selectNodes[i].set(actionType,flag);
                selectNodes[i].commit();
                nodesParams.push(selectNodes[i]);
            }           
        if(selectNodes.length>0){      
            var moduleids = params.join(",");
            moduleids = moduleids+',';
            var param={};
            param.moduleids = params.join(",")+',';
            param.roleid = this.roleId;
            param.actionType=actionType;
            param.value=flag;
            Ext.Ajax.request({
                submitEmptyText:true, 
                url : this._moduleListGrid.getStore().getProxy().api.ROLEMODUE_UPDATE,
                params:{params:Ext.encode(param)},
                success:function(response, opts){
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    if(jsonObj.status == '200'){
                            Ext.each(nodesParams,function(node){
                                node.commit();
                            }); 
                         }else{
                             Ext.Msg.alert('系统提示',jsonObj.info);
                         }
                     }
                 })
            }
    },
    /**
     * 获取双亲的节点
     */
    _getParentNodes:function(node){
        var parentNodes = [];
        while(node && node.get('pid')!=0 && node.get('pid')!=''){
            parentNodes.push(node.parentNode);
            node = node.parentNode;
        }
        return parentNodes;
    },
    /**
     * 获取子节点
     */
    _getUncheckParentNodes:function(node,actionType){
        var selectNodes = [];
        var parentNode = node.parentNode;
        //向上找兄弟节点
        var preNode = node.previousSibling;
        var isPreviousSiblingChecked = false;
        while(preNode){
            if(!preNode.get(actionType)){
                preNode = preNode.previousSibling;
            }else{
                isPreviousSiblingChecked = true;
                break;
            }
        }
        //向下找兄弟节点
        if(isPreviousSiblingChecked){
            return selectNodes;
        }
        var nextNode = node.nextSibling;
        var isNextNodeChecked = false;
        while(nextNode){
            if(!nextNode.get(actionType)){
                nextNode = nextNode.nextSibling;
            }else{
                isNextNodeChecked = true;
                break;
            }
        }
        if(!isNextNodeChecked){
            if(parentNode){
                if(parentNode.get('menuid') && parentNode.get('menuid') != 0){
                    selectNodes.push(parentNode);
                    Ext.Array.push(selectNodes,this._getUncheckParentNodes(parentNode,actionType));
                }
            }
        }
        return selectNodes;
    },
    /**
     * 获取子节点
     */
    getSelectNodes:function(node){
        var selectNodes = [];
        selectNodes.push(node);
        var childNodes = node.childNodes;
        for(var i = 0; i < childNodes.length;i++){
            Ext.Array.push(selectNodes,this.getSelectNodes(childNodes[i]));
        }
        return selectNodes;
    },
    /**
     * 隐藏学校
     */
    _hideSchoolView: function(cmp){
        var loginInfo = just.data.user.loginInfo;
        if(loginInfo.user_type != 1){
            return;
        }
        var relatename = cmp.down('[dataIndex=relatename]');
        if(relatename){
            cmp.setWidth(330);
            relatename.hide();
        }
        var relateid = cmp.down('combo[name=relateid]');
        if(relateid){
            relateid.setValue(loginInfo.relateid);
            relateid.originalValue = loginInfo.relateid;
            relateid.setVisible(false);
        }
    }
});