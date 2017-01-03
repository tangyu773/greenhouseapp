/**
 * 设置数据模型
 */
Ext.define('Admin.view.batch.BatchViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.batch_batch',

    stores: {
        batch: {
            type: 'batch_store'
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