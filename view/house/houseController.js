Ext.define('Admin.view.house.houseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.house_house',
    _me: undefined,
    _container: undefined,
    _dp_sensor: undefined,
    _dpsensorStore: undefined,
    _dp_store: undefined,
    _dp_monit_store: undefined,
    _task:undefined,
    init: function() {
        this.control({
            'house_house': {
                beforerender: this._initViews
            },
            'house_houseList': {
                afterrender: this._onRefresh
            },
            'house_houseList button[action=add]': {
                click: this._onShowAddWin
            },
            'house_houseAdd button[action=save]': {
                click: this._onAddhouse
            },

        });
    },


    /**
     * 界面加载后
     */
    _initViews: function(cmp, eOpts) {
        this._container = cmp;
    },
    /**
     * 刷新
     */
    _onRefresh: function() {
        this._loadData();

    },
    /**
     * 初始化搜索参数
     * @private
     */
    _initSearchParams: function() {
        var spinfoses = Ext.ComponentQuery.query("form[name='house_houseSearch_from']");
        var spinfose = spinfoses[spinfoses.length - 1];
        var formParams = spinfose.getValues();
        var params = {};
        params.keyword = formParams.keyword;
        // params.housename = formParams.housename;
        // params.corpid = just.data.user.loginInfo.corpid;
        return params;
    },
    /**
     * 加载数据
     */
    _loadData: function(page) {
        var listGrid = Ext.getCmp('house_houseList_Panel');
        var listStore = listGrid.getViewModel().getData().houseGrid;
        var params = this._initSearchParams();
        if (!page) {page = 1;}
        listStore.currentPage = page;
        listStore.proxy.extraParams = {params: Ext.encode(params)};
        listStore.load();
        this._dp_store = listStore;

        this._dp_monit_store = Ext.create('Admin.store.house.dp_sensor');
        this._dp_monit_store.proxy.url = this._dp_monit_store.proxy.api.senmonit;
        //  var dmparams = {};
        //  dmparams.rgx = 't';//'^lux[0-9]';
        //  this._dp_monit_store.proxy.extraParams = {
        //      params: Ext.encode(dmparams)
        //  };
        this._dp_monit_store.load();
    },


    _onAddhouse: function(btn) {
        var me = this;
        var win = btn.up('window');
        var form = win.down('form');
        if (form.isValid()) {
            var formParams = form.getValues();
            var params = {};
            params.ghid = formParams.ghid;
            params.compid = formParams.compid;
            params.area = formParams.area;
            params.ghname = formParams.ghname;
            params.ghstyle = formParams.ghstyle;
            params.plantsid = formParams.plantsid;
            params.xsize = formParams.xsize;
            params.ysize = formParams.ysize;
            params.useflag = formParams.useflag;

            var listStore = this.getView().getViewModel().getData().houseGrid;
            just.showWaitingDlg("请稍候...");
            Ext.Ajax.request({
                url: listStore.proxy.api.ADD,
                params: {
                    params: Ext.encode(params)
                },
                success: function(response, options) {
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    just.hideWaitingDlg(jsonObj.info, true);
                    if (jsonObj.status == '200') {
                        win.close();
                        me._onRefresh();
                    }
                }
            });
        }
    },
    plantrender:function (cmp) {
      var _store = cmp.getStore();
      _store.proxy.url = _store.proxy.api.LIST;
      _store.load();
    },
    dpinsertitems:function (cmp,record,item,icon) {

      var patt = new RegExp('^'+cmp+'[0-9]');
      if(cmp == 'liquid' || cmp == 'wc')
      {
        patt = new RegExp('^'+cmp);
      }
      var patt1 = new RegExp('^'+record.data.ghid+'$');
      this._dp_monit_store.filter("field_name", patt);
      this._dp_monit_store.filter("ghid", patt1);
      var records = this._dp_monit_store.data.items;
      var at_num = 0;
      var at_count = 0;
      if (records.length > 0) {
          var fjhtml = '<div style="padding:16px 12px 0px 12px;color:#4CAF50;text-align:center;height:64px;" data-qtip="<div >';
          records.forEach(function(e) {
              var idata = e.data;
              if((cmp == 'at' || cmp=='liquidfix' || cmp=='liquidstatus' || cmp=='wc' || cmp=='wcu' || cmp=='video') && idata.cv != null ){
                at_num += parseInt(idata.cv);
              }
              if((cmp == 'co2' || cmp=='lux' || cmp=='ph' || cmp=='rht' || cmp=='sm' || cmp=='t' || cmp=='wt' || cmp=='ec') && idata.cv != null ){
                at_num += parseFloat(idata.cv);
                at_count++;
              }
              fjhtml = fjhtml + '[' + idata.dp_dispname + '] - [' + idata.batchid + '] - [' + idata.cv + ']<br>';
          });
          if(cmp == 'co2' || cmp=='lux' || cmp=='ph' || cmp=='rht' || cmp=='sm' || cmp=='t' || cmp=='wt' || cmp=='ec'){
            if(at_num>0){
              at_num = at_num.toFixed(2)/at_count;
            }
            else{
              at_num = '-';
            }

          }
          fjhtml += '</div>" ><i style="font-size:26px" class="'+icon+'"></i><div>'+at_num+'</div></div>';

          item.add({
              xtype: 'panel',

              html: fjhtml,
          });
      };
    },
    _showdapengdetile: function(cmp) {

        var me = this;
        var win = Ext.widget("house_dpdetail");
        win.removeAll(true);
        this._dp_store.data.items.forEach(function(e){
          var record = e;
          var item = Ext.create("Admin.view.widgets.WidgetE");
          win.add(item);
          item.setTitle('大棚名称:    ' + record.data.ghname);
          item._ghid = record.data.ghid;
          item._xsize = record.data.xsize;
          item._ysize = record.data.ysize;
          item._compid = record.data.compid;
          item._intval = record.data.intval;


          me.dpinsertitems('at',record,item,'icon-mianbanfengshan ');
          me.dpinsertitems('co2',record,item,'icon-eryanghuatanhanliang');
          me.dpinsertitems('liquid',record,item,'icon-guanjiangguanlutaizhang');
          //me.dpinsertitems('liquidfix',record,item,'icon-guanjiangguanlutaizhang');
          //me.dpinsertitems('liquidstatus',record,item,'icon-guanjiangguanlutaizhang ');
          me.dpinsertitems('lux',record,item,'icon-taiyang ');
          me.dpinsertitems('ph',record,item,'icon-shujuguanlisvg69');
          me.dpinsertitems('rht',record,item,'icon-shidu');
          me.dpinsertitems('sm',record,item,'icon-shidu');
          me.dpinsertitems('ssc',record,item,'icon-xiangqing');
          me.dpinsertitems('t',record,item,'icon-wenduji');
          me.dpinsertitems('wc',record,item,'icon-caozuoshuibeng');
          //me.dpinsertitems('wcu',record,item,'fa fa-spin fa-refresh');
          me.dpinsertitems('wt',record,item,'icon-shuiwendeng');
          me.dpinsertitems('ec',record,item,'icon-yanfen');
          me.dpinsertitems('video',record,item,'icon-shipin');

        });

    },
    _showhousedetail: function(grid, rowIndex, colIndex, node, e, record, rowEl) {
        var win = Ext.widget("house_housedetail");
        //win._ghid = record.get('ghid');
        this._inithousedetailView(win, record.get('ghid'),record.get('xsize'),record.get('ysize'),record.get('compid'),record.get('intval'));
    },
    _dpsenload:function (cmp, ghid,xsize,ysize,compid) {
      var _me = this;
      _me._dpsensorStore.load({
          callback: function() {
              //cmp.removeAll(true);
            for (var i = 0; i < _me._dpsensorStore.data.length; i++) {
                  var record = _me._dpsensorStore.getAt(i);

                  //  var tpl ='<div data-qtip="'+record.data.dp_dispname+'<br> 当前值：'+record.data.cv+'<br>最近采集时间：'+record.data.batchid+'" style="background:green;color:#fff;height:25px;float:left;text-align:center;"><i class="fa fa-spin fa-cog fa-2x"></i> </div>'  //<i class="fa fa-video-camera"></i>
                  var tpl = '<div id="dp_sensors_' + i +
                   '" data-qtip="' + record.data.dp_dispname +
                  '<br> 当前值：' + record.data.cv +
                  '<br>最近采集时间：' + record.data.batchid +
                  '<br>位置：（' + record.data.x + ',' + record.data.y +
                   ')<br>反馈字段：' + record.data.feedback_field_names +
                  '<br>传感器：'+record.data.sn+
                  '<br>传感器状态：'+record.data.status_dispname+
                  ' " style="background:transparent;color:#3ecb7d;height:54px;text-align:center;padding:3px;line-height:15px;font-size:24px;"><i style="font-size:48px;" class="icon-wendu"></i> </div>' +
                      '<div style="float: left;">' +
                      '<div style="text-align:center;line-height:12px;min-width:48px;"><a  style="text-decoration:none;line-height:25px" href="javascript:void(0);"  id="dp_sensor_' + i + '">' + record.data.dp_dispname + '<br><h2 style="font-size:16px;color:#388E3C;margin:0;display:inline;">' + record.data.cv + '</h2></a></div>' +
                      '</div>';
                  var item = Ext.create("Admin.view.dashboard.dp_sensor", {
                      //  id:'dp_sensor_'+i,
                      xtype: "dp_sensorpanel",
                      x: (Ext.getBody().getViewSize().width / xsize) * record.data.x,
                      y: (Ext.getBody().getViewSize().height / ysize) * record.data.y,
                      my_data: record,
                      //tpl: '<div data-qtip="'+'This is a quick tip<br> from markup!'+'" style="background:#82d9EA;height:40px;width:50px;float:left;text-align:center;"><img src="resources/images/icons/{icon}" alt="{forecast}"/></div>',
                      html: tpl,
                  });


                  if (record.data.fieldname_dp.indexOf("at") == 0) { //风机
                    cmp.down('house_tabp').setActiveItem(0);
                      cmp.down('house_tabp').items.items[0].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("co") == 0) { //二氧化碳
                    cmp.down('house_tabp').setActiveItem(6);
                      cmp.down('house_tabp').items.items[6].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("liquid") == 0) { //液面滴灌高度
                    cmp.down('house_tabp').setActiveItem(2);
                      cmp.down('house_tabp').items.items[2].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("liquidfix") == 0) { //液面滴管水位
                    cmp.down('house_tabp').setActiveItem(2);
                      cmp.down('house_tabp').items.items[2].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("lux") == 0) { //g光照
                    cmp.down('house_tabp').setActiveItem(3);
                      cmp.down('house_tabp').items.items[3].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("ph") == 0) { //ph
                  cmp.down('house_tabp').setActiveItem(7);
                      cmp.down('house_tabp').items.items[7].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("rht") == 0) { //空气湿度
                    cmp.down('house_tabp').setActiveItem(5);
                      cmp.down('house_tabp').items.items[5].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("sm") == 0) { //土壤水份
                    cmp.down('house_tabp').setActiveItem(5);
                      cmp.down('house_tabp').items.items[5].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("ssc") == 0) { //遮阳帘
                    cmp.down('house_tabp').setActiveItem(9);
                      cmp.down('house_tabp').items.items[9].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("t") == 0) { //气温
                    cmp.down('house_tabp').setActiveItem(4);
                      cmp.down('house_tabp').items.items[4].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("wc") == 0) { //
                    cmp.down('house_tabp').setActiveItem(2);
                      cmp.down('house_tabp').items.items[2].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("wt") == 0) { //水温
                    cmp.down('house_tabp').setActiveItem(4);
                      cmp.down('house_tabp').items.items[4].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("ec") == 0) { //水温
                    cmp.down('house_tabp').setActiveItem(8);
                      cmp.down('house_tabp').items.items[8].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("video") == 0) { //vedio
                    cmp.down('house_tabp').setActiveItem(10);
                      cmp.down('house_tabp').items.items[10].add(item);
                  }





                  var dpsenser = Ext.get('dp_sensor_' + i);
                  dpsenser.on("click", _me._OnLinkClick, _me);
                  if (record.data.fieldname_dp.indexOf("at") == 0) { //风机
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-mianbanfengshan';
                      cmp.down('house_tabp').items.items[0].add(item);
                  }
                  if (record.data.fieldname_dp.indexOf("co") == 0) { //二氧化碳
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-eryanghuatanhanliang';
                  }
                  if (record.data.fieldname_dp.indexOf("liquid") == 0) { //液面滴灌高度
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-xidishuiwei';
                  }
                  if (record.data.fieldname_dp.indexOf("liquidfix") == 0) { //液面滴管水位
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-xidishuiwei';
                  }
                  if (record.data.fieldname_dp.indexOf("lux") == 0) { //g光照
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'fa icon-taiyang';
                  }
                  if (record.data.fieldname_dp.indexOf("ph") == 0) { //ph
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-shujuguanlisvg69';
                  }
                  if (record.data.fieldname_dp.indexOf("rht") == 0) { //空气湿度
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-shidu';
                  }
                  if (record.data.fieldname_dp.indexOf("sm") == 0) { //土壤水份
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-shidu';
                  }
                  if (record.data.fieldname_dp.indexOf("ssc") == 0) { //遮阳帘
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-xiangqing';
                  }
                  if (record.data.fieldname_dp.indexOf("t") == 0) { //气温
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-wenduji';
                  }
                  if (record.data.fieldname_dp.indexOf("wc") == 0) { //
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-caozuoshuibeng';
                      Ext.get('dp_sensors_' + i).dom.style.fontSize = '20px';
                  }
                  if (record.data.fieldname_dp.indexOf("wt") == 0) { //水温
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-shuiwendeng';
                  }
                  if (record.data.fieldname_dp.indexOf("ec") == 0) { //水温
                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-yanfen';
                  }
                  if (record.data.fieldname_dp.indexOf("video") == 0) { //vedio

                      Ext.get('dp_sensors_' + i).dom.firstChild.className = 'icon-shipin';
                      Ext.get('dp_sensor_' + i).dom.innerHTML='视频1:<a style="color:#e91e63;margin:0;display:inline;text-decoration:none;"  href="javascript:;" onclick="_seevideo('+record.data.lsenid+')" >查看</a>'  ;
                  }
                  if (record.data.s_status == null || record.data.s_status == '0' ) {
                    Ext.get('dp_sensors_' + i).dom.style.color = '#bbb';
                  }
                  if ( record.data.s_status == '1') {
                      Ext.get('dp_sensors_' + i).dom.style.color = '#4CAF50';
                      if (record.data.fieldname_dp.indexOf("wc") == 0) { //风机
                          if(record.data.cv == 0){
                            Ext.get('dp_sensors_' + i).dom.style.color = '#757575';
                        }
                      }
                  }
                  if ( record.data.s_status == '3') {
                      Ext.get('dp_sensors_' + i).dom.style.color = '#FF5722';
                  }



              }
          }
      })
    },
    _inithousedetailView: function(cmp, ghid,xsize,ysize,compid,intval,eOpts) {
      _me = this;
      this._dpsensorStore = Ext.create('Admin.store.house.dp_sensor');
      this._dpsensorStore.proxy.extraParams = {
          params: Ext.encode({
              ghid: ghid,
              compid: compid
          })
      };
    //  var fj = cmp.down('house_tabp').items.items[0];

      this._dpsenload(cmp, ghid,xsize,ysize,compid);
      this._task = {
				run: function(){
          var now = new Date();
          if(intval != null && intval != '' && intval != 0 && intval != '0'){
          if((now.getMinutes()%(parseInt(intval)+2)) == 0){
              _me._dpsenload(cmp, ghid,xsize,ysize,compid);
            };
        }
				  },
				  interval: 60000
		};
    //Ext.TaskManager.start(this._task);
    cmp._task = this._task;


    },
    _OnLinkClick: function(obj, value, scope) {
        this._setlsentor(value.id);
    },


    /**
     * 显示添加界面
     */
    _onShowAddWin: function(sedit) {
        var win = Ext.widget("house_houseAdd");
        var corpid_combo = win.down('combo[name=compid]');
        var area_combo = win.down('combo[name=area]');
        area_combo.cflag = 1;
        var _store = corpid_combo.getStore();
        _store.proxy.url = _store.proxy.api.LIST;
        _store.load();
        var _areastore = area_combo.getStore();
        _areastore.proxy.url = _areastore.proxy.api.arealist;
        //  _areastore.proxy.extraParams = {params: Ext.encode({compid:1})};
        //  _areastore.load();
        if (just.data.user.loginInfo.roleid > 1) {
            corpid_combo.setValue(just.data.user.loginInfo.corpid);
            corpid_combo.setReadOnly(true);
            corpid_combo.setFieldStyle('background:#F7F7F7;');
        }

    },
    comp_change: function(c, nv, ov, opts) {
        var comb = c.up('form').down('combo[name=area]');
        if (comb.cflag === 1) {
            comb.setValue(null);
        }

        if (c.isValid()) {
            comb.setReadOnly(false);
            comb.getStore().proxy.extraParams = {
                params: Ext.encode({
                    compid: nv
                })
            };
            comb.getStore().load();
        }

    },

    /**
     * 显示修改界面
     */
    _onShowEditWin: function(grid, rowIndex, colIndex, node, e, record, rowEl) {
        var win = Ext.widget("house_houseAdd");
        var corpid_combo = win.down('combo[name=compid]');
        var area_combo = win.down('combo[name=area]');
        var _store = corpid_combo.getStore();
        _store.proxy.url = _store.proxy.api.LIST;
        _store.load();
        area_combo.cflag = 0;
        var _areastore = area_combo.getStore();
        _areastore.proxy.url = _areastore.proxy.api.arealist;
        _areastore.proxy.extraParams = {
            params: Ext.encode({
                compid: record.get('compid')
            })
        };
        win.down('form').loadRecord(record);
        if (just.data.user.loginInfo.roleid > 1) {
            corpid_combo.setValue(just.data.user.loginInfo.corpid);
            corpid_combo.setReadOnly(true);
            corpid_combo.setFieldStyle('background:#F7F7F7;');
        }
        var date = win.down('datefield[name=start_date]');
        date.setValue(record.data.start_date.substring(0, 10));

    },


    _onDelete: function(grid, rowIndex, colIndex, node, e, record, rowEl) {
        var me = this;
        var listStore = this.getView().getViewModel().getData().houseGrid;
        var params = {};
        params.houseid = record.data.gwid;
        if (Ext.MessageBox.confirm("系统提示", "是否禁用选中项？", function(e) {
                if (e == 'yes') {
                    just.showWaitingDlg("正在禁用,请稍候...");
                    Ext.Ajax.request({
                        url: listStore.getProxy().api.DELETE,
                        params: {
                            params: Ext.encode(params)
                        },
                        success: function(response, options) {
                            var jsonObj = Ext.JSON.decode(response.responseText);
                            just.hideWaitingDlg(jsonObj.info, true);
                            if (jsonObj.status == '200') {
                                me._onRefresh();
                            }
                        }
                    });
                }
            }));
    },
    _setlsentor: function(value) {

        var record = this._dpsensorStore.getAt(value.substring(10, value.length)).data;
        var win = Ext.widget("house_lsensoradd");
        win._latask = this._task;
        win._storeid = value;
        win.setTitle('[  ' + record.dp_dispname + '  ]  配置');
        win._ghid = record.ghid_h;
        win._field_name = record.fieldname_dp;
        win._alignchan = record.alignchan;

        var feedback_combo1 = win.down('combo[name=feedback]');
        var feedback_store = feedback_combo1.getStore();
        feedback_store.proxy.url = feedback_store.proxy.api.FEED_BACK;
        var fparams = {};
        fparams.compid = record.compid;
        fparams.ghstyle = record.ghstyle;
        fparams.field_name = record.fieldname_dp;
        feedback_store.proxy.extraParams = {
            params: Ext.encode(fparams)
        };
        feedback_store.load({
            callback: function(records, operation, success) {
                if (success) {
                    if (record.feedback_field_names != null) {
                        feedback_combo1.setValue(record.feedback_field_names.split(','));
                    }
                }


            }
        });


        var lsen_combo1 = win.down('combo[name=lsenid]');
        var _store = lsen_combo1.getStore();
        _store.removeAll();
        _store.clearFilter();
        _store.proxy.url = _store.proxy.api.LIST;
        var params = {};
        params.filename = record.fieldname_dp;
        params.gwid = record.gwid;
        _store.proxy.extraParams = {
            params: Ext.encode(params)
        };
        _store.load({
            callback: function(records, operation, success) {
                var arr = [];
                records.forEach(function(e) {
                    arr.push(e.data.lsenid);
                });
                var result = [];
                var result1 = [];
                var tmp;
                while (tmp = arr.shift()) {
                    if (result.length == 0) {
                        result.push([tmp]);
                        continue;
                    }

                    var e = result[result.length - 1];
                    if (tmp == e[e.length - 1] + 1) {
                        e.push(tmp);
                    } else {
                        result.push([tmp]);
                    }
                }
                result.forEach(function(e) {
                    if (e.length > parseInt(record.alignchan) - 1) {
                        for (var i = 1; i < parseInt(record.alignchan); i++) {
                            e.pop();
                        }
                        result1.push(e);
                    }
                });

                var dd = '^('; ///49|50)$';

                result1.forEach(function(e) {
                    e.forEach(function(t) {
                        dd += t + '|';
                    })
                });
                if(record.lsenid != null && record.lsenid != 0){
                  dd += record.lsenid+'|';
                };
                dd += '0)$';

                var patt = new RegExp(dd);
                _store.filter("lsenid", patt);
                if(record.lsenid != null && record.lsenid != 0 && (record.devdir==2 || record.devdir==3)){
                  _store.add({lsenid:record.lsenid,chan_dispname:record.sn+'(id:'+record.lsenid+')'},{lsenid: '0',chan_dispname: '置空'});
                }
                else{
                  _store.add({lsenid: '0',chan_dispname: '置空'});
                }

                if (record.lsenid != null) {
                    lsen_combo1.setValue(record.lsenid);
                }
            }
        });
    },
    _onAddtrigid:function (btn) {
      var me = this;
      var win = btn.up('window');
      var form = win.down('form');
      if (form.isValid()) {
          var formParams = form.getValues();
          var params = {};
          params.ghid = win._ghid;
          params.trigid = formParams.trigid;
          params.action = win._action;

          var listStore = this.getView().getViewModel().getData().houseGrid;
          just.showWaitingDlg("请稍候...");
          Ext.Ajax.request({
              url: listStore.proxy.api.Addtrigid,
              params: {
                  params: Ext.encode(params)
              },
              success: function(response, options) {
                  var jsonObj = Ext.JSON.decode(response.responseText);
                  just.hideWaitingDlg(jsonObj.info, true);
                  if (jsonObj.status == '200') {
                      win.close();
                      me._onRefresh();
                  }
              }
          });
      }

    },
    _onAddlsenor: function(btn) {
        var me = this;
        var win = btn.up('window');
        var storeid = win._storeid;
        var lstoreid  = 'dp_sensors_'+storeid.substring(storeid.lastIndexOf('_')+1,storeid.length);
        var form = win.down('form');
        if (form.isValid()) {
            var formParams = form.getValues();
            var params = {};
            params.ghid = win._ghid;
            params.field_name = win._field_name;
            params.lsenid = formParams.lsenid;


            if (win._alignchan == 2) {
                params.lsenid2 = formParams.lsenid + 1;
            } else {
                params.lsenid2 = 0;
            }
            if (formParams.feedback != '') {
                params.feedback = formParams.feedback.join(',');
            } else {
                params.feedback = '';
            }
            var listStore = this.getView().getViewModel().getData().houseGrid;
            just.showWaitingDlg("请稍候...");
            Ext.Ajax.request({
                url: listStore.proxy.api.ADDlsensor,
                params: {
                    params: Ext.encode(params)
                },
                success: function(response, options) {
                    var jsonObj = Ext.JSON.decode(response.responseText);
                    just.hideWaitingDlg(jsonObj.info, true);
                    if (jsonObj.status == '200') {
                        win.close();

                        Ext.get(lstoreid).dom.style.color = '#4CAF50';
                         Ext.TaskManager.stop(win._latask);//关闭定时器
                         Ext.TaskManager.start(win._latask);//关闭定时器
                    }
                }
            });
        }

    },

    trigid_conf: function(row, raw, trig_name, dis,action) {
        var win = Ext.widget("house_trigid");
        win.setTitle(dis + '控制设置');
        win.down('button[name=addrule]').action = action;
        win.down('button[name=addrule]')._table_name = trig_name;
        win.down('button[name=addrule]').wtitle = dis;
        win._ghid = raw.get('ghid');
        win._action = action;



        var trig_combo = win.down('combo[name=trigid]');
        var trig_store = trig_combo.getStore();
        trig_store.proxy.url = trig_store.proxy.api.TRIGIDLIST;
        var params = {};
        params.tabname = trig_name;
        params.compid = raw.get('compid');
        trig_store.proxy.extraParams = {
            params: Ext.encode(params)
        };
        trig_store.load();
        trig_combo.setValue(row);
    },
    liquid_trigid_conf: function(cmp, cell, index, row, event, raw, eOpts) {
        var r_v = raw.get('liquid_trigid');
        this.trigid_conf(r_v, raw, 'gh10_ctl_liquid', '自动滴液控制','liquid_trigid');
    },
    wc_trigid_conf: function(cmp, cell, index, row, event, raw, eOpts) {
        var r_v = raw.get('wc_trigid');
        this.trigid_conf(r_v, raw, 'gh10_ctl_wc', '营养液循环泵','wc_trigid');
    },
    liquid_fix_trigid_conf: function(cmp, cell, index, row, event, raw, eOpts) {
        var r_v = raw.get('liquid_fix_trigid');
        this.trigid_conf(r_v, raw, 'gh10_ctl_liquid_fix', '滴灌自动补液控制','liquid_fix_trigid');
    },
    at_trigid_conf: function(cmp, cell, index, row, event, raw, eOpts) {
        var r_v = raw.get('at_trigid');
        this.trigid_conf(r_v, raw, 'gh10_ctl_at', '风机控制','at_trigid');
    },
    ssc_trigid_conf: function(cmp, cell, index, row, event, raw, eOpts) {
        var r_v = raw.get('ssc_trigid');
        this.trigid_conf(r_v, raw, 'gh10_ctl_ssc', '遮阳帘控制','ssc_trigid');
    },
    t_r_trigid_conf: function(cmp, cell, index, row, event, raw, eOpts) {
        var r_v = raw.get('t_r_trigid');
        this.trigid_conf(r_v, raw, 'gh10_sensor_r_sch', '采集调度','t_r_trigid');
    },
    onaddtrigidClick: function(cmp) {
        //var win = Ext.widget("testwin");
        //  return;
        var compname = null;
        if (cmp._table_name == 'gh10_ctl_liquid') {
            compname = 'ctl_liquid_Liquid'
        }
        if (cmp._table_name == 'gh10_ctl_wc') {
            compname = 'ctl_wc_Wc'
        }
        if (cmp._table_name == 'gh10_ctl_liquid_fix') {
            compname = 'ctl_fix_Fix'
        }
        if (cmp._table_name == 'gh10_ctl_at') {
            compname = 'ctl_at_At'
        }
        if (cmp._table_name == 'gh10_ctl_ssc') {
            compname = 'ctl_ssc_Ssc'
        }
        if (cmp._table_name == 'gh10_sensor_r_sch') {
            compname = 'ctl_sensor_Sensor'
        }
        var conf_win = Ext.widget("testwin");
        conf_win.add({
          xtype: compname
        });
        conf_win.setTitle(cmp.wtitle);
        /*var params = {
            targetCfg: {

            },
            windowCfg: {

                title: cmp.wtitle,
                width: Math.floor(Ext.Element.getViewportWidth() - 80),
                height: Math.floor(Ext.Element.getViewportHeight() - 80),
            }
        };
        this.setCurrentView(compname, params);*/
    },
    setCurrentView: function(view, params) {
        var cfg = Ext.apply({
            xtype: 'testwin',
            items: [
                Ext.apply({
                    xtype: view
                }, params.targetCfg)
            ]
        }, params.windowCfg);
        this.getView().add(Ext.create(cfg));
    },
    intodp: function(cmp, opts, d) {
        var win = Ext.widget("house_housedetail");
        //win._ghid = record.get('ghid');  record.get('xsize'),record.get('ysize'),record.get('compid')
        var rcd = d.up('panel');
        this._inithousedetailView(win, rcd._ghid,rcd._xsize,rcd._ysize,rcd._compid,rcd._intval);
    },
    /**
     * 初始化权限
     */
     _stop_stask:function (cmp) {

       Ext.TaskManager.stop(cmp._task);//关闭定时器

     },
    initPermission: function(cmp) {
        var me = this;
        var refs = me.getReferences(),
            house_grid = refs.house_grid;
        var util = Ext.create(just.createUtil('Permission'));
        util.initPermission(cmp, house_grid);
    }

});
