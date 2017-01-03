/**
 * 设置数据模型
 */
Ext.define('Admin.view.post.pdir.PdirViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pdir_pdir',

    stores: {
        pdir: {
            type: 'pdir_store'
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
