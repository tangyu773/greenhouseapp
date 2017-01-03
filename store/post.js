
Ext.define('Admin.store.post', {
    extend: 'Ext.data.Store',
    alias: 'store.post_store',
    pageSize: 50,
    proxy: {
        api: {
            /*UPDATE: just.getUrl('/sys/user/codereq_a_c.action'),
            LISTREGION: just.getUrl('/sys/user/as10_sp_region_list_l.action'),
            ACTIONTYPE: just.getUrl('/sys/user/as10_basedata_param_name_list_l.action'),
            AGENCY: just.getUrl('/sys/user/as10_sp_web_agency_list_l.action'), */
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/as10_sp_web_post_q_r.action'),
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
