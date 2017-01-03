Ext.define('Admin.view.dashboard.Services', {
    extend: 'Ext.Panel',
    xtype: 'dashboardservicespanel',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    cls: 'service-type shadow-panel',
    height: 500,
    bodyPadding: 15,
   // title: '订单结果统计',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
     
    items: [
        {
        xtype: 'polar',
        reference: 'chart2',
        bind: {
                    store: '{dashboard.QGPieStore}'
                },
        
        
        width: '45%',
        height: 400,
        insetPadding: 50,
        innerPadding: 20,
        
        legend: {
            docked: 'left'
        },
        interactions: ['rotate'],
        sprites: [{
            type: 'text',
            text:'订票席别统计(张)',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        series: [{
            type: 'pie',
            angleField: 'num',
            label: {
                field: 'type',
                calloutLine: {
                    length: 60,
                    width: 3
                    // specifying 'color' is also possible here
                }
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    },
    {
        xtype: 'polar',
        reference: 'chart3',
        bind: {
                    store: '{dashboard.QGAreaStore}'
                },
        
        
        width: '55%',
        height: 400,
        insetPadding: 50,
        innerPadding: 20,
        
        legend: {
            docked: 'left'
        },
        interactions: ['rotate'],
        sprites: [{
            type: 'text',
            text:'订单结果统计（单）',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        series: [{
            type: 'pie',
            angleField: 'num',
            label: {
                field: 'type',
                calloutLine: {
                    length: 60,
                    width: 3
                    // specifying 'color' is also possible here
                }
            },
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }]
    }
    ]
});
