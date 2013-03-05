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

	console.log(req.route);

	function sendPosts() {

		// Send posts to template for rendering
		res.render('blog', {
			title: 'think UX | Blog',
			posts: posts
		});
	}

	function readPostFileStats(iterThree) {

		fs.stat('posts/' + postFiles[iterThree], function (err, stats) {

			if (err) {

				throw err;
			}

			// Add date to post object
			posts[iterThree].date = stats.mtime;

			// If this is the last item in the dir, send data to be rendered
			if ((length - iterThree) === 1) {

				sendPosts();
			}
		});
	}

	function readPostFile(iter) {

		fs.readFile('posts/' + postFiles[iter], 'UTF8', function (err, data) {

			var excerpt,
				title,
				endOfFirstParagraph;

			if (err) {
				throw err;
			}

			// Make titles pretty: replace underscores with spaces
			title = postFiles[iterTwo].replace(/_{1,}/g, ' ');
			title = title.replace('.md', '');

			// Make excerpt
			endOfFirstParagraph = data.indexOf('\n\n');
			excerpt = data.slice(0, endOfFirstParagraph);

			// Start building the post object in the posts array
			posts[iterTwo] = {};
			posts[iterTwo].title = title;
			posts[iterTwo].link = '/blog/' + postFiles[iterTwo].replace('.md', '') + '/';
			posts[iterTwo].excerpt = markdown.toHTML(excerpt);
			posts[iterTwo].content = markdown.toHTML(data);

			// kick start the file stats to grab file metadata
			readPostFileStats(iterTwo);

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

		// Make titles pretty: replace underscores with spaces
		title = title.replace(/_{1,}/g, ' ');

		// Start building the post object in the posts array
		post = {};
		post.title = title;
		post.content = markdown.toHTML(data);

		// Grab date from stats
		fs.stat(url, function (err, stats) {

			if (err) {

				throw err;
			}

			// Add date to post object
			post.date = stats.mtime;

			// We're done. Send post out!
			sendPost();
		});
	})
}

exports.posts = function (req, res) {

	buildBlogPosts(req, res);
};
exports.single = function (req, res) {

	console.log('Line 160: Hello');

	buildSinglePost(req, res);
};