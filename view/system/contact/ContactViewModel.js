/**
 * 设置数据模型
 */
Ext.define('Admin.view.system.contact.ContactViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.system_contact',

    stores: {
        UserGrid: {
            type: 'system_contact'
        },
        RoleGrid: {
        	type: 'system_contact'
        }
    },
});
