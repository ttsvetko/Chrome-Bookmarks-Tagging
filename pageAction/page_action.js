(function (win) {
	var doc = win.document;

	function TagDialog (tab) {
		this._tab = tab;
	}

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tab) {
		new TagDialog(tab[0]);
	})
}(window))