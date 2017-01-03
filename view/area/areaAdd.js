Ext.define('Admin.view.area.areaAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.area_areaAdd',
    id: 'area_areaAdd_Panel',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 680, //窗体宽度
    //height: 500, //窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '区域管理',
    constrain: true, //是否限制窗口超出浏览器
    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条
    listeners: {
        beforerender: '_initareaaddView'
    },
    controller: 'area_area',
    viewModel: {
        type: 'area_area'
    },
    items: [{
        xtype: 'form',
        layout: 'column',
        defaultType: 'textfield',
        margin: '5 0 0 0',
        defaults: {
            labelWidth: 125,
            labelAlign: 'right',
            columnWidth: 0.49,
            padding: '15 15 10 10',
            allowBlank: true,
            minLength: 0,
            maxLength: 128
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'areaid',
            value: '0'
        }, {
            name: 'areaname',
            fieldLabel: '<span class="form_require_symbol">*</span>区域名称',
            emptyText: '请输入名称',
            blankText: '名称不能为空',
            allowBlank: false,
            maxLength: 128
        }, {
            xtype: 'combo',
            name: 'compid',
            fieldLabel: '<span class="form_require_symbol">*</span>所属企业',
            selectOnFocus: false,
            editable: false,
            allowBlank: false,
            emptyText: '请输入企业名称',
            blankText: '企业名称不能为空',
            mode: 'local',
            store: Ext.create('Admin.store.sp.spinfo.SpInfo'),
            valueField: 'compid',
            displayField: 'compname',
            listeners : {
                change:'comp_change'
            }
        }, {
            name: 'areacontactmobile',
            fieldLabel: '<span class="form_require_symbol">*</span>联系人手机',
            emptyText: '请输入联系人手机',
            blankText: '联系人手机不能为空',
            allowBlank: false,
            maxLength: 32
        }, {
            xtype: 'numberfield',
            name: 'gh_num',
            minValue: 0,
            value: 0,
            step: 1,
            fieldLabel: '<span class="form_require_symbol">*</span>大棚许可数量',
            allowBlank: false,
        }, {
            xtype: 'numberfield',
            name: 'gw_num',
            minValue: 0,
            value: 0,
            step: 1,
            fieldLabel: '<span class="form_require_symbol">*</span>网关许可数量',
            allowBlank: false,
        }, {
            xtype: 'numberfield',
            name: 'sensor_num',
            minValue: 0,
            value: 0,
            step: 1,
            fieldLabel: '<span class="form_require_symbol">*</span>传感器许可数量',
            allowBlank: false,
        }, {

            xtype: 'tagfield',
            fieldLabel: '区域人员',
            allowBlank: true,
            emptyText: '请选择区域人员',
            name: 'staffids',
            cflag:1,
            selectOnFocus: false,
            editable: false,
            readOnly:true,
            store: Ext.create('Admin.store.area.area'),
            valueField: 'value',
            displayField: 'text',
            filterPickList: true,
            columnWidth: 1,
            queryMode: 'local',
            publishes: 'value'
        }],
        buttonAlign: 'center',
        buttons: [{
            text: '  确  定  ',
            disabled: true,
            formBind: true,
            listeners: {
                click: '_onAddarea'
            }

        }],
    }],

});
