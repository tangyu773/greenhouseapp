Ext.define('Admin.view.ctl.at.AtAutoAdd', {
	extend: 'Ext.window.Window',
	alias: 'widget.ctl_at_AtAutoAdd',
	autoShow: true,//自动打开
    modal: true,//模态窗口
    width: 820,//窗体宽度
    height: 540,//窗体高度
    resizable: false,
    iconCls: 'addIcon',
    title: '添加风机自动配置',
    constrain: true,//是否限制窗口超出浏览器
    plain: true,	//是否设置窗口透明背景
    bodyPadding: '1 1 1 1',//表单边框 上内边距、右内边距、下内边距、左内边距
    autoScroll: true,	//是否添加滚动条
//    layout: 'column',
    controller: 'ctl_at_At',
	items:[{
		xtype: 'form',
		layout: 'column',
		defaultType: 'textfield',
		margin: '20 0 0 0',
		defaults: {
//			labelWidth: 100,
			labelAlign: 'right',
//			columnWidth: 0.5,
			padding: '0 10 0 10',
			allowBlank: true,
			minLength: 0,
			maxLength: 32
		},
		items: [{
			xtype : 'hiddenfield',
			name : 'trigid', // 隐藏字段
		}, {
			xtype : 'hiddenfield',
			name : 'subid', // 隐藏字段
		}, {
			xtype: 'multislider',
			columnWidth: 0.9,
//		    values: [0],
		    increment: 1,
//		    minValue: 100,
//		    maxValue: 100,
		    clickToChange: false,//决定在滑动条 (Slider) 的轴(axis)上的点击是否改变滑动条.

		    // 此参数项默认为 true, 设置为 false 则允许滑块越界(越过其他滑块，造成交叉)
		    constrainThumbs: true,
		    //自定义提示
//		    plugins: new Ext.slider.Tip({
//		        getText: function (thumb) {
//		            return Ext.String.format('当前：<b>{0}/20</b>', thumb.value);
//		        }
//		    })
		}, {
        	xtype: 'combo',
        	name: 'temp',
        	width: 120,
        	emptyText: '可添加温度值',
        	mode: 'local',
            editable: false,
            selectOnFocus: false,
            valueField: 'value',
            displayField: 'value',
            store: ''
		}, {
			xtype: 'button',
			width: 60,
			padding: '3 0 3 0',
//        	height: 
			text: '添加',
			action: 'addAuto',
			listeners: {
				click: 'onAddAuto'
			}
		}]
    }, {
    	xtype: 'grid',
    	margin: '10 0 0 0',
    	viewConfig : {
    		stripeRows: true
    	},
    	columnLines:true,
    	forceFit: true,
    	store: Ext.create('Admin.store.ctl.at.AtAutoStore'),
    	columns: [/* {
			text: 'TRIGID', dataIndex: 'trigid', align: "center", width: 100,
		}, {
			text: 'SUBID', dataIndex: 'subid',  align: "center", width: 100,
		},*/ {
			text : '温度范围开始', dataIndex : 't_min', align: "center", width: 110,
		}, {
			text : '温度范围结束', dataIndex : 't_max', align: "center", width: 110
		}, {
			text : '风机状态', dataIndex : 'cv', align: "center", width: 360,
			renderer: function(v, m, record) {
//				console.log(record);
				m.style = "white-space:normal;word-wrap:break-word;word-break:break-all;";
				var val = '';
				if(v){
					var arr=v.split('');  //将a字符串转换成数组
					for(var i = 1; i <= arr.length; i++){
						val = val + Ext.String.format(" <img src='{0}' width=16 height=16 style='cursor:pointer;' alt='风机{1}'  title='风机{2}' onclick=just.ctl.update(this,\"cv\",\{3\},\{4\},\{5\},\{6\}) >  ", just.getUrl("/resources/icons/cv_" + arr[i-1] + ".png"), i, i, record.data.trigid, record.data.subid, record.data.t_min, i ) + '&nbsp;';
					}
				}
				return val;
			}
			
		}, {
			text : '水帘状态', dataIndex : 'wcu', align: "center", width: 90,
			renderer: function(v, m, record) {
				var val = '';
				if(v){
					var arr = v.split('');  //将a字符串转换成数组
					for(var i = 1; i <= arr.length; i++){
						val = val + Ext.String.format(" <img src='{0}' width=16 height=16 style='cursor:pointer;' alt='水帘{1}'  title='水帘{2}' onclick=just.ctl.update(this,\"wcu\",\{3\},\{4\},\{5\},\{6\}) >  ", just.getUrl("/resources/icons/wcu_" + arr[i-1] + ".png"), i, i, record.data.trigid, record.data.subid, record.data.t_min, i ) + '&nbsp;';
					}
				}
            	return val;
			}
			
		}, {
			text : '启用标志', dataIndex : 'useflag', align: "center", width : 80,
			renderer: function(v) {
				 return just.util.valueTransText(v, just.data.CUR_STATUS,'color_status');
			}
		}, {
	        menuDisabled: true,
	        sortable: false,
	        xtype: 'actioncolumn',
	        width: 55,
			align : "center",
	        text: '操作',
	        items: [ {
	        	iconCls: 'fa fa-ban fa-lg opear-button',
	        	action: 'del',
	            tooltip: '禁用或启用',
	            handler: '_onDeleteAuto'
	        }]
		}],

    } ],
});
