
CKEDITOR.plugins.add('wscn', {
    //lang:['zh-cn','en'],
    requires: ['dialog'],
    init: function(editor){
        var b = editor.addCommand('wscn_markets', new CKEDITOR.dialogCommand('wscn_markets_dlg'));
        editor.ui.addButton('WSCNMarkets', {
            label: "插入行情提示",
            command: 'wscn_markets',
			//toolbar: 'insert',
            icon: this.path + 'images/wscn.png'
        });
        CKEDITOR.dialog.add('wscn_markets_dlg', this.path + 'dialogs/wscn_markets_dlg.js');
		
		if ( editor.contextMenu ) {
            editor.addMenuGroup( 'wscnGroup' );
            editor.addMenuItem( 'insertMarketItem', {
                label: '更新行情提示',
                icon: this.path + 'images/wscn.png',
                command: 'wscn_markets',
                group: 'wscnGroup'
            });

            editor.contextMenu.addListener( function( element ) {
                if ( !!element.getAscendant( 'wscn', true ) ) {
                    return { insertMarketItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }
    }
});