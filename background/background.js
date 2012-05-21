/*
 * @author Tsvetan Tsvetkov
 * @date May 2012
 */

(function (win) {
	"use strict";

	var doc = win.document,
		bookmarks = chrome.bookmarks,
		tagsTree = "Tags Tree";

	bookmarks.search(tagsTree, function (result) {
		if (!result.length) {
			bookmarks.create({
				title: tagsTree
			});
		}
	});
}(window));