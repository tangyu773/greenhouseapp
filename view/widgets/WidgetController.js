/**
 * 模块管理控制器
 * Created by xiaozou on 15-10-22.
 */
Ext.define('Admin.view.widgets.WidgetController',{
	extend: 'Ext.app.ViewController',
    alias: 'controller.Widgets',
    requires: [
        'Ext.util.TaskRunner'
    ],





    w_render: function (c,d) {

			Ext.Ajax.request({
					url: just.getUrl('/sys/user/gh10_area_query_r.action'),

					success: function(response, options) {
							var jsonObj = Ext.JSON.decode(response.responseText);

							if (jsonObj.status == '200') {
								var areas = jsonObj.rows;
								areas.forEach(function(e) {
										var item = Ext.create("Admin.view.widgets.WidgetB");
										item.setTitle(e.areaname);

										item.add({
											columnWidth: 0.34,
										},{
												xtype: 'displayfield',
												columnWidth: 0.333,
												value: '<h2 style="color:#31ade5;"> 基地介绍 </h2>',
										},
										{
											columnWidth: 0.333,
										});

										item.add({
												xtype: 'displayfield',
												columnWidth:1,
												height:180,
												margin: '1 10 5 10',
												value: '爱的发的是发的是发的是军阀的少年妇女大水库放哪的思考几分拿的是开了房间卡的是否健康拉的是否健康拉德斯基开发的数据库发生放假啊',
										});


										item.add({
											columnWidth:0.05,
										},{
												xtype: 'button',
												columnWidth:0.4,
												text:'水培：'+e.s_num+' 个',
												style:{background:'#00BCD4',
												 'border-color': '#fff'},
												padding:5,
										},{
											columnWidth:0.1,
										},{
												xtype: 'button',
												columnWidth:0.4,
												style:{background:'#bbb',
												 'border-color': '#fff'
											},
												text:'基培：'+e.j_num+' 个',
												padding:5,
										},{
											columnWidth:0.05,
										});

										c.add(item);


			          });

							}
					}
			});





    },


});
