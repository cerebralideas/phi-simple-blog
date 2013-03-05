(function () {

	'use strict';

	var doc = $(document),
		navItem = $('.navItem');

	doc.on('click', '.js_useModal', function (e) {

		var $that = $(e.target),
			$parent = $that.parent(),
			href = $parent.attr('href'),
			id = $parent.attr('data-modal-id'),
			title = $parent.attr('data-modal-title'),
			modal;

		e.preventDefault();

		if (!document.getElementById(id)) {

			modal = '<div id="' + id + '" class="modal">' +
						'<h2 class="modalHeader">' + title + '</h2>' +
						'<a class="js_closeModal close" href="">☓</a>' +
						'<hr/>' +
						'<img src="' + href + '">' +
					'</div>';

			doc.find('body').append(modal);
		}

		$('#' + id).reveal();
	});

	doc.on('click', '.navItem > a', function (e) {

		var href = $(e.target).attr('href'),
			offset = $(href).offset(),
			fromTop = offset.top;

		e.preventDefault();

		$('body, html').animate({

			scrollTop: fromTop

		}, 500, 'swing');
	});

}());