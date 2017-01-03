Ext.define('Admin.view.sensor.sensorAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.sensor_sensorAdd',
    id: 'sensor_sensorAdd_Panel',
    autoShow: true, //自动打开
    modal: true, //模态窗口
    width: 580, //窗体宽度
    //height: 400, //窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加传感器',
    constrain: true, //是否限制窗口超出浏览器
    plain: true, //是否设置窗口透明背景
    bodyPadding: '1 1 1 1', //表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true, //是否添加滚动条
    listeners : {
 	   	//afterrender : 'sensoraddafter'
 	 },
    controller: 'sensor_sensor',
    viewModel: {
        type: 'sensor_sensor'
    },
    items: [{
        xtype: 'form',
        layout: 'column',
        defaultType: 'textfield',
        margin: '5 0 0 0',
        defaults: {
            labelWidth: 90,
            labelAlign: 'right',
            columnWidth: 0.49,
            padding: '15 15 10 10',
            allowBlank: true,
            minLength: 0,
            maxLength: 160
        },

        items: [{
            xtype: 'hiddenfield',
            name: 'senid',
            value: '0'
        }, {
            xtype: 'combo',
            name: 'devtypeid',
            fieldLabel: '<span class="form_require_symbol">*</span>设备型号',
            selectOnFocus: false,
            editable: false,
            columnWidth: 1,
            allowBlank: false,
            blankText: '不能为空',
            mode: 'local',
            store: Ext.create('Admin.store.sensor.sensortl'),
            valueField: 'value',
            displayField: 'text',
            listConfig: {
                getInnerTpl: function() {
                    return '<div>{value}-{text}</div>';
                }
            },
            listeners : {
                change:'dev_change'
            }
        }, {
            xtype: 'combo',
            name: 'compid',
            fieldLabel: '<span class="form_require_symbol">*</span>所属企业',
            selectOnFocus: false,
            editable: false,
            allowBlank: false,
            columnWidth: 1,
            emptyText: '请输入企业名称',
            blankText: '企业名称不能为空',
            mode: 'local',
            store: Ext.create('Admin.store.sp.spinfo.SpInfo'),
            valueField: 'compid',
            displayField: 'compname'
        }, {
            xtype: 'combo',
            name: 'gwid',
            fieldLabel: '<span class="form_require_symbol">*</span>网关',
            selectOnFocus: false,
            editable: false,
            columnWidth: 1,
            allowBlank: false,
            blankText: '不能为空',
            hidden:false,
            mode: 'local',
            store: Ext.create('Admin.store.gateway.gateway'),
            valueField: 'value',
            displayField: 'text',
            listConfig: {
                getInnerTpl: function() {
                    return '<div>{value} -- {text}</div>';
                }
            },
            listeners : {
                change:'gw_change'
            }

        }, {
  				name : 'sn',
  				fieldLabel : '<span class="form_require_symbol">*</span>设备名称',
  				emptyText : '请输入设备名称',
  				blankText : '设备名称不能为空',
          columnWidth: 1,
            allowBlank: false,
  				maxLength : 128
  			}, {
            xtype: 'combo',
            name: 'devaddr',
            editable: false,
            readOnly:true,
            fieldLabel: '<span class="form_require_symbol">*</span>设备地址',
            store :Ext.create('Admin.store.sensor.devaddr'),
            mode: 'local',
            allowBlank: false,
            cflag:1,
            displayField: 'text',
            hidden:false,
            valueField: 'text',
        }, {
          name : 'ipparam',
          fieldLabel : '<span class="form_require_symbol">*</span>扩展参数',
          emptyText : 'ip;port;user;password',
          blankText : '不能为空',
          allowBlank: false,
          regex:/(.*);(.*);(.*);(.*)/,
          columnWidth: 1,
          regexText:'请输入正确格式',
          hidden:true,
          maxLength : 64
        }, {
            xtype: 'numberfield',
            name: 'x',
            minValue: 1,
            value: 1,
            step: 1,
            fieldLabel: '<span class="form_require_symbol">*</span>x',
            allowBlank: false,
        }, {
            xtype: 'numberfield',
            name: 'y',
            minValue: 1,
            value: 1,
            step: 1,
            fieldLabel: '<span class="form_require_symbol">*</span>y',
            allowBlank: false,
        }, {
            xtype: 'numberfield',
            name: 'z',
            minValue: 1,
            value: 1,
            step: 1,
            fieldLabel: '<span class="form_require_symbol">*</span>z',
            allowBlank: false,
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
        }/*, {
            name: 'islogic',
            fieldLabel: '<span class="form_require_symbol">*</span>是否逻辑存在',
            xtype: 'combo',
            mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'text',
            value: 1,
            store: just.ST_CUR_STATUS3
        }*/],
        buttonAlign: 'center',
        buttons : [ {
      		text : '  确  定  ',
      		disabled : false,
      		//formBind : true,
      		listeners : {
      			click : '_onAddsensor'
      		}

      	} ],
    }],





});
