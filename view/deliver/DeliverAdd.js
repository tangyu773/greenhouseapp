/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.deliver.DeliverAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deliveradd',
    requires: [

    ],
    name:'deliveradd',
    reference: 'deliveradd',
    id:'deliveradd',
    viewModel: {
        type: 'deliver_deliver'
    },
    controller: 'deliver_controller',
    _flag:true,
    cls: 'email-compose',

    layout: {
        type:'vbox',
        pack: 'center',
        align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,



   // //bodyPadding: 10,
   // scrollable:true,
    width: 300,

    fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            allowBlank:false,
            
            labelStyle: 'font-weight:bold'
        },


     items: [{
    	 xtype:'textfield',
         name : 'corporderid',
         fieldLabel : '<span class="form_require_symbol">*</span>出货单号',
         blankText : '订单号不能为空',
         editable:false,
         maxLength : 50
      },{
    	    name : 'sale_region_code',
    	    xtype: 'combo',
    	    autoSelect: true,
    	    fieldLabel: '收货地址',
    	    allowBlank:false,
    	    //value: '',               
    	    //typeAhead: false,// 自动提示并补充列出相似的选项  
    	    //triggerAction: 'all',// 点击时列出所有选项query将至列出类似选项  
    	   forceSelection:false,    //是否只能选择下拉框的值，即不会取输入的未在下拉框值域内的值
    	   // enableKeyEvents:true,
    	   // hideTrigger:true,
    	    queryMode: 'local',
    	    
    	    bind : {
    	        store : '{region}'
    	    },
    	    reference: 'isAdmin', 
    	    valueField: 'region_id',
    	    displayField: 'areainfo',
    	   listeners : {  
    	        beforequery : just.util.futySearch  ,
    	        focus:'combfocus',
    	        blur:'combonblur',                
    	    }
    	    
    	},{
            name : 'tocorpid',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '经销商',
            selectOnFocus : false,
            editable:false,
            emptyText : '请选择经销商',
            valueField : 'tocorpid',
            displayField : 'agencyname',
            bind : {
                store : '{agency}'
            }
        },{
            name : 'actiontype',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '动作类型',
            selectOnFocus : false,
            editable:false,
            emptyText : '请选择动作类型',
            valueField : 'paramval',
            displayField : 'paramdes',
            bind : {
                store : '{actiontype}'
            }
        },{
            name : 'eventtype',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '事件类型',
            selectOnFocus : false,
            editable:false,
            emptyText : '请选择事件类型',
            valueField : 'paramval',
            displayField : 'paramdes',
            bind : {
                store : '{eventtype}'
            }
        }],

    buttons: [{
        text: '  保存  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onusersaveClick'
        }

    }]
});


