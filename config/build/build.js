const CleanCSS = require('clean-css');
const { writeFile, readFile, promises, copyFile } = require('fs');
esbuild = require('esbuild');
minify = require('html-minifier');
path = require('path')

basepath = path.resolve(__dirname, '..', '..')

// JS
esbuild.build({
    outdir: basepath + '/dist',
    entryPoints: [`${basepath}/js/index.js`],
    entryNames: 'js/index',
    loader: {".js": "js"},
    bundle: true,
    minify: true,
    publicPath: '/www'
}).catch(() => process.exit(1))

// HTML
readFile(basepath + '/index.html', {encoding: "utf-8"}, function(err, data) {
    if (!err) {
        console.log('Start build html');
        const minifyhtml = minify.minify(data, {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            useShortDoctype: true,
        });
        writeFile(`${basepath}/dist/index.html`, minifyhtml, function(err, data) {
            if(err) {
                return console.log(err);
            }
            console.log("Done html build!");
        })
        console.log(basepath + '/dist' + '/index.html')
    } else {
        console.log(err);
    }
})

// CSS
readFile(basepath + '/css' + '/main.css', {encoding: "utf-8"}, function(err, data) {
    if (!err) {
        console.log('Start build css');
        // const minifycss = new CleanCSS({
        //     compatibility: {
        //       colors: {
        //         hexAlpha: false, // controls 4- and 8-character hex color support
        //         opacity: true // controls `rgba()` / `hsla()` color support
        //       },
        //       properties: {
        //         backgroundClipMerging: true, // controls background-clip merging into shorthand
        //         backgroundOriginMerging: true, // controls background-origin merging into shorthand
        //         backgroundSizeMerging: true, // controls background-size merging into shorthand
        //         colors: true, // controls color optimizations
        //         ieBangHack: false, // controls keeping IE bang hack
        //         ieFilters: false, // controls keeping IE `filter` / `-ms-filter`
        //         iePrefixHack: false, // controls keeping IE prefix hack
        //         ieSuffixHack: false, // controls keeping IE suffix hack
        //         merging: true, // controls property merging based on understandability
        //         shorterLengthUnits: false, // controls shortening pixel units into `pc`, `pt`, or `in` units
        //         spaceAfterClosingBrace: true, // controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`
        //         urlQuotes: true, // controls keeping quoting inside `url()`
        //         zeroUnits: true // controls removal of units `0` value
        //       },
        //       selectors: {
        //         adjacentSpace: false, // controls extra space before `nav` element
        //         ie7Hack: true, // controls removal of IE7 selector hacks, e.g. `*+html...`
        //         mergeLimit: 8191, // controls maximum number of selectors in a single rule (since 4.1.0)
        //         multiplePseudoMerging: true // controls merging of rules with multiple pseudo classes / elements (since 4.1.0)
        //       },
        //       units: {
        //         ch: true, // controls treating `ch` as a supported unit
        //         in: true, // controls treating `in` as a supported unit
        //         pc: true, // controls treating `pc` as a supported unit
        //         pt: true, // controls treating `pt` as a supported unit
        //         rem: true, // controls treating `rem` as a supported unit
        //         vh: true, // controls treating `vh` as a supported unit
        //         vm: true, // controls treating `vm` as a supported unit
        //         vmax: true, // controls treating `vmax` as a supported unit
        //         vmin: true // controls treating `vmin` as a supported unit
        //       }
        //     }
        // }).minify(data)

        promises.mkdir(`${basepath}/dist/css/`, { recursive: true }).catch(console.error);
        writeFile(`${basepath}/dist/css/main.css`, data, function(err, data) {
            if(err) {
                return console.log(err);
            }
            console.log("Done css build!");
        })
        console.log(basepath + '/dist' + '/css' + '/main.css')
    } else {
        console.log(err);
    }
})

// ASSETS

promises.mkdir(`${basepath}/dist/assets/fonts`, { recursive: true }).catch(console.error);
copyFile(`${basepath}/assets/fonts/HelveticaNeueCyr-MediumItalic.ttf`, `${basepath}/dist/assets/fonts/HelveticaNeueCyr-MediumItalic.ttf`, (err) => {
    if (err) {
        console.log(err)
    }
})
copyFile(`${basepath}/assets/main-person.jpg`, `${basepath}/dist/assets/main-person.jpg`, (err) => {
    if (err) {
        console.log(err)
    }
})