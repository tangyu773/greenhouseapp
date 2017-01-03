/**
 * 设置数据模型
 */
Ext.define('Admin.view.area.areaViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.area_area',

    stores: {
        areaGrid: {
            type: 'area_area'
        }
    },
});
