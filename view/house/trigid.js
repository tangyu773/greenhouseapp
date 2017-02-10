Ext.define('Admin.view.house.trigid', {
    extend: 'Ext.window.Window',
    alias: 'widget.house_trigid',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 480, //窗体宽度
    //height: 300, //窗体高度
    resizable: false,
    _ghid:undefined,
    _action:undefined,
    tools:[{
    type:'close',
    qtip: '关闭窗口',
    handler: function(event, toolEl, panel){
        panel.up('window').close();
      }
      }
    ],

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
            {
                        xtype: 'hiddenfield',
                        name: 'tridtype',
                        value:'0'
                    },
            {
                xtype: 'combo',
                name: 'trigid',
                fieldLabel: '控制ID',
                selectOnFocus: false,
                editable: false,
                allowBlank: false,
                emptyText: '请选择控制ID',
                columnWidth: 0.7,
                blankText: '不能为空',
                mode: 'local',
                store: Ext.create('Admin.store.house.dp_sensor'),
                valueField: 'value',
                displayField: 'text',
                listConfig: {
                    getInnerTpl: function() {
                        return '<div>{value}-{text}</div>';
                    }
                },

            }
            ,{
                        xtype : 'button',
                       // ui: 'soft-blue',
                        //width:100,
                        name:'addrule',
                        margin:'36 0 0 10',
                        text : '添加控制规则',
                        columnWidth : 0.28,
                        padding: '3',
                        action:undefined,
                        wtitle:undefined,
                        _table_name:undefined,
                        iconCls : 'fa fa-align-left fa-plus-square-o',
                        listeners: {
                        click: 'onaddtrigidClick'
                        }
                    }
        ],
        buttonAlign: 'center',
        buttons: [{
            text: '  确  定  ',
            disabled: true,
            formBind: true,
            listeners: {
                click: '_onAddtrigid'
            }

        }],
    }],




});
