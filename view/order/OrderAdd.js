/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.order.OrderAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.orderadd',
    name:'orderadd',
    requires: [

    ],
    controller : 'order_order',
    viewModel: {
        type: 'order_order'
    },
    cls: 'email-compose',
    baseCls:'x-plain',
    layout : 'column',//列布局
        autoScroll : true,  //是否添加滚动条
        defaultType : 'textfield',//默认的Form表单组件
        baseCls:'x-plain',
        defaults: {
            labelWidth : 85,
            labelAlign : 'right',
            columnWidth : 0.5,//列宽百分百
            padding: '10',//行列间距
            selectOnFocus : true,//选中所有内容
            allowBlank : false,
            minLength : 0,
            maxLength : 30,
            msgTarget: 'under'
        },


    width : 700,//窗体宽度

    items: [

    {
            name : 'from_station',
            xtype: 'combo',
            autoSelect: true,
            fieldLabel: '发站',
            allowBlank:false,
            //value: '',               
            //typeAhead: false,// 自动提示并补充列出相似的选项  
            //triggerAction: 'all',// 点击时列出所有选项query将至列出类似选项  
           forceSelection:false,    //是否只能选择下拉框的值，即不会取输入的未在下拉框值域内的值
           // enableKeyEvents:true,
           // hideTrigger:true,
            queryMode: 'local',
            
            bind : {
                store : '{station}'
            },
            reference: 'isAdmin',
            valueField: 'station_telecode',
            displayField: 'station_name',
            listConfig:{
                getInnerTpl:function(){
                   // getModelData( ) 
                   
                    return '<div>{station_name} ({station_telecode})({from_period_1}-{to_period_1})</div>';
                }
            },
           listeners : {  
                beforequery : just.util.futySearch  ,
                focus:'combfocus',
                blur:'combonblur',    
                select:'onselect'              
            }
            
        },{
            name : 'to_station',
            xtype: 'combo',
            autoSelect: true,
            fieldLabel: '到站',
            allowBlank:false,
            //value: '',               
            //typeAhead: false,// 自动提示并补充列出相似的选项  
            //triggerAction: 'all',// 点击时列出所有选项query将至列出类似选项  
           // forceSelection:true,    //是否只能选择下拉框的值，即不会取输入的未在下拉框值域内的值
           // enableKeyEvents:true,
            //hideTrigger:true,
            queryMode: 'local',
             store : Ext.create('Admin.store.Order'),
          
        
            valueField: 'station_telecode',
            displayField: 'station_name',
            listConfig:{
                getInnerTpl:function(){
                    return '<div>{station_name} ({station_telecode})</div>';
                }
            },
            listeners : {  
                beforequery : just.util.futySearch  ,
                focus:'combfocus',
                blur:'combonblur',     

            }
           
        },{
            xtype: 'datefield',
            fieldLabel: '出发日期',
            name: 'train_date1',
            emptyText : '请输入开始日期',
           // readOnly:true,
            bind: {
                readOnly: '{!isAdmin.selection}'
            },
           // minValue  : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.day, 3), 'Y-m-d') ,
            format:'Y-m-d'
        },{
            name : 'station_train_code',
            fieldLabel : '车次',
            emptyText : '请输入车次',
            regex:/^[GTKDLCZgtkdlcz]{0,1}[0-9]{1,5}$/, 
            regexText:'请输入正确车次', 
            reference: 'station_train_code1',
            allowBlank:false,
             listeners : {  
                blur:'traincodeblur'    
            }
        }/*,{
            name:'id_type',
            xtype:'combo',
            mode:'local',
            fieldLabel: '证件类型',
            editable:false,
            selectOnFocus:false,
            emptyText : '请选择证件类型',
            valueField:'value',
            displayField:'text',
            value:0,
            store:just.ST_ID_TYPE
        }*/,{
            name:'seat_type_code',
            xtype:'combo',
            mode:'local',
            fieldLabel: '席别',
            editable:false,
            /*bind: {
                readOnly: '{isAdmin1.checked }'
            },*/
            readOnly:true,
            selectOnFocus:false,
            emptyText : '请选择席别',
            valueField:'value',
            displayField:'text',

            value:null,
            store:just.ST_SEAT_TYPE
        },{
            xtype: 'numberfield',
            name : 'child_num',
            fieldLabel : '小孩票张数',
            minValue : 0,
            value : 0,
            listeners: {
            change: 'onidnoselect'
        }
        },{
              xtype: 'tagfield',
              name:'order_add_tagf',
              fieldLabel: '添加乘车人',
               bind : {
                store : '{contact}'
            },
              //store : Ext.create('Admin.store.Order'),
              reference: 'idcards',
              displayField: 'name',
              valueField: 'idcard',
              queryMode: 'local',
              columnWidth:1,
              createNewOnEnter: true,
              createNewOnBlur: true,
              filterPickList: true,
      
               publishes: 'value',
               listeners : {  
                change : 'onidnoselect'
            }
        }/*,{
            name : 'id_nos',
            xtype: 'displayfield',
            columnWidth:1,
            fieldLabel: '乘车人身份证',
            scrollable :true,
            bind: '{idcards.value}'
        }*/,{
            name : 'total_num',
            //xtype: 'displayfield',
            columnWidth:0.25,
            border:null,
            readOnly:true,
           // style:'border:0px;' ,
            fieldLabel: '总张数'           
        },{
            name : 'total_numdis',
            xtype: 'displayfield',
            columnWidth:0.7,
            fieldLabel: ''           
        },
       /* {
        xtype: 'checkbox',
        boxLabel: 'Is Admin',
        reference: 'isAdmin1'
    }*/
        
    ],


    buttons: [{
        text: '  确  定  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onordersaveClick'
        }

    }]
});
