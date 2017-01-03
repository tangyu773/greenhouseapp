/**
 * 系统用户添加界面
 * Created by xiaozou on 16-01-04.
 */
Ext.define('Admin.view.post.pdir.PdirAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pdiradd',
    requires: [

    ],
    reference: 'pdiradd',
    id:'pdiradd',
  /*  viewModel: {
        type: 'outgo_outgo'
    },*/
    controller: 'pdir_controller',
    _flag:true,
    cls: 'email-compose',
    defaultType : 'textfield',//默认的Form表单组件
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

            labelStyle: 'font-weight:bold'
        },


     items: [{
            name : 'dirname',
            fieldLabel : '<span class="form_require_symbol">*</span>栏目名称',
            emptyText : '请输入栏目名称',
            blankText : '栏目名称不能为空',
            maxLength : 256,
            allowBlank: false,
            //hidden:true
        }, {
            xtype: 'textareafield',
            name: 'note',
            height: 180,
            maxLength : 128 ,
            columnWidth : 1,//列宽百分百
            fieldLabel: '<span class="form_require_symbol">*</span>内容',
             allowBlank : false,
        },{
         		xtype: 'filefield',
         		fieldLabel : '栏目logo',
         		name: 'dir_logo',
         		action : 'upload_image',
         		emptyText : '图片类型*.png,*.jpg',
         		maxLength : 256,
         		buttonText: '选择图片',
            allowBlank: true,
         		listeners : {
         		   //change : just.util.uploadImgCheck
         		}
   	}, {
          margin : '0 0 0 75',
       		xtype : 'image',
       		name : 'image',
       		id : 'spinfoEdit_image_id',
       		title : '点击显示大图',
       		height : 100,
          allowBlank : true,
          padding : '10 100 10 10',//行列间距
       		src : just.rootPath()+'/resources/images/spinfo_default_logo.jpg',
   	} ],

    buttons: [{
        text: '  保  存  ',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'ondiradd'
        }

    }]
});
