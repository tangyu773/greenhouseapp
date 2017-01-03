/**
 * 设置数据模型
 */
Ext.define('Admin.view.sensor.sensorViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sensor_sensor',

    stores: {
        sensorGrid: {
            type: 'sensor_sensor'
        },
        
    },
});
