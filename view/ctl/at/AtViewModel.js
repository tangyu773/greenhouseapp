/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.at.AtViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_at_At',

    stores: {
        AtGrid: {
            type: 'ctl_at_AtStore'
        },
        AtSubGrid: {
        	type: 'ctl_at_AtSubStore'
        }
    },
});
