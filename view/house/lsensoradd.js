Ext.define('Admin.view.house.lsensoradd', {
    extend: 'Ext.window.Window',
    alias: 'widget.house_lsensoradd',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 480, //窗体宽度
    //height: 300, //窗体高度
    resizable: false,
    _ghid: undefined,
    _field_name: undefined,
    _alignchan: 1,
    _storeid:undefined,
    _latask:undefined,
    title: '采集点配置设置',
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
        defaults: {
            labelWidth: 85,
            labelAlign: 'top',
            columnWidth: 1,
            padding: '10',
            allowBlank: true,
            minLength: 0,
            maxLength: 100
        },
        items: [
            /*{
                        xtype: 'hiddenfield',
                        name: 'ghid',
                        value:'0'
                    },*/
            {
                xtype: 'combo',
                name: 'lsenid',
                fieldLabel: '传感器（lsensor）',
                selectOnFocus: false,
                editable: false,
                allowBlank: true,
                emptyText: '请选择传感器',
                blankText: '不能为空',
                queryMode: 'local',
                store: Ext.create('Admin.store.house.dp_sensor'),
                valueField: 'lsenid',
                displayField: 'chan_dispname',
                listConfig: {
                    getInnerTpl: function() {
                        return '<div>{lsenid}-{chan_dispname}</div>';
                    }
                },

            }, {

                xtype: 'tagfield',
                fieldLabel: '反馈字段（feedback_field_name）',
                allowBlank: true,
                emptyText: '请选择反馈字段',
                name: 'feedback',
                //  value:'lux1,lux2,lux5'.split(','),
                store: Ext.create('Admin.store.house.dp_sensor'),
                valueField: 'feedback_field_name',
                displayField: 'feedback_field_name',
                filterPickList: true,
                queryMode: 'local',
                publishes: 'value'
            }
        ],
        buttonAlign: 'center',
        buttons: [{
            text: '  确  定  ',
            disabled: true,
            formBind: true,
            listeners: {
                click: '_onAddlsenor'
            }

        }],
    }],




});
