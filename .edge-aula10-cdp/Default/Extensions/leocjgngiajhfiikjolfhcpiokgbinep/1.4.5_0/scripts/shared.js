/* common local variables */

// default options
var _tabId = "";
var _options = {
	popupWidth			: 400,
	popupHeight			: 0,
	openInNewTab		: false,
	openIncognito		: false,
	autoLogOutTime		: 0,
	extVersion			: '',
	addContextMenuItem	: true
};
// error codes
var ERROR = {
	UNKNOWN_ERROR		: 1,
	TIMEOUT				: 2,
	ILLEGAL_REQUEST		: 3,
	ILLEGAL_RESPONSE	: 4,
	ILLEGAL_CALLBACK	: 5,
	AUTH_FAILED			: 6,
	NOT_AUTHORIZED		: 7,
	NOT_FOUND			: 8,
	NO_DATA				: 9,
	TREE_CORRUPT		: 10,
	STORAGE_QUOTA		: 11,
	STORAGE_WRITE_FAIL	: 12,
	STORAGE_READ_FAIL	: 13,
	STORAGE_CORRUPT		: 14,
	UNSUPPORTED_FORMAT	: 15,
	CHROME_CREATE_FAIL	: 16,
	MIGRATE_FAIL		: 17,
	MIGRATE_UNSUPPORTED	: 18,
	LEVELDB_CORRUPT		: 19,
	CHROME_PERMISSION	: 20
};

// wrapper function for chrome.extension.sendMessage that adds a timeout mechanism
function messageBackground(msg,callback) {
	if (typeof(callback) === "function") {
		var errorTimeout = window.setTimeout(function() {
			showErrorPage(ERROR.TIMEOUT);
		},1000);
		chrome.extension.sendMessage(msg,function(error) {
			window.clearTimeout(errorTimeout);
			if (typeof(error) === "undefined") {
				error = ERROR.ILLEGAL_RESPONSE;
			}
			callback(error);
		});
	}
	else {
		chrome.extension.sendMessage(msg,function(error){});
	}
}

// show messages to the user
function showMessage(type,message) {
	var p = $('<p>').html(message);
	p.find('a').click(function(e) {
		e.preventDefault();
		chrome.tabs.create({url: e.target.href});
	});
	
	$('#messages').prepend($('<div>')
		.addClass('message')
		.addClass(type)
		.append(p)
		.append($('<input type="button" title="Hide message" value="x"></input>')
			.click(function(e) {
				e.preventDefault();
				$(this).parent().slideUp('fast',function() {
					$(this).remove();
				})
			})
		)
	);
}

// count the total number of children in a tree
function countChildren(tree) {
	var count = 1;
	for (var i in tree.children) {
		count += countChildren(tree.children[i]);
	}
	return count;
}