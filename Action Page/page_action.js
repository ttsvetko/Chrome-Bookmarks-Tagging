(function (win) {
	var doc = win.document;

	function ActionPage (tab) {
		this._tab = tab;
	}

	ActionPage.prototype = {
		constructor: ActionPage,

		toString: function () {return "TagDialog"},

		
	}

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tab) {
		new TagDialog(tab[0]);
	})
}(window))