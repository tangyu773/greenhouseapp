/**
 * 代理Proxy 来加载数据
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.store.outgo', {
    extend: 'Ext.data.Store',
    alias: 'store.outgo_store',
    pageSize: 1000,
    proxy: {
        api: {
            /*UPDATE: just.getUrl('/sys/user/codereq_a_c.action'),
            LISTREGION: just.getUrl('/sys/user/as10_sp_region_list_l.action'),
            ACTIONTYPE: just.getUrl('/sys/user/as10_basedata_param_name_list_l.action'),       
            AGENCY: just.getUrl('/sys/user/as10_sp_web_agency_list_l.action'), */
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/as10_sp_web_outgo_r.action'),
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