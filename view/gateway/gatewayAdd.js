Ext.define('Admin.view.gateway.gatewayAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.gateway_gatewayAdd',
    id: 'gateway_gatewayAdd_Panel',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 680, //窗体宽度
    //height: 500, //窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加网关',
    constrain: true, //是否限制窗口超出浏览器
    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条

    controller: 'gateway_gateway',
    viewModel: {
        type: 'gateway_gateway'
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
            name: 'gwid',
            value:'0'
        },{
            xtype: 'hiddenfield',
            name: 'field_name',
            value:'0'
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
            displayField: 'compname'
        }, {
            xtype: 'combo',
            name: 'ghid',
            fieldLabel: '<span class="form_require_symbol">*</span>所属大棚',
            selectOnFocus: false,
            editable: false,
            allowBlank: false,
            emptyText: '请输入名称',
            blankText: '不能为空',
            mode: 'local',
            store: Ext.create('Admin.store.house.house'),
            valueField: 'value',
            displayField: 'text',
            listeners : {
                render:'dp_comb_render'
            }
        }, {
            name: 'dispname',
            fieldLabel: '<span class="form_require_symbol">*</span>网关名称',
            emptyText: '请输入网关名称',
            blankText: '网关名称不能为空',
            allowBlank: false,
            maxLength: 32
        }, {
            name: 'netstyle',
            fieldLabel: '<span class="form_require_symbol">*</span>网络类型',
            emptyText: '请输入网络类型',
            blankText: '网络类型不能为空',
            allowBlank: false,
            xtype: 'combo',
            selectOnFocus: false,
            editable: true,
            mode: 'local',
            store: Ext.create('Admin.store.system.baseData.BaseData'),
            valueField: 'paramval',
            displayField: 'paramdes',
            listeners : {
                render:'netstylerender'
            }
        }, {
            name: 'ipaddr',
            fieldLabel: '<span class="form_require_symbol">*</span>服务器地址',
            emptyText: '请输入服务器地址',
            blankText: '服务器地址不能为空',
            regex:/\b(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])\b/,
            regexText:'请输入正确ip地址',
            allowBlank: false,
            maxLength: 32
        }, {
            xtype: 'numberfield',
            name: 'port',
            minValue: 1,
            value: 1,
            step: 10,
            fieldLabel: '<span class="form_require_symbol">*</span>端口',
            allowBlank: false,
        }, {
            name: 'frametimeout',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 20,
            fieldLabel: '<span class="form_require_symbol">*</span>数据帧超时(毫秒)',
            store:Ext.create('Ext.data.Store', {
                fields: ['value', 'text'],
                data: [
                  {
                      'value': '20', text: '20ms'
                  },
                  {
                      'value': '40', text: '40ms'
                  },
                  {
                      'value': '120', text: '120ms'
                  },
                  {
                      'value': '500', text: '500ms'
                  },
                  {
                      'value': '2000', text: '2000ms'
                  }
                ]
            }),
            allowBlank: false,
        }, {
            name: 'rsptimeout',
            fieldLabel: '<span class="form_require_symbol">*</span>响应超时',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 500,
            store:Ext.create('Ext.data.Store', {
                fields: ['value', 'text'],
                data: [
                  {
                      'value': '500', text: '500ms'
                  },
                  {
                      'value': '1000', text: '1000ms'
                  },
                  {
                      'value': '2000', text: '2000ms'
                  }
                ]
            }),
            allowBlank: false,
        }, {
            xtype: 'numberfield',
            name: 'coninterval',
            minValue: 1,
            value: 1,
            step: 10,
            fieldLabel: '<span class="form_require_symbol">*</span>重连时间(秒)',
            allowBlank: false,
        }, {
            name: 'potocol',
            fieldLabel: '<span class="form_require_symbol">*</span>协议',
            allowBlank: false,
            xtype: 'combo',
            selectOnFocus: false,
            editable: true,
            mode: 'local',
            store: Ext.create('Admin.store.system.baseData.BaseData'),
            valueField: 'paramval',
            displayField: 'paramdes',
            listeners : {
                render:'potocolrender'
            }
        }, {
            name: 'devtype',
            fieldLabel: '<span class="form_require_symbol">*</span>网关设备型号',
            allowBlank: false,
            maxLength: 32
        }, {
            xtype: 'numberfield',
            name: 'loopinterval',
            minValue: 1,
            value: 1,
            step: 10,
            fieldLabel: '<span class="form_require_symbol">*</span>采集频率(秒)',
            allowBlank: false,
        }, {
            xtype: 'datefield',
            fieldLabel: '安装时间',
            name: 'start_date',
            emptyText: '请输入安装时间',
            width: 170,
            value: new Date(),
            format: 'Y-m-d'
        }, {
            name: 'pay_flag',
            fieldLabel: '<span class="form_require_symbol">*</span>流量是否付费',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 0,
            store: just.ST_CUR_STATUS3
        }, {
            name: 'mainten_flag',
            fieldLabel: '<span class="form_require_symbol">*</span>维护标志',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 0,
            store: just.ST_CUR_STATUS3
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
            click : '_onAddgateway'
          }

        } ],
    }],


    // buttonAlign: 'center',
    // buttons: [{
    //     text: '保存',
    //     action: 'save'
    // }]

});
