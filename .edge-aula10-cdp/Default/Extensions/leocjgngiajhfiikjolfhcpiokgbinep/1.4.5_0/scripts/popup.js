_tabId = "popup";
var _listInitialized = false;

$(document).ready(function() {
	
	// listen for instructions from background page
	chrome.extension.onMessage.addListener(handleMessages);
	
	// connect to the extension background
	messageBackground({type:'init'},function(response) {
		if (typeof(response) === "object") {
			_options = response.options;
			if (response.authenticated) {	
				showList();
			}
			else {
				if (response.firstTimeUse) {
					chrome.tabs.create({url: 'options.html'});
					window.close();
				}
				else {
					showPassForm();
				}
			}
		}
		else {
			// illegal response sent by background page... fatal error
			showErrorPage(response);
		}
	});
	
	// add some events
	$('#settingsbutton').click(function(){
		var optionsURL = chrome.extension.getURL('options.html');
		chrome.tabs.create({url: 'options.html'});
	});
	$('#signoffbutton').click(logout);
	//$('#syncbutton').click(sync);
	$('#loginform').submit(function(e) {
		e.preventDefault();
		login();
	});
	$('#addbutton').click(newBookmark);
	$('#folderbutton').click(newFolder);	
	
	chrome.tabs.getCurrent(function(tab) {
		if (tab && tab.id) {
			_tabId = 'tab-' + tab.id;
		}
	});
});

function showErrorPage(code) {
	chrome.tabs.create({url: "options.html#error-"+code});
}

// handle messages from extension
function handleMessages(request, sender, cb) {
	switch (request.type) {
		case "notify":
			switch (request.message) {
				case "login":
					$('#passfield').val('');
					$('#signoffbutton').show();
					$('#maximizebutton').show();
					//$('#syncbutton').show();
					showList();
				break;
				case "logout":
					$('#itemlist').empty();
					showPassForm();
				break;
			}
		break;
		case "warning":
		case "success":
		case "error":
		case "notice":
			showMessage(request.type,request.message);
		break;
		case "treeChanged":
			// do not respond to treeChanged events triggered by this page itself
			if (_tabId !== request.senderId) {
				$('#itemlist').empty();
				showList();
			}
		break;
		case "optionsChanged":
			// do not respond to treeChanged events triggered by this page itself
			_options = request.message;
		break;
	}
}

function showPassForm() {
	$('#maximizebutton').hide();
	$('#signoffbutton').hide();
	$('#syncbutton').hide();
	$('.content').hide();
	$(document.body).width(350);
	$('#passform').show();
	$('#passfield').focus();
}

function showList() {
	messageBackground({'type':'getDecryptedTree'},function(tree) {
		if (typeof(tree)==="object" && tree && tree.id === "0") {
			$('.content').hide();
			
			$(document.body).width(_options.popupWidth || 400);
			
			if (_options.popupHeight) {
				$(document.body).css({
					'height': 'auto',
					'overflow-y': 'hidden'
				});
				$('div#itemlist').css({
					'max-height': _options.popupHeight,
					'overflow-y': 'scroll'
				});
			}
			
			
			showTree(tree);
			
			if (!_listInitialized) {
				initList();
			}
			
			$('#main').show();
		}
		else {
			showErrorPage(ERROR.TREE_CORRUPT);
		}
	});
}

function login() {
	var pass = $('#passfield').val();
	if (pass && pass.length>0) {
		messageBackground({
			type	: 'login',
			pass	: pass
		},function(error){
			if (error === 0) {
				// successful login is handled by extension message handler
			}
			else {
				if (error === ERROR.AUTH_FAILED) {
					// password incorrect
					var srcEl = $('#passfield');
					srcEl.val('');
					var errEl = $('<div>').addClass("error-overlay").width(srcEl.outerWidth()).height(srcEl.outerHeight()).offset(srcEl.offset());
					$(document.body).append(errEl);
					errEl.fadeOut(1000,function() {
						$(this).remove();
					});
				}
				else {
					// fatal error
					showErrorPage(error);
				}
			}
		});
	}
}

function logout() {
	messageBackground({type	: 'logout'},function(error){
		if (error === 0) {
			$('#itemlist').empty();
			showPassForm();
		}
		else {
			showErrorPage(error);
		}
	});
}

function sync() {

}

function showTree(tree) {
	$('#itemlist')
		.empty()
		.append(tree2html(tree))
	;
}

function initList() {
	$('#itemlist')
		.click(function(e) {
			var trg = $(e.target);
			var item = trg.parents('li').first();
			var action = 'none';
			var newTab = false;
			if (trg.attr('id') === 'editform' || trg.parents('#editform').length) {
				// do not process click events in edit form fields
				return;
			}
			e.preventDefault();
			if (trg.hasClass('edit')) {
				action = 'edit';
			}
			else if (trg.hasClass('delete')) {
				action = 'delete';
			}
			else {
				if (item.hasClass('dd-parent')) {
					if (trg.hasClass('dd-toggle')) {
						if (!e.ctrlKey) {
							action = 'toggleCollapse';
						}
						else {
							action = 'open';
							newTab = true;
						}
					}
					else {
						// click in empty space
						action = 'none';
					}
				}
				else {
					action = 'open';
					newTab = _options.openInNewTab ? !e.ctrlKey : e.ctrlKey;
				}
			}
			
			switch(action) {
				case 'open':
					openItem(item,newTab);
				break;
				case 'edit':
					toggleEditItem(item);
				break;
				case 'delete':
					removeItem(item);
				break;
				case 'toggleCollapse':
					// note that folder collapse/expand behavior is managed by jquery-nestable plugin
				case 'none':
				default:
					// do nothing
				break;
			}
		})
		.nestable({
			maxDepth: 99,
			fixedType: true,
			hideButtons: true
		})
		.on('change',function(e,changes) {
			var itemId = $(changes.item).data('id')+'';
			var toParentId = ($(changes.to.parent).data('id') || '0') + '';
			var toIndex = changes.to.index;
			messageBackground({
				type		: 'move',
				id			: itemId,
				destination	: {
					parentId	: toParentId,
					index		: toIndex
				}
			},function(item) {
				if (typeof(item)!=="object") {
					showErrorPage(item);
				}
			});
		})
		.on('expand',function(e,item) {
			toggleCollapse(item);
			$(item).find('.dd-toggle').first().attr('title','Collapse');
		})
		.on('collapse',function(e,item) {
			toggleCollapse(item);
			$(item).find('.dd-toggle').first().attr('title','Expand');
		})
	;
	_listInitialized = true;
}

function openItem(item,newTab) {
	var links = [];
	item.find('a.bookmark').each(function() {
		var url = $(this).attr('href');
		if (url) {
			links.push(url);
		}
	});
	if (links.length === 0) {
		showMessage('error','Could not load bookmark: Invalid URL');
		return;
	}
	
	var wid = -1;
	chrome.windows.getAll(function(windows) {
		var isActive = false;
		for (var i in windows) {
			if (windows[i].type && windows[i].type !== "normal") {
				// skip popups etc.
				continue;
			}
			else {
				if (!_options.openIncognito || windows[i].incognito) {
					wid = windows[i].id;
					if (windows[i].focused) {
						isActive = true;
						break;
					}
				}
			}
		}
		if (wid === -1) {
			// incognito required, but no incognito window exists
			chrome.windows.create({incognito: true, url: links, type: 'normal'},function(wnd) {
				chrome.windows.update(wnd.id, {state: 'maximized', focused: true});
			});
		}
		else {
			if (newTab || links.length > 1) {
				for (var i in links) {
					chrome.tabs.create({windowId: wid, 'url': links[i]},function() {
						if (!isActive) {
							// visually notify user of change in inactive window
							chrome.windows.update(wid,{focused: true});
						}
					});
				}
			}
			else {
				chrome.tabs.query({windowId: wid, active: true},function(tabs) {
					chrome.tabs.update(tabs[0].id, {'url': links[0]},function() {
						if (!isActive) {
							// visually notify user of change in inactive window
							chrome.windows.update(wid,{focused: true});
						}
					});
				});
			}
			
		}
	});
}

function toggleCollapse(item) {
	messageBackground({
		type	: 'toggleCollapse',
		id		: $(item).data('id')+''
	});
}

function tree2html(tree) {
	var item, list;
	if (tree.children) {
		if (tree.id === '0') {
			list = $('<ol>').addClass('dd-list');
			item = list;
		}
		else {
			item = createFolder(tree.id,tree.title,tree.collapsed);
			list = item.children('ol');
		}
		for (var i in tree.children) {
			list.append(tree2html(tree.children[i]));
		}
	}
	else {
		item = createItem(tree.id,tree.title,tree.url);
	}
	return item;
}

function createItem(id,title,url) {
	return $('<li>')
		.attr('id','bml-'+id)
		.data('id',id)
		.addClass('dd-item dd-nonest')
		.append($('<div class="dd-block"></div>')
			.append($('<div class="dd-handle"></div>'))
			.append($('<div class="dd-content"></div>')
				.append($('<a class="label bookmark"></a>')
					.attr('href',url)
					.attr('title',_options.openInNewTab ? 'Open link in new page. Ctrl+click to open in current tab.' : 'Visit page. Ctrl+click to open in new tab.')
					.text(title)
				)
				.append($('<input type="button" title="Edit" class="icon edit"></input>'))
				.append($('<input type="button" title="Delete" class="icon delete"></input>'))
			)
		)
	;
}

function createFolder(id,title,collapsed) {
	var item = $('<li>')
		.attr('id','bml-'+id)
		.data('id',id)
		.addClass('dd-item dd-parent')
		.append($('<div class="dd-block"></div>')
			.append($('<div class="dd-handle"></div>'))
			.append($('<div class="dd-content"></div>')
				.append($('<span class="label dd-toggle"></a>')
					.attr('title','Collapse')
					.text(title)
				)
				.append($('<input type="button" title="Edit" class="icon edit"></input>'))
				.append($('<input type="button" title="Delete" class="icon delete"></input>'))
			)
		)
		.append($('<ol>').addClass('dd-list'))
	;
	if (collapsed) {
		item.addClass('dd-collapsed');
		item.find('.dd-toggle').first().attr('title','Expand');
	}
	return item;
}

function newFolder() {
	messageBackground({
		type		: 'create',
		bookmark	: {
			title		: 'New Folder',
			parentId	: '0',
			index		: 0
		}
	},function(tree) {
		if (typeof(tree)==="object") {
			$('#itemlist').find('ol').first().prepend(createFolder(tree.id,tree.title,false));
		}
		else {
			showErrorPage(tree);
		}
	});
}

function newBookmark() {
	chrome.tabs.getSelected(null, function(tab) {
		messageBackground({
			type		: 'create',
			bookmark	: {
				title		: tab.title,
				url			: tab.url,
				parentId	: '0',
				index		: 0
			}
		},function(tree) {
			if (typeof(tree)==="object") {
				$('#itemlist').find('ol').first().prepend(createItem(tree.id,tree.title,tree.url));
			}
			else {
				showErrorPage(tree);
			}
		});
	});
}

function removeItem(item) {	
	var itemid = item.data('id');
	messageBackground({
		type	: 'remove',
		id		: itemid
	},function(tree) {
		if (typeof(tree)==="object") {
			item.remove();
		}
		else {
			showErrorPage(tree);
		}
	});
}

function toggleEditItem(item) {
	var itemid = item.data('id');
	var a = item.find('.label').first();
	if (a.is(':visible')) {
		// submit open forms if any
		$('#editform').submit();
		a.hide();
		var editform = $('<form>')
			.addClass('editform')
			.attr('id','editform')
			.append($('<input>')
				.attr('type','text')
				.attr('id','edittitle')
				.val(a.html())
				.keypress(function(e) {
					if(e.which == 13) {
						$(this).parents('form:first').submit();
					}
				})
			)
		;
		if (a.hasClass('bookmark')) {
			editform
				.append($('<input>')
					.attr('type','text')
					.attr('id','editurl')
					.val(a.attr('href'))
					.keypress(function(e) {
						if(e.which == 13) {
							$(this).parents('form:first').submit();
						}
					})
				)
				.animate({paddingBottom:'21px'}, 200)
			;
		}
		editform
			.append($('<input class="bigbutton"></input>').attr('type','submit').attr('value','Save').hide())
			.submit(function(e) {
				e.preventDefault();
				var newtitle = $('#edittitle').val().trim();
				if (newtitle.length === 0) {
					newtitle = '(empty)';
				}
				var changes = {
					'title' : newtitle
				};
				if (a.hasClass('bookmark')) {
					var newurl = $('#editurl').val().trim();
						if (newurl.length === 0) {
						newurl = 'about:blank';
					}
					changes.url = newurl;
				}
				messageBackground({
					type		: 'update',
					id			: itemid,
					changes	: changes
				},function(tree) {
					if (typeof(tree)==="object") {
						a.text(tree.title);
						if (tree.url) {
							a.attr("href",tree.url);
							a.show();
							editform.find('#edittitle').remove();
							editform.css('paddingBottom','0px');
							editform.animate({'height':'0px'}, 200,function(){
								$(this).remove();
							});
						}
						else {
							editform.remove();
							a.show();
						}
					}
					else {
						showErrorPage(tree);
					}
				});
			})
		;
		a.after(editform);
		editform.find('#edittitle').focus().select();;
	}
	else {
		item.find('.editform').first().submit();
	}
}