/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.liquid.LiquidViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_liquid_Liquid',

    stores: {
        LiquidGrid: {
            type: 'ctl_liquid_LiquidStore'
        },
        LiquidSubGrid: {
        	type: 'ctl_liquid_LiquidSubStore'
        }
    },
});
