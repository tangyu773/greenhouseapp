/**
 * 设置数据模型
 */
Ext.define('Admin.view.system.baseData.BaseDataViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.system_baseData_BaseData',

    stores: {
        BaseDataGrid: {
            type: 'system_baseData_BaseData'
        }
    },
});
