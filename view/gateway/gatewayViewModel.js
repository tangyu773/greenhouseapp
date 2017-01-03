/**
 * 设置数据模型
 */
Ext.define('Admin.view.gateway.gatewayViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.gateway_gateway',

    stores: {
        gatewayGrid: {
            type: 'gateway_gateway'
        }
    },
});
