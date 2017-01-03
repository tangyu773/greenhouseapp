
Ext.define('Admin.store.pdir', {
    extend: 'Ext.data.Store',
    alias: 'store.pdir_store',
    pageSize: 1000,
    proxy: {
        api: {
          LIST: just.getUrl('/sys/user/as10_sp_web_postdirlist_l.action'),
            /*DIRADD: just.getUrl('/sys/user/dir_add.action'),
            LISTREGION: just.getUrl('/sys/user/as10_sp_region_list_l.action'),
            ACTIONTYPE: just.getUrl('/sys/user/as10_basedata_param_name_list_l.action'),
            AGENCY: just.getUrl('/sys/user/as10_sp_web_agency_list_l.action'), */
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/as10_sp_web_pdir_q_r.action'),
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
