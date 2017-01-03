Ext.define('Admin.store.sp.spinfo.SpInfo', {
    extend: 'Ext.data.Store',
    alias: 'store.sp_spinfo_SpInfo',

    model: 'Admin.model.sp.spinfo.SpInfo',

    pageSize: 25,

    proxy: {
        api: {
        	SAVE: just.getUrl('/sp/spinfo/save.action'),
            LIST: just.getUrl('/sp/spinfo/as10_sp_spinfo_list_l.action'),
            arealist: just.getUrl('/sys/user/gh10_area_list_l.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sp/spinfo/as10_sp_spinfo_query_r.action'),
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
