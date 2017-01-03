/**
 * 设置数据模型
 */
Ext.define('Admin.view.ascode.AscodeViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ascode_ascode',

    stores: {
        ascodeGrid: {
            type: 'ascode_Grid'
        },
        productlist: {
            type: 'product_Product'
        },
        productlist1: {
            type: 'product_Product'
        },
        badcodelist: {
            type: 'ascode_Grid'
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
