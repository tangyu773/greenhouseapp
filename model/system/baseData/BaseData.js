Ext.define('Admin.model.system.baseData.BaseData', {
    extend: 'Ext.data.Model',
    fields: [{
            name : "paramid"  
        },
        {
            name : "module" //模块名
        },
        {
        	name : "paramname" //参数/字段名
        },
        {
        	name : "paramval" //参数值
        },
        {
        	name : "paramdes" //参数描述
        },
        {
        	name : "useflag" //启用标志
        },
        {
        	name : "descrip" //参数中文名
        },
        {
        	name : "flagvalue" //产品标志位
        }
    ]
});