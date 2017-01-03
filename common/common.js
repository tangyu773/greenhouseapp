/**
 * Created by xiaozou on 16-03-21.
 */
//声明
Ext.ns("just");
Ext.ns("just.util");
Ext.ns("just.data");
Ext.ns("just.ctl");
Ext.ns("just.data.user");
just.data.listStore = null;

//用户登录信息
just.data.user.loginInfo = {};
/**
 * 获取当前项目目录
 */
 just.getControllerInstance = function(id){
	return Ext.app.Application.instance.getController(id);
};
just.createController = function (ctrlName, parentPackage) {
    if (!(parentPackage == undefined || parentPackage == "")) {
    	//console.log(just.appConfigs.name + just.CONTROLLER + parentPackage + "." + ctrlName);
        return just.appConfigs.name + just.CONTROLLER + parentPackage + "." + ctrlName;
    }
    //console.log(just.appConfigs.name + just.CONTROLLER + ctrlName);
    return just.appConfigs.name + just.CONTROLLER + ctrlName;
}

just.rootPath = function () {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return(prePath + postPath);
};
/**
 * 获取地址
 */
just.getUrl = function (path) {
    return just.rootPath() + path;
};

/**
 * 产品状态
 */
just.data.PRODUCT_STATE = [
   {"value": 0, "text": '待处理'},
   {"value": 1, "text": '待审核'},
   {"value": 2, "text": '已审核'},
];
just.ST_PRODUCT_STATE = Ext.create('Ext.data.Store',{
	fields: ['value', 'text'],
	data: just.data.PRODUCT_STATE
});


/**
 * 用户类型
 */
just.data.SYSUSER_TYPE = [
    {"value": undefined, "text": '--请选择--'},
    {"value": 0, "text": '运营用户'},
    {"value": 1, "text": '学校用户'}
];

/**
 * 用户类型
 */
just.ST_SYSUSER_TYPE = Ext.create('Ext.data.Store',{
	fields: ['value', 'text'],
	data: just.data.SYSUSER_TYPE
});
 just.data.SEAT_TYPE_p = [
    {
        'value': '1', text: '硬座'
    },
    {
        'value': '3', text: '硬卧'
    },
    {
        'value': '4', text: '软卧'
    },
    {
        'value': '5', text: '高级软卧'
    }
];
 just.data.SEAT_TYPE_g = [
    {
        'value': 'M', text: '一等座'
    },
    {
        'value': 'O', text: '二等座'
    },
    {
        'value': 'P', text: '特等座'
    }
];


/**
 * 当前状态
 */
 just.data.SEAT_TYPE = [
    {
        'value': '1', text: '硬座'
    },
    {
        'value': '2', text: '软座'
    },
    {
        'value': '3', text: '硬卧'
    },
    {
        'value': '4', text: '软卧'
    },
    {
        'value': 'M', text: '一等座'
    },
    {
        'value': 'O', text: '二等座'
    },
    {
        'value': '6', text: '高等软卧'
    },
    {
        'value': 'P', text: '特等座'
    },
    {
        'value': 'Q', text: '观光座'
    },
    {
        'value': 'S', text: '一等包厢'
    },
    {
        'value': 'W', text: '无座'
    },
    {
        'value': '5', text: '高级软卧'
    },
    {
        'value': '7', text: '一等软座'
    },
    {
        'value': '8', text: '二等软座'
    },
    {
        'value': '9', text: '商务座'
    }
];
 just.data.ID_TYPE = [
    {
        'value': '1', text: '二代身份证'
    },
    {
        'value': '2', text: '港澳通行证'
    },
    {
        'value': '3', text: '台湾通行证'
    },
    {
        'value': '4', text: '护照'
    }
];
just.ST_ID_TYPE = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.ID_TYPE
});
just.ST_SEAT_TYPE = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.SEAT_TYPE
});

just.ST_SEAT_TYPE_p = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.SEAT_TYPE_p
});

just.ST_SEAT_TYPE_g = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.SEAT_TYPE_g
});

just.data.CUR_STATUS = [
    {"value": undefined, "text": '--请选择--'},
    {"value": 1, "text": '启用'},
    {"value": 0, "text": '禁用'}
];
just.data.ghstyle = [
    {"value": 1, "text": '水培'},
    {"value": 2, "text": '基培'}
];
just.data.CUR_STATUS1 = [
    {"value": 1, "text": '启用'},
    {"value": 0, "text": '禁用'}
];
just.data.CUR_STATUS2 = [
    {"value": 0, "text": '全部'},
    {"value": 1, "text": '订票成功'},
    {"value": 2, "text": '订票不成功'}
];
just.data.CUR_STATUS3 = [
    {"value": 1, "text": '是'},
    {"value": 0, "text": '否'}
];
/**
 * 当前状态
 */
just.ST_CUR_STATUS = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.CUR_STATUS
});
just.ghstyle = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.ghstyle
});
just.ST_CUR_STATUS1 = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.CUR_STATUS1
});
just.ST_CUR_STATUS2 = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.CUR_STATUS2
});
just.ST_CUR_STATUS3 = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.CUR_STATUS3
});
/**
 * 模块类型
 */
just.data.MENU_TYPE = [
    {"value": 0, "text": '系统模块'},
    {"value": 1, "text": '学校模块'}
];

/**
 * 模块类型
 */
just.ST_MENU_TYPE = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.MENU_TYPE
});
/**
 * 模块名
 * @type {{value: string, text: string}[]}
 */
just.data.MODULE = [
    {"value": "sys", "text": "SYS"},
    {"value": "schmgr", "text": "SCHMGR"},
    {"value": "report", "text": "REPORT"},
    {"value": "base", "text": "BASE"},
    {"value": "sp", "text": "SP"},
    {"value": "pt", "text": "PT"},
    {"value": "st", "text": "ST"},
    {"value": "zx", "text": "ZX"},
    {"value": "re", "text": "RE"},
    {"value": "postdir", "text": "POSTDIR"},
    {"value": "post", "text": "POST"}
];

/**
 * 模块名
 * @type {Ext.data.Store}
 */
just.ST_MODULE = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.MODULE
});


/**
 * 风机控制配置 控制方式
 */
just.data.CTL_AT_STYLE = [
    {"value": 1, "text": "温度控制"},
//    {"value": 2, "text": "手动降温"},
//    {"value": 3, "text": "分区降温"},
];
just.ST_CTL_AT_STYLE = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.CTL_AT_STYLE
});
/**
 * 风机控制配置 高低温度判断方式
 */
just.data.CTL_AT_TEMP_TYPE = [
    {"value": 1, "text": "多点最小值"},
    {"value": 2, "text": "多点平均值"},
    {"value": 3, "text": "多点最大值"},
];
just.ST_CTL_AT_TEMP_TYPE = Ext.create('Ext.data.Store', {
    fields: ['value', 'text'],
    data: just.data.CTL_AT_TEMP_TYPE
});


/**
 * 显示等待对话框
 * @param msg
 */
just.showWaitingDlg = function (msg) {
    msg = msg == null || msg == '' ? '正在保存数据，请稍候...' : msg;
    Ext.MessageBox.show({
        msg: msg,
        wait: true,
        waitConfig: {
            interval: 200
        }
    });
};

just.util.futySearch = function(e) {
    var combo = e.combo;
    combo.store.clearFilter();
    if(!e.forceAll){
        var value = Ext.util.Format.uppercase(e.query);

        combo.store.filterBy(function(record,id){
            var text = record.get('areainfo')+record.get('jianpin');
            return (text.indexOf(value)!=-1);
        });
        combo.expand();

        return false;
    }
};
just.util.idcard = function(idcard){
                var Errors=new Array(
                        "验证通过!",
                        "身份证号码位数不对!",
                        "身份证号码出生日期超出范围或含有非法字符!",
                        "身份证号码校验错误!",
                        "身份证地区非法!"
                        );
                        var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}

                        var idcard,Y,JYM;
                        var S,M;
                        var idcard_array = new Array();
                        idcard_array = idcard.split("");
                        //地区检验
                        if(area[parseInt(idcard.substr(0,2))]==null)
                            return false;//return Errors[4];
                        //身份号码位数及格式检验
                        switch(idcard.length)
                        {
                            case 15:
                                if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 ))
                                {
                                    //测试出生日期的合法性
                                    ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
                                }
                                else
                                {
                                    //测试出生日期的合法性
                                    ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                                }
                                if(ereg.test(idcard))
                                    return true;//return Errors[0];
                                else
                                    return false;//return Errors[2];
                            break;
                            case 18:
                                //18位身份号码检测
                                //出生日期的合法性检查
                                //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                                //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                                if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 ))
                                {
                                    //闰年出生日期的合法性正则表达式
                                    ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                                }
                                else
                                {
                                    //平年出生日期的合法性正则表达式
                                    ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                                }
                                if(ereg.test(idcard))
                                {
                                    //测试出生日期的合法性
                                    //计算校验位
                                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                                    + parseInt(idcard_array[7]) * 1
                                    + parseInt(idcard_array[8]) * 6
                                    + parseInt(idcard_array[9]) * 3 ;
                                    Y = S % 11;
                                    M = "F";
                                    JYM = "10X98765432";
                                    M = JYM.substr(Y,1);//判断校验位
                                    if(M == idcard_array[17])
                                        return true;//return Errors[0]; //检测ID的校验位
                                    else
                                        return false;//return Errors[3];
                                }
                                else
                                    return false;//return Errors[2];
                            break;
                            default:
                                return false;//return Errors[1];
                            break;
                        }
            };

/**
 * 格式化文本样式
 * @param {} v
 * @param {} dd
 * @param {} css
 * @return {}
 */
just.util.valueTransText = function(v,dd,css){
    for(var i = 0 ; i < dd.length; i++){
        var item = dd[i];
        if(v == item.value){
            if(css){
                var cssName = css + '_' + item.value;
                return '<span class="'+cssName+'">' + item.text + '<span>';
            }
            return item.text;
        }
    }
    return v;
};


just.createUtil = function (utilName, parentPackage) {
    if (!(parentPackage == undefined || parentPackage == "")) {
        return just.appConfigs.name + just.UTIL + parentPackage + "." + utilName;
    }
    return 'admin' + '.util.' + utilName;
};

/**
 * 隐藏等待对话框并提示信息
 *
 * @param    msg            消息内容(默认为:保存成功)
 * @param    isShowAlert    是否显示alert(默认为false)
 */
just.hideWaitingDlg = function (msg, isShowAlert) {
    Ext.MessageBox.hide();
    isShowAlert = isShowAlert == null || isShowAlert == '' ? false : isShowAlert;
    if (isShowAlert == true) {
        msg = msg == null || msg == '' ? '保存成功' : msg;
        Ext.MessageBox.alert('系统提示', msg);
    }
};

just.util.toQueryString = function(arrays){
	for(var p in arrays){
		arrays[p] = encodeURI(arrays[p]);
	}
};

/**
 * 克隆store
 * @param src 被复制对象
 * @param des 复制的表对象
 */
just.util.storeClone=function(src,des){
	var records = [];
	src.each(function(r) {
		records.push(r.copy());
	});
	des.add(records);
};

/**
 * 上传图片 公用方法
 */
/**
 * 上传图片验证
 **/
just.util.uploadImgCheck = function(fileObj,fileName){
	if(fileName==''||fileName==undefined){
		return;
	}
	//图片类型验证
	if(!(getImgTypeCheck(getImgHZ(fileName)))){
		Ext.MessageBox.alert('温馨提示', '上传图片类型有误,请选择*.png,*.jpg图片...');
		fileObj.reset();
		return;
	}

	saveUploadImg(fileObj);
};
/**
 * 获取图片后缀(小写)
 * */
getImgHZ = function(imgName){
	//后缀
	var hz = '';
	//图片名称中最后一个.的位置
	var index = imgName.lastIndexOf('.');
	if(index != -1){
		//后缀转成小写
		hz = imgName.substr(index+1).toLowerCase();
	}
	return hz;
};
/**
 * 图片类型验证
 * */
getImgTypeCheck = function(hz){
	var typestr = 'png,jpg';
	var types = typestr.split(','); //图片类型
	for(var i = 0; i < types.length; i++){
		if(hz == types[i]){
			return true;
		}
	}
	return false;
};
/**
 * 上传图片
 * */
saveUploadImg = function(fileObj, value, eOpts){
	var formObj = fileObj.up('form');
	var upload = formObj.down('filefield[name=upload]');
	var imageUrl = formObj.down('image[name=image]');
	//获取上传文件大小
	var filesize = just.util.getFileSize(upload.fileInputEl.dom);
    if(filesize>1024){
        Ext.Msg.alert("系统提示","图片大小不能大于1M");
    	return;
    }
	if (Ext.isIE) {
		var image = imageUrl.getEl().dom;
		image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src ="file://"+value;
	} else {
		var file = upload.fileInputEl.dom.files[0];
		imageUrl.getEl().dom.src = window.URL.createObjectURL(file);
	}
};

/**
 * 风机配置里图标的点击事件
 * me: img
 * status: 原状态(0 或 1)
 * filedname: 字段(cv, wcu), 哪个字段更改
 * trigid: 主键
 * subid： 主键
 * t_min 温度范围开始(作主键)
 * num: 点击第几个
 */

just.ctl.update = function(me, fieldname, trigid, subid, t_min, num){
	var status = me.src.substr((me.src.lastIndexOf('.')-1), 1);
	me.src = just.getUrl("/resources/icons/" + fieldname + "_" + (status == 0 ? 1 : 0) + ".png");
	var params = {};
	params.status = (status == 0 ? 1 : 0);
	params.fieldname = fieldname;
	params.trigid = trigid;
	params.subid = subid;
	params.t_min = t_min;
	params.num = num;
	Ext.Ajax.request({
		url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_update_u.action'),
		params: {params: Ext.encode(params)},
		success: function(response, options){
			var jsonObj = Ext.JSON.decode(response.responseText);
			if(jsonObj.status == '200'){
			}
		}
	});
},

just.ctl.ban = function(me, trigid, subid, t_min, useflag){
	var params = {};
	params.trigid = trigid;
	params.subid = subid;
	params.t_min = t_min;
	params.useflag = (useflag == 0 ? 1 : 0);
	Ext.Ajax.request({
		url: just.getUrl('/sys/ctl/gh10_ctl_at_auto_delete_d.action'),
		params: {params: Ext.encode(params)},
		success: function(response, options){
			var jsonObj = Ext.JSON.decode(response.responseText);
			if(jsonObj.status == '200'){
				var listGrid = Ext.ComponentQuery.query('ctl_at_AtSubList')[0];
//				var listGrid = Ext.getCmp('ctl_at_AtSubList_ID');
				listGrid.plugins[0]._store.load();
				listGrid.store.load();
			}
		}
	});
},

//把分钟数转换为时间
just.util.transValueToTime = function(v){
	if(v >= 0 && v <= 1440){
		var hour = Math.floor(v/60);
		var min = v -hour*60;
		return (hour>9?hour:('0'+hour)) + ':' + (min>9?min:('0'+min));
	}else{
		return v;
	}
};

//把时间转换为分钟数, 传进日期对象
just.util.transTimeToValue = function(date){
	if(date && date instanceof Date){
		return date.getHours()*60 + date.getMinutes();
	}else{
		return date;
	}
}

//设置分页刷新按钮状态
just.util.setGridPagingToolbarRefresh = function(grid, flag){
	var length = grid.dockedItems.keys.length;
	var refreshStr= "";
	for (var i = 0; i < length; i++) {
	    if (grid.dockedItems.keys[i].indexOf("pagingtoolbar") !== -1) {
	         refreshStr= grid.dockedItems.keys[i];
	    }
	}
	if(flag){
		//显示分页刷新按钮
		grid.dockedItems.get(refreshStr).child('#refresh').setVisible(true);
	}else{
		//隐藏分页刷新按钮
		grid.dockedItems.get(refreshStr).child('#refresh').hide();
	}
};


/**
 * 功能： 用于判断指定的数组是否被包含,传来的数组存放的是对象
 * arr: 数组
 */
Array.prototype._isContain = function(arr){
//    console.log("isContian函数被调用");
    if(!(this instanceof Array)) return false;
    if(!(arr instanceof Array)) return false;
    if(arr.length == 0) return false;
    if(this.length < arr.length) return false;
    var str = this.toString();
    for(var i =0; i<arr.length; i++){
        if(str.indexOf(arr[i]) == -1) return false;
    }
    return true;
};

/**
 * 功能： 通过得到这个元素的索引，使用js数组自己固有的函数去删除这个元素
 * val: 要移除的值
 */
Array.prototype._remove = function(val) {
    var index = this._indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
        return 1;
    }
    return -1;
};

/**
 * 功能： 用于查找指定的元素在数组中的位置，即索引
 * val: 要查找的元素
 */
Array.prototype._indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
//        console.log(this[i].toString());
//        console.log(val.toString());
//        console.log(Boolean(this[i].toString() == val.toString()));
        if (this[i].toString() == val.toString()) return i;
    }
    return -1;
};




//计算文件大小，返回文件大小值，单位K
just.util.getFileSize=function(target){
  var isIE = Ext.isIE;
  var fs = 0;
  if (isIE && !target.files) {
      var filePath = target.value;
      var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
      var file = fileSystem.GetFile (filePath);
      fs = file.Size;
  }else if(target.files && target.files.length > 0){
      fs = target.files[0].size;
  }else{
      fs = 0;
  }
  if(fs > 0){
      fs = fs / 1024;
  }
  return fs;
};

Ext.onReady(function () {
    /**
     * 初始化提示组件,为对象添加toptip功能,这样提示信息才可用
     * */
    Ext.form.Field.prototype.msgTarget = 'side';//Ext表单提示方式：msgTarget:有4中方式：qtip,title,under,side
    /**
     * ajax异常处理
     * */
    Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
        var status = response.status;
        var url = options.url;
        url = url.replace(just.rootPath(),'');
        var json = undefined;
		try{
			json = Ext.decode(response.responseText);
		}catch(e){
			return;
		}
		if(response.timedout == true){
			Ext.MessageBox.alert('系统提示', "操作超时");
			return;
		}
		//403表示操作未授权
        if (status == 403) {
			Ext.MessageBox.alert('系统提示', "系统未登录，请重新登录...");
            //window.location.href= just.getUrl('/login.html');
            var newView = Ext.create('Admin.view.authentication.LockScreen' );
            //this.redirectTo("LOGIN");
            return;
        }else if (status == 303 || status == 309 || status == 400 || status == 404 || status == 407 || status == 500 ) {
            Ext.MessageBox.alert('系统提示', json.info);
        }else{
            Ext.MessageBox.alert('系统提示', json.info);
        }
    }, this);
});
