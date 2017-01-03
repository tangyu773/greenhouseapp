/**
 * 设置数据模型
 */
Ext.define('Admin.view.outgo.OutgoViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.outgo_outgo',

    stores: {
        outgo: {
            type: 'outgo_store'
        },
        
    },
});
/**
 * 设置数据模型
 */
/*Ext.define('Admin.view.substaff.SubstaffViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.substaff_substaff',

    stores: {
        UserGrid: {
            type: 'system_contact'
        },
        
    },
});
*/