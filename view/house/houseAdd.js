Ext.define('Admin.view.house.houseAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.house_houseAdd',
    //id: 'house_houseAdd_Panel',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 580, //窗体宽度
    //height: 300, //窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加大棚',
    constrain: true, //是否限制窗口超出浏览器
    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条

    controller: 'house_house',
    viewModel: {
        type: 'house_house'
    },
    items: [{
        xtype: 'form',
        layout: 'column',
        defaultType: 'textfield',
        margin: '5 0 0 0',
        defaults: {
            labelWidth: 85,
            labelAlign: 'right',
            columnWidth: 0.49,
            padding: '15 15 10 10',
            allowBlank: true,
            minLength: 0,
            maxLength: 16
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'ghid',
            value:'0'
        }, {
            xtype: 'combo',
            name: 'compid',
            fieldLabel: '<span class="form_require_symbol">*</span>所属企业',
            selectOnFocus: false,
            editable: true,
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
            xtype: 'combo',
            name: 'area',
            cflag:1,
            fieldLabel: '<span class="form_require_symbol">*</span>区域',
            selectOnFocus: false,
            editable: false,
            readOnly:true,
            allowBlank: false,
            emptyText: '请输入区域',
            blankText: '区域不能为空',
            mode: 'local',
            store: Ext.create('Admin.store.sp.spinfo.SpInfo'),
            valueField: 'areaid',
            displayField: 'areaname'
        }, {
            name: 'ghname',
            fieldLabel: '<span class="form_require_symbol">*</span>大棚名称',
            emptyText: '请输入网关名称',
            blankText: '网关名称不能为空',
            allowBlank: false,
            maxLength: 32
        }, {
            name: 'ghstyle',
            fieldLabel: '<span class="form_require_symbol">*</span>大棚类型',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 1,
            store: just.ghstyle
        }, {
            name: 'plantsid',
            fieldLabel: '<span class="form_require_symbol">*</span>植物类型',
            emptyText: '请输入植物类型',
            blankText: '植物类型不能为空',
            allowBlank: false,
            maxLength: 32,
            xtype: 'combo',
            selectOnFocus: false,
            editable: true,
            mode: 'local',
            store: Ext.create('Admin.store.plant.plant'),
            valueField: 'value',
            displayField: 'text',
            listeners : {
                render:'plantrender'
            }
        }, {
            name: 'xsize',
            fieldLabel: '<span class="form_require_symbol">*</span>x格数',
            allowBlank: false,
            xtype: 'numberfield',
            minValue: 0,
            value: 1,
            step: 1,
        }, {
            name: 'ysize',
            fieldLabel: '<span class="form_require_symbol">*</span>y格数',
            allowBlank: false,
            xtype: 'numberfield',
            minValue: 0,
            value: 1,
            step: 1,
        }, {
            name: 'useflag',
            fieldLabel: '<span class="form_require_symbol">*</span>启用标志',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 1,
            store: just.ST_CUR_STATUS1
        }],
        buttonAlign: 'center',
        buttons : [ {
          text : '  确  定  ',
          disabled : true,
          formBind : true,
          listeners : {
            click : '_onAddhouse'
          }

        } ],
    }],




});
