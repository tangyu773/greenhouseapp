/**
 * 设置数据模型
 */
Ext.define('Admin.view.ctl.sensor.SensorViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.ctl_sensor_Sensor',

    stores: {
        SensorGrid: {
            type: 'ctl_sensor_SensorStore'
        },
        SensorSubGrid: {
        	type: 'ctl_sensor_SensorSubStore'
        }
    },
});
