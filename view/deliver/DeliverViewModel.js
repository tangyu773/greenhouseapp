/**
 * 设置数据模型
 */


Ext.define('Admin.view.deliver.DeliverViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.deliver_deliver',

    stores: {
        deliverGrid: {
            type: 'deliver_Grid'
        },
        region: {
            type: 'deliver_Grid'
        },
        actiontype: {
            type: 'deliver_Grid'
        },
        eventtype: {
            type: 'deliver_Grid'
        },
        agency: {
            type: 'deliver_Grid'
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