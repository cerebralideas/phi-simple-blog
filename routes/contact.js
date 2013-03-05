/*
 * GET thank you page.
 */

exports.thank_you = function (req, res) {

	res.render('thank-you', { title: 'Thank You!' });
};