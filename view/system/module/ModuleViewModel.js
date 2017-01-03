/**
 * 设置数据模型
 */
Ext.define('Admin.view.system.module.ModuleViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.system_module_Module',

    stores: {
        ModuleTreeGrid: {
            type: 'system_module_ModuleTree'
        }
        
    }
});
