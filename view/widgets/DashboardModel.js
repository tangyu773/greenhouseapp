Ext.define('Admin.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean'
    ],

    stores: {
        'dashboard.QGAreaStore': {
            autoLoad: false,
            //model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: just.getUrl('/sys/user/orderresult_q_r.action'),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'total'
                },
                writer: {
                    type: 'json'
                }
            }

        },
        'dashboard.QGBarStore': {
            autoLoad: false,
            
            proxy: {
                type: 'ajax',
                url: just.getUrl('/sys/user/ordernum_q_r.action'),
                 reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'total'
                },
                writer: {
                    type: 'json'
                }
            }
        },
        'dashboard.QGLineStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: 'app/data/qg/line.js',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        'dashboard.QGPieStore': {
            autoLoad: false,
        
            proxy: {
                type: 'ajax',
              
                url: just.getUrl('/sys/user/orderseat_type_q_r.action'),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'total'
                },
                writer: {
                    type: 'json'
                }
            }            

        },
        dashboardfulllinechartstore: {
            autoLoad: false,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: just.getUrl('/sys/user/ordernum_q_r.action'),
                 reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'total'
                },
                writer: {
                    type: 'json'
                }
            }
        },
        dashboardvisitorchartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: 'app/data/dashboard/visitor.js',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardcouncechartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: 'app/data/dashboard/counce.js',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        subscriptionstore: {
            autoLoad: true,
            model: 'Admin.model.Subscription',
            proxy: {
                type: 'ajax',
                url: 'app/data/subscriptions.js',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardtaskstore: {
            autoLoad: true,
            fields: [
                {
                    type: 'int',
                    name: 'id'
                },
                {
                    type: 'string',
                    name: 'task'
                },
                {
                    type: 'boolean',
                    name: 'done'
                }
            ],
            proxy: {
                type: 'ajax',
                url: 'app/data/dashboard/tasks.js',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }            
        }
    }
});
