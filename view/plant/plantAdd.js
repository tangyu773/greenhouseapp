Ext.define('Admin.view.plant.plantAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.plant_plantAdd',
    id: 'plant_plantAdd_Panel',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 680, //窗体宽度
    //height: 500, //窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加植物',
    constrain: true, //是否限制窗口超出浏览器
    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条

    controller: 'plant_plant',
    viewModel: {
        type: 'plant_plant'
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
            maxLength: 16
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'plantsid',
            value:'0'
        }, {
            name: 'plantsname',
            fieldLabel: '<span class="form_require_symbol">*</span>农作物名称名称',
            emptyText: '请输入名称',
            blankText: '名称不能为空',
            allowBlank: false,
            maxLength: 128
        }, {
            name: 'ghstyle',
            fieldLabel: '<span class="form_require_symbol">*</span>类型',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 1,
            store: just.ghstyle
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
        }, {
            xtype: 'numberfield',
            name: 'cycle',
            minValue: 1,
            value: 1,
            step: 10,
            fieldLabel: '<span class="form_require_symbol">*</span>生长周期(天)',
            allowBlank: false,
        }],
        buttonAlign: 'center',
        buttons : [ {
          text : '  确  定  ',
          disabled : true,
          formBind : true,
          listeners : {
            click : '_onAddplant'
          }

        } ],
    }],


    // buttonAlign: 'center',
    // buttons: [{
    //     text: '保存',
    //     action: 'save'
    // }]

});
