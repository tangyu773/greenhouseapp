Ext.define('Admin.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',
    data: {
        currentView: null
    },
    stores: {
        
        ModuleTreeGrid: {
            type: 'NavigationTree'
        }
    },
    data: {
        currentView: null
    },
});
