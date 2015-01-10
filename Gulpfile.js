var path = require("path"),
	gulp = require("gulp"),
	sass = require("gulp-sass"),
	watchify = require("watchify"),
	browserify = require("browserify"),
	reactify = require("reactify"),
	source = require("vinyl-source-stream"),
	rename = require("gulp-rename"),
	express = require("express"),
	sfx = require("sfx"),
	notifier = require("node-notifier");


/**
 * Create a static server.
 */
gulp.task("server", function() {
	var app = express();
	
	app.use(function(req, res, next) { 
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		console.log(" -> " + req.method + " " + req.url); next(); 
	});

	app.use(express.static(__dirname));

	console.log("Server listening on :8001");
	app.listen(8001);
});

/**
 * Build the CSS.
 */
gulp.task("css", function() {
	gulp.src("./assets/style/*.scss")
		.pipe(sass())
		.on("error", function(err) {
			notifier.notify({
				message: "SASS",
				message: "Build error."
			});
			console.warn(err.message);
			sfx.funk();
		})
		// .on("end", function() {
		// 	notifier.notify({
		// 		title: "SASS",
		// 		message: "Files built successfully."
		// 	});
		// })
		.pipe(rename("bundle.css"))
		.pipe(gulp.dest("./assets/build"));
});

/*
 * Build the Javascript.
 */
gulp.task("browserify", function() { 
	// Enable source maps
	watchify.args.debug = true;

	var bundler = watchify(browserify("./src/index.js", watchify.args));

	// bundler.transform("reactify");

	bundler.on("update", rebundle);

	function rebundle() {
		var bundle = bundler.bundle(), length = 0;

		bundle.on("data", function(chunk) {
			length += chunk.length;
		});

		bundle.on("end", function() {
			// notifier.notify({
			// 	title: "Browserify",
			// 	message: "Files built successfully. (" + (length/1000) + "kb)"
			// });
			
			console.log("[Browserify] Files built successfully. (%dkb)", (length/1000));
		});

		bundle.on("error", function(err) {
			var matches = err.message.match(/Parsing file ([^\:]+):\s(.+)/),
				message = "";

			if(matches) {
				message += path.basename(matches[1]) + ": " + matches[2]
			}

			notifier.notify({
				title: "Browserify Error",
				message: message.length ? message : "Parser error."
			});

			sfx.funk();
			console.log("\n" + err.stack);
		});

		return bundle
			.pipe(source("bundle.js"))
			.pipe(gulp.dest("./assets/build"));
	}


	return rebundle();
});

/**
 * Build the app.
 */
gulp.task("build", ["browserify", "css"]);

/**
 * Watch for changes.
 */
gulp.task("watch", ["build"], function() {
	gulp.watch("assets/style/*.scss", ["css"]);
});