Ext.define('Admin.view.authentication.LockScreen', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.Img',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    title: false,

    defaultFocus : 'account',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            reference: 'authDialog',
            //defaultButton : 'loginButton',
            autoComplete: false,
            width: 400,
            cls: 'auth-dialog-login',
            defaultFocus : 'textfield[inputType=password]',
            layout: {
                type  : 'vbox',
                align : 'stretch'
            },

            items: [
                {
                    xtype: 'container',
                    cls: 'auth-profile-wrap',
                    height : 120,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'image',
                            height: 80,
                            margin: 20,
                            width: 80,
                            alt: 'lockscreen-image',
                            cls: 'lockscreen-profile-img auth-profile-img',
                            src: 'resources/images/friends/icon.png'
                        },
                        {
                            xtype: 'box',
                            html: '<div class=\'user-name-text\'> 智慧大棚 </div><div class=\'user-post-text\'>  后台管理系统 </div>'
                        }
                    ]
                },

                {
                    xtype: 'container',
                    padding: '0 20',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '10 0'
                    },
                    listeners: {
                        afterrender: 'lock_afr',
                    },
                    items: [
                        {
                          xtype: 'textfield',
                          cls: 'auth-textbox',

                          reference: 'account',
                          height: 55,
                          hideLabel: true,
                          allowBlank : false,
                          name: 'account',
                          //bind: '{userid}',
                          emptyText: '账号',
                          triggers: {
                              glyphed: {
                                  cls: 'trigger-glyph-noop auth-email-trigger'
                              }
                          }
                        },
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            cls: 'lock-screen-password-textbox',
                            labelSeparator: '',
                            enableKeyEvents:true,
                            listeners: {
                                keypress: 'enterSubmit',
                            },
                            //fieldLabel: 'It\'s been a while. please enter your password to resume',
                            emptyText: '密码',
                            name:'password',
                            inputType: 'password',
                            allowBlank: false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop password-trigger'
                                }
                            },

                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            ui: 'soft-blue',
                            iconAlign: 'right',
                            iconCls: 'x-fa fa-angle-right',
                            text: '登  录',
                            margin:'20 0 30 0',
                            formBind: true,
                            listeners: {
                                click: 'onLoginButton'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
