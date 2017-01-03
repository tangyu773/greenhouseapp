/**
 * 设置数据模型
 */
Ext.define('Admin.view.house.houseViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.house_house',

    stores: {
        houseGrid: {
            type: 'house_house'
        }
    },
});
