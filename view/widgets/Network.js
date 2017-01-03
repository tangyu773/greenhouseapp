Ext.define('Admin.view.dashboard.Network', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.ProgressBar'
    ],

    xtype: 'dashboardnetworkpanel',
    cls: 'dashboard-main-chart shadow-panel',
    height: 320,

    bodyPadding: 15,

    title: '近期订单数量统计',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tools: [
        /*{
            xtype: 'tool',
            toggleValue: false,
            cls: 'x-fa fa-refresh dashboard-tools',
            listeners: {
                click: 'onRefreshToggle'
            },
            width: 20,
            height: 20
        },
        {
            xtype: 'tool',                                    
            cls: 'x-fa fa-wrench dashboard-tools',
            width: 20,
            height: 20
        }*/
    ],

    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'cartesian',
                    reference: 'chart1',
                    //animation : !Ext.isIE9m && Ext.os.is.Desktop,
                   // insetPadding:0,
                    bind: {
                        store: '{dashboardfulllinechartstore}'
                    },
                    insetPadding: {
                        top: 40,
                        bottom: 40,
                        left: 20,
                        right: 40
                    },
                    axes: [
                        {
                            type: 'category',
                            fields: [
                                'date'
                            ],
                            label: {
                                rotate: {
                                    degrees: 300,
                                    
                                },
                                font: '11px 微软雅黑',
                                
                           
                                position: 'bottom'
                            },
                            renderer: function(v,m,d) {
                                    
                                    return m.substring(0,10) ;
                                },

                        },
                        {
                            type: 'numeric',
                            fields: [
                                'num','tnum'
                            ],
                             /*title: {
                                text: '近期订单数量统计'
                            },*/
                            /*grid: {
                                odd: {
                                    fill: '#e8e8e8'
                                }
                            },*/
                          
                            position: 'left'
                        }
                    ],

                    series: [
                        {
                            type: 'bar',
                            colors: [
                                'rgba(103, 144, 199, 0.6)'
                            ],
                            style: {
                                minGapWidth: 20
                            },
                            highlight: {
                                strokeStyle: 'black',
                                fillStyle: 'gold'
                            },
                            label: {
                                field: 'num',
                                display: 'insideEnd',
                                
                               renderer: function(value){
                                return value.toFixed(0);
                               }
                            },
                            useDarkerStrokeColor: false,
                             xField: 'date',
                             yField: 'num',
                            fill: true,
                            smooth: true
                        }        ],
                    interactions: [
                        {
                            type: 'panzoom'
                        }
                    ]
                }
            ]
        },

        
    ]
});
