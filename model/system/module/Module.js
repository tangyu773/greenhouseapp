/**
 * 数据格式
 * Created by xiaozou on 15-10-20.
 */
Ext.define('Admin.model.system.module.Module', {
    extend: "Ext.data.Model",
    fields: [
        {
            name: "id"
        },
        {
            name: "param"
        },
        {
            name : 'pid'
        },
        {
            name : 'text'
        },
        {
            name : 'compoment'
        },
        {
            name : 'moduleurl'
        },
        {
            name : 'msort'
        },
        {
            name : 'status'
        },
        {
            name : 'c'
        },
        {
            name : 'u'
        },
        {
            name : 'd'
        },
        {
            name : 'r'
        },
        {
            name : 'a'
        }
    ]
});