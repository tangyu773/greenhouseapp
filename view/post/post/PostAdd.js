/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.post.post.PostAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.postadd',
    requires: [

    ],
    name:'postadd',
    reference: 'postadd',
    id:'postadd',
    viewModel: {
        type: 'post_post'
    },
    controller: 'post_controller',
    _flag:true,
    cls: 'email-compose',
    listeners: {
       afterrender: '_initpostaddview'
    },
    layout: {
        type:'vbox',
        pack: 'center',
        align:'stretch'
    },
    bodyPadding: 10,
    scrollable: true,
    defaultType : 'textfield',//默认的Form表单组件
   // //bodyPadding: 10,
   // scrollable:true,
    width: 300,

    fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold',
            allowBlank: true,
        },
     items: [{
            name : 'postid',
            readOnly : true ,
            hidden: true,
            hideLabel:true
        },{
            xtype:'combobox',
            name : 'posttype',
            fieldLabel : '<span class="form_require_symbol">*</span>类型',
            emptyText : '请选择类型',
            blankText : '类型不能为空',
            value:1,
            selectOnFocus : false,
            editable:false,
            store:Ext.create('Ext.data.Store', {
                fields: ['value', 'text'],
                data : [
                   // {"value":0, "text":"文件夹"},
                    {"value":1, "text":"自定义"},
                    {"value":2, "text":"url（链接地址）"}
                ]}),
            queryMode: 'local',
            displayField: 'text',
            valueField: 'value',
            listeners: {
                 change: 'changtypecomb'
              },
        },{
            name : 'dirid',
            xtype : 'combo',
            mode : 'local',
            fieldLabel : '<span class="form_require_symbol">*</span>栏目',
            selectOnFocus : false,
            editable:false,
            emptyText : '请选择栏目',
            valueField : 'value',
            displayField : 'text',
            allowBlank: false,
            bind : {
                store : '{spost_dir}'
            }
        },{
               name : 'title',
               fieldLabel : '<span class="form_require_symbol">*</span>标题',
               emptyText : '请输入标题',
               blankText : '标题不能为空',
               maxLength : 64,
               allowBlank: false,
           }, {
               xtype: 'textareafield',
               name: 'content',
               height: 150,
               maxLength : 1024 ,
               columnWidth : 1,//列宽百分百
               fieldLabel: '内容',
               // allowBlank : false,
           },{
            name:'status',
            xtype:'combo',
            mode:'local',
            fieldLabel: '<span class="form_require_symbol">*</span>状态',
            editable:false,
            selectOnFocus:false,
            emptyText : '请选择状态',
            valueField:'value',
            displayField:'text',
            value:1,
            store:just.ST_CUR_STATUS1
        },{
               name : 'content_url',
               fieldLabel : '链接地址',
               emptyText : '请输入链接地址',
               blankText : '链接地址不能为空',
               maxLength : 256,
              // allowBlank: false,
               hidden:true
           },{
   		xtype: 'filefield',
   		fieldLabel : '图片',
   		name: 'img_url',
   		action : 'upload_image',
   		emptyText : '图片类型*.png,*.jpg',
   		maxLength : 256,
   		buttonText: '选择图片',
      //allowBlank: true,
      hidden:false,
   		listeners : {
   		//	change : just.util.uploadImgCheck
   		}
   	}, {
           margin: '0 0 0 75',
       		xtype : 'image',
       		name : 'image',
       		id : 'spinfoEdit_image_id',
       		title : '点击显示大图',
       		height : 80,
          //allowBlank: true,
          padding: '10 100 10 10',//行列间距
       		src : just.rootPath()+'/resources/images/spinfo_default_logo.jpg',
   	} ],

    buttons: [{
        text: '  保  存  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onpostadd'
        }

    }]
});
