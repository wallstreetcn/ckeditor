CKEDITOR.dialog.add('wscn_markets_dlg', function (editor) {
	var _qsrBoxAPI = 'http://api.markets.wallstreetcn.com/v1/quotes.json';
	return {
		title : '插入行情连接',
		minWidth : 400,
		minHeight : 200,
		contents : [{
				id : 'tab1',
				label : '行情信息',
				elements : [{
						type : 'text',
						id : 'symbol',
						label : '名称',
						validate : CKEDITOR.dialog.validate.notEmpty("名称不能为空"),
						setup : function (element) {
							this.setValue(element.getText());
						},
						commit : function (element) {
							element.setText(this.getValue());
						}
					}, {
						type : 'text',
						id : 'title',
						label : '链接',
						className : "asset-link",
						validate : CKEDITOR.dialog.validate.notEmpty("链接不能为空"),
						setup : function (element) {
							this.setValue(element.getAttribute("title"));
						},
						commit : function (element) {
							element.setAttribute("title", this.getValue());
						}
					}
				]
			}
		],
		onShow : function () {
			var selection = editor.getSelection(),
			element = selection.getStartElement();
			if (element)
				element = element.getAscendant('wscn', true);

			if (!element || element.getName() != 'wscn' || element.data('cke-realelement')) {
				element = editor.document.createElement('wscn');
				this.insertMode = true;
			} else
				this.insertMode = false;

			this.element = element;

			if (!this.insertMode)
				this.setupContent(this.element);

			var inputText = $(".asset-link input");
			if (!inputText.attr("data-qsrBox")) {
				var _qsrBox = inputText.qsrBox({
						url : _qsrBoxAPI,
						dataType : 'jsonp',
						position : 'absolute'
					});
				inputText.on('click_result', function (e, data) {
					console.log(data);
					inputText.val(data.url);
					_qsrBox.close();

				});

				inputText.attr("data-qsrBox", "true");
			}
		},

		onOk : function () {
			var dialog = this,
			abbr = this.element;

			this.commitContent(abbr);

			if (this.insertMode)
				editor.insertElement(abbr);
		}
	};
});