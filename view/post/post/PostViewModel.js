/**
 * 设置数据模型
 */
Ext.define('Admin.view.post.post.PostViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.post_post',

    stores: {
        post: {
            type: 'post_store'
        },
        spost_dir: {
            type: 'pdir_store'
        }


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
