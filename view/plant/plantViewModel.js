/**
 * 设置数据模型
 */
Ext.define('Admin.view.plant.plantViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.plant_plant',

    stores: {
        plantGrid: {
            type: 'plant_plant'
        }
    },
});
