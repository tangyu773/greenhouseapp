Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function(button, e) {
        this.redirectTo("dashboard");
    },
    lock_afr:function(con,e){
      con.down('textfield[name="account"]').focus( );
      con.down('textfield[name="password"]').setValue(null );
    },
    onLoginButton: function(button, e, eOpts) {
      formPanel = button.up('form');
      var me = this;
      var form = formPanel.getForm(),
				pwd = formPanel.down('textfield[name="password"]');
				account = formPanel.down('textfield[name="account"]').getValue();
        pwd.setValue(Ext.util.MD5(pwd.getValue()));
				if(formPanel.isValid()) {
					form.doAction('submit',{
						url:'login.action',
						waitMsg:'系统登录中...',
						method:'POST',
            //params:{password:Ext.util.MD5(pwd.getValue())},
						success: function(frm, action) {


              if (action.result.success) {
                    me.redirectTo("widgets");

                  pwd.setValue('');
                    window.location.reload(true);

              }else{

                  Ext.example.msg('提示', json.info);
                  pwd.setValue('');
              }
	                    },
            failure: function(frm, action) {
                   			Ext.example.msg('提示', '登陆失败！');
                        pwd.setValue('');
                    	}
					});
				}
    },

    onLoginAsButton: function(button, e, eOpts) {
        this.redirectTo("authentication.login");
    },

    onNewAccount:  function(button, e, eOpts) {
        this.redirectTo("authentication.register");
    },

    onSignupClick:  function(button, e, eOpts) {
        this.redirectTo("dashboard");
    },
    enterSubmit : function(me, e, e0pts) {

       var key = e.getKey();
       if(key == e.ENTER) {
           this.onLoginButton(me);
       }
    },
    onResetClick:  function(button, e, eOpts) {
        this.redirectTo("dashboard");
    }
});
