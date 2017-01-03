Ext.define('Admin.store.agency.Agency', {
    extend: 'Ext.data.Store',
    alias: 'store.agency_agency',


    pageSize: 25,

    proxy: {
        api: {
        	SAVE: just.getUrl('/sys/user/save.action'),
            ADD: just.getUrl('/sys/user/as10_agency_add_c.action'),
            UPDATE: just.getUrl('/sys/user/as10_agency_update_u.action'),
            DELETE: just.getUrl('/sys/user/as10_agency_delete_d.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/user/as10_agency_query_r.action'),
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
