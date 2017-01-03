Ext.define('Admin.store.system.baseData.BaseData', {
    extend: 'Ext.data.Store',
    alias: 'store.system_baseData_BaseData',

    model: 'Admin.model.system.baseData.BaseData',

    pageSize: 25,
    
    proxy: {
        api: {
            ADD: just.getUrl('/sys/baseData/gh10_system_basedata_add_c.action'),
            UPDATE: just.getUrl('/sys/baseData/gh10_system_basedata_update_u.action'),
            DELETE: just.getUrl('/sys/baseData/gh10_system_basedata_delete_d.action'),
//            LIST: just.getUrl('/sys/user/as10_system_basedata_list_l.action'),
            MODULE_LIST: just.getUrl('/sys/baseData/gh10_system_basedata_module_list_l.action'),
            PARAM_NAME_LIST: just.getUrl('/sys/baseData/gh10_basedata_param_name_list_l.action'),
        },
        type: 'ajax',
        url: just.getUrl('/sys/baseData/gh10_system_basedata_query_r.action'),
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