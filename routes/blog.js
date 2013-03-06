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

	function compare(a, b) {
		if (a.rawDate > b.rawDate)
			return -1;
		if (a.rawDate < b.rawDate)
			return 1;
		return 0;
	}

	function sendPosts() {

		posts.sort(compare);

		// Send posts to template for rendering
		res.render('blog', {
			title: 'think UX | Blog',
			posts: posts
		});
	}

	function readPostFile(iter) {

		var item = postFiles[iter],
			postMetaString,
			postMetaJson,
			postUrl,
			postContent,
			grabUrl,
			encodedUrl,
			post,
			excerpt,
			endOfFirstParagraph,
			startOfMeta,
			endOfMeta,
			dateObj;

		fs.readFile('posts/' + item, 'UTF8', function (err, data) {

			if (err) {
				throw err;
			}

			// Get meta from post and JSON'ify it
			startOfMeta = data.indexOf('{{');
			endOfMeta = data.lastIndexOf('}}');
			postMetaString = data.slice(startOfMeta, endOfMeta + 1).replace('{', '');
			postMetaJson = JSON.parse(postMetaString);

			// Now build additional meta data for post object
			dateObj = new Date(postMetaJson.date);
			grabUrl = item.replace('.md', '');
			encodedUrl = encodeURIComponent(grabUrl);
			postUrl = '/blog/' + encodedUrl + '/';

			// Grab article contents
			postContent = data.slice(endOfMeta + 2);
			postContent = postContent.trim();

			// Make excerpt
			endOfFirstParagraph = postContent.indexOf('\n\n');
			excerpt = postContent.slice(0, endOfFirstParagraph).replace(/#{1,}/g, '');

			// Start building the post object in the posts array
			post = {
				title: postMetaJson.title,
				author: postMetaJson.author,
				tags: postMetaJson.tags,
				link: postUrl,
				rawDate: dateObj,
				postDate: postMetaJson.date,
				excerpt: markdown.toHTML(excerpt),
				content: markdown.toHTML(postContent)
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
		item = req.route.params.post,
		url = 'posts/' + req.route.params.post + '.md';

	function sendPost(post) {

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

		var postMetaString,
			postMetaJson,
			postUrl,
			postContent,
			encodedUrl,
			post,
			excerpt,
			endOfFirstParagraph,
			startOfMeta,
			endOfMeta,
			dateObj;

		// Get meta from post and JSON'ify it
		startOfMeta = data.indexOf('{{');
		endOfMeta = data.lastIndexOf('}}');
		postMetaString = data.slice(startOfMeta, endOfMeta + 1).replace('{', '');
		postMetaJson = JSON.parse(postMetaString);

		// Now build additional meta data for post object
		dateObj = new Date(postMetaJson.date);
		encodedUrl = encodeURIComponent(item);
		postUrl = '/blog/' + encodedUrl + '/';

		// Grab article contents
		postContent = data.slice(endOfMeta + 2);
		postContent = postContent.trim();

		// Make excerpt
		endOfFirstParagraph = postContent.indexOf('\n\n');
		excerpt = postContent.slice(0, endOfFirstParagraph).replace(/#{1,}/g, '');

		// Start building the post object in the posts array
		post = {
			title: postMetaJson.title,
			author: postMetaJson.author,
			tags: postMetaJson.tags,
			link: postUrl,
			rawDate: dateObj,
			postDate: postMetaJson.date,
			excerpt: markdown.toHTML(excerpt),
			content: markdown.toHTML(postContent)
		};

		// We're done. Send post out!
		sendPost(post);
	})
}

exports.posts = function (req, res) {

	buildBlogPosts(req, res);
};
exports.single = function (req, res) {

	console.log('Line 160: Hello');

	buildSinglePost(req, res);
};