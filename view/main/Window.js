Ext.define('Admin.view.main.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.window',
    autoShow: true,
    modal: true,

    layout: 'fit',
  draggable:false,
    width: 200,
    height: 200,

    afterRender: function () {
        var me = this;

        me.callParent(arguments);

       // me.syncSize();

        // Since we want to always be a %age of the viewport, we have to watch for
        // resize events.
        Ext.on(me.resizeListeners = {
            resize: me.onViewportResize,
            scope: me,
            buffer: 50
        });
    },

    onDestroy: function () {
        Ext.un(this.resizeListeners);

        this.callParent();
    },

    onViewportResize: function () {
       // this.syncSize();
    },

    syncSize: function () {
        var width = Ext.Element.getViewportWidth(),
            height = Ext.Element.getViewportHeight();

        // We use percentage sizes so we'll never overflow the screen (potentially
        // clipping buttons and locking the user in to the dialog).

        this.setSize(Math.floor(width * 0.3), Math.floor(height * 0.45));
        //this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);
    }
});
