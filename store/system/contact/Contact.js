/**
 * 代理Proxy 来加载数据
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.store.system.contact.Contact', {
    extend: 'Ext.data.Store',
    alias: 'store.ascode_Grid',
    pageSize: 1000,
    proxy: {
        api: {
            REQ: just.getUrl('/sys/user/codereq_a_c.action'),
            BADCODE: just.getUrl('/sys/user/as10_web_repeatcode_r.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/codereq_r_r.action'),
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
