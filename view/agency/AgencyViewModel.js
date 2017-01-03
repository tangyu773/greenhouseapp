/**
 * 设置数据模型
 */
Ext.define('Admin.view.agency.AgencyViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.agency_Agency',

    stores: {
        AgencyGrid: {
            type: 'agency_Agency'
        }
    },
});
