
Ext.define('Admin.view.sp.dept.ButtonView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.sp_dept_ButtonView',
    width: 300,
    forceFit: true,
    id : 'sp_dept_ButtonView_Panel',
//    frame: true,
    border:0,
    layout: {
        type: 'vbox',       // 子元素垂直布局
        pack:'center',
        align:'center'
    },
    style : 'border-left:none;border-right:none;border-top:none;border-bottom:none;',
    items: [{
    	text:'<span class="color_status_1"><=</span>',
        xtype: 'button',
        action:'add'
    }, {
    	text:'<span class="color_status_0">=></span>',
        xtype: 'button',
        action:'delete',
        margin:'10 0 0 0'
    }],
    
    initComponent : function(){
        this.callParent(arguments);
    }
});