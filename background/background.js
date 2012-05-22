/**
 * background.js
 *
 * 
 * 
 * @author Tsvetan Tsvetkov
 * @date May 2012
 */

(function (win) {
	"use strict";

	var doc = win.document,
		tagsTree = "__TagsTree__",
		extensionID = chrome.extension.getURL('background/background.js')
							.split('//')[1].split('/')[0],
		localStorage = win.localStorage,
		emptyFunction = function () {};

	/**
	 * TagManager
	 *
	 */
	function TagManager () {
		this._tagsTreeID = localStorage[extensionID];

		this._init();
	}

	TagManager.prototype = {
		constructor: TagManager,

		toString: function () {
			return "TagManager";
		},

		_createBookmarkFolder: function (paramsObj, callback) {
			var paramsObj = paramsObj || {},
				callback = callback || emptyFunction;

			chrome.bookmarks.create(paramsObj, callback);
		},

		_getBookmarkFolder: function (id, callback) {
			if (!id) {return [];}

			var callback = callback || emptyFunction;

			chrome.bookmarks.get(id, callback);
		},

		_getChildren: function (id, callback) {
			if (!id) {return []}

			var callback = callback || emptyFunction;

			chrome.bookmarks.getChildren(id, callback);
		},

		_init: function () {
			var self = this;
			this._getChildren("2", function (results) {
				var i = 0, len = results.length,
					folderId = self._tagsTreeID,
					found = false;

				for (i; i < len; i++) {
					if (folderId) {
						if (results[i].id === folderId && 
											results[i].title === tagsTree) {
							found = true;
							break;
						}
					} else {
						if (results[i].title === tagsTree) {
							folderId = self._tagsTreeID = 
									localStorage[extensionID] = results[i].id;
							found = true;
							break;
						}
					}
				}

				if (!folderId || !found) {
					self._createBookmarkFolder({title: tagsTree}, function (result) {
						self._tagsTreeID = localStorage[extensionID] = result.id;
					})
				}

				/*
				 * Add Event Listeners
				 */
				chrome.tabs.onActivated.addListener(function (activeInfo) {
					self._setPageActionIcon(activeInfo.tabId);
				});

				chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
					if (changeInfo.status === "complete") {
						self._setPageActionIcon(tabId);
					}
				});
			});
		},

		_setPageActionIcon: function (tabId) {
			chrome.tabs.get(tabId, function (tab) {
				var url = tab.url;
				chrome.bookmarks.search(tab.url, function (results) {
					var i = 0, len = results.length;

					for (i; i < len; i++) {
						if (results[i].url === url) {
							chrome.pageAction.show(tabId);
						}
					}
				})
			})
		}
	}

	new TagManager();

}(window));