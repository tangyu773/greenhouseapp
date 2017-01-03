Ext.define('Admin.store.house.dp_sensor', {
    extend: 'Ext.data.Store',
    alias: 'store.house_dp_sensor',
    pageSize: 500,
    filterOnLoad:true,
    //autoLoad:false,
    proxy: {
      api: {
          LIST:just.getUrl('/sys/user/gh10_canuse_sensor_list_l.action'),
          FEED_BACK:just.getUrl('/sys/user/gh10_feedback_sensor_list_l.action'),
          TRIGIDLIST:just.getUrl('/sys/user/gh10_house_trigid_l.action'),
          senmonit:just.getUrl('/sys/user/gh10_house_sensormonit_r.action'),
      },
        type: 'ajax',
        url: just.getUrl('/sys/user/gh10_dpsensor_query_r.action'),
        actionMethods: {
            create: "POST", read: "POST", update: "POST", destroy: "POST"
        },
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        writer: {
            type: 'json'
        }
    }
});
