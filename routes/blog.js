/*
 * GET blog posts.
 */

var fs = require('fs'),
	markdown = require('markdown').markdown;

function buildBlogPosts(req, res) {

	var iter = 0,
		iterTwo = 0,
		postFiles = [],
		length = 0,
		posts = [];

	function sendPosts() {

		// Send posts to template for rendering
		res.render('blog', {
			title: 'think UX | Blog',
			posts: posts
		});
	}

	function readPostFile(iter) {

		var item = postFiles[iter],
			postUrl,
			grabUrl,
			encodedUrl,
			post,
			excerpt,
			rawTitle,
			postTitle,
			endOfFirstParagraph,
			startOfDate,
			endOfDate,
			titleDate,
			dateObj,
			formattedDate,
			grabMonth,
			grabDate,
			grabYear;

		// Start making the titles, urls and dates pretty
		startOfDate = item.indexOf('__');
		endOfDate = item.lastIndexOf('.');
		titleDate = item.slice(startOfDate, endOfDate).replace(/_{1,}/g, ' ');
		dateObj = new Date(titleDate);
		grabMonth = dateObj.getMonth();
		grabMonth = grabMonth + 1;
		grabDate = dateObj.getDate();
		grabYear = dateObj.getFullYear();
		formattedDate = grabYear + '/' + grabMonth + '/' + grabDate;
		rawTitle = item.slice(0, startOfDate);
		postTitle = rawTitle.replace(/_{1,}/g, ' ');
		grabUrl = item.replace('.md', '');
		encodedUrl = encodeURIComponent(grabUrl);
		postUrl = '/blog/' + encodedUrl + '/';

		fs.readFile('posts/' + item, 'UTF8', function (err, data) {

			if (err) {
				throw err;
			}

			// Make excerpt
			endOfFirstParagraph = data.indexOf('\n\n');
			excerpt = data.slice(0, endOfFirstParagraph).replace(/#{1,}/g, '');

			// Start building the post object in the posts array
			post = {
				title: postTitle,
				link: postUrl,
				rawDate: dateObj,
				postDate: formattedDate,
				excerpt: markdown.toHTML(excerpt),
				content: markdown.toHTML(data)
			};

			posts.push(post);

			// If this is the last item in the dir, send data to be rendered
			if ((length - iterTwo) === 1) {

				sendPosts();
			}

			iterTwo++;
		});
	}

	// This kickstarts the post building
	fs.readdir("posts", function (err, files) {

		postFiles = files;

		length = files.length;

		if (err) {

			throw err
		}

		for (iter; iter < length; iter++) {

			// For each file in the dir, read it's contents
			readPostFile(iter)
		}
	});
}

// Build single post entry
function buildSinglePost(req, res) {

	var post = {},
		title = req.route.params.post,
		url = 'posts/' + req.route.params.post + '.md';

	// console.log(req.route);

	function sendPost() {

		console.log(post);

		// Send posts to template for rendering
		res.render('post', {
			title: 'think UX | Blog',
			post: post
		});
	}

	fs.readFile(url, 'UTF8', function (err, data) {

		if (err) {
			throw err;
		}

		console.log(data);

		var item = title,
			postUrl,
			grabUrl,
			encodedUrl,
			rawTitle,
			postTitle,
			startOfDate,
			endOfDate,
			titleDate,
			dateObj,
			formattedDate,
			grabMonth,
			grabDate,
			grabYear;

		// Start making the titles, urls and dates pretty
		startOfDate = item.indexOf('__');
		endOfDate = item.lastIndexOf('.');
		titleDate = item.slice(startOfDate, endOfDate).replace(/_{1,}/g, ' ');
		dateObj = new Date(titleDate);
		grabMonth = dateObj.getMonth();
		grabMonth = grabMonth + 1;
		grabDate = dateObj.getDate();
		grabYear = dateObj.getFullYear();
		formattedDate = grabYear + '/' + grabMonth + '/' + grabDate;
		rawTitle = item.slice(0, startOfDate);
		postTitle = rawTitle.replace(/_{1,}/g, ' ');
		grabUrl = item.replace('.md', '');
		encodedUrl = encodeURIComponent(grabUrl);
		postUrl = '/blog/' + encodedUrl + '/';

		// Start building the post object in the posts array
		post = {
			title: postTitle,
			link: postUrl,
			rawDate: dateObj,
			postDate: formattedDate,
			content: markdown.toHTML(data)
		};

		// We're done. Send post out!
		sendPost();
	})
}

exports.posts = function (req, res) {

	buildBlogPosts(req, res);
};
exports.single = function (req, res) {

	console.log('Line 160: Hello');

	buildSinglePost(req, res);
};