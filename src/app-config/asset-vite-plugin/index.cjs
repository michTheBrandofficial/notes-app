'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = require('fs');
var path_1 = require('path');
var process_1 = require('process');
/**
 *
 * @param outAssetDir forward slash separatiing string of the out Directory vite builds to and the assets directory holding all the assets for the app. ```example``` `dist/assets'
 * @returns
 */
function AssetsPlugin(outAssetDir) {
  (function () {
    var _a;
    var _b = outAssetDir.split('/'),
      outDir = _b[0],
      assetsDir = _b[1];
    var publicDir = ''.concat((0, process_1.cwd)(), '/').concat(outDir);
    // string[] of contents of dist build directory ['assets', 'index-....js', 'index.html']
    var dirContent = (0, fs_1.readdirSync)(publicDir);
    if (
      dirContent === null || dirContent === void 0
        ? void 0
        : dirContent.includes(assetsDir)
    ) {
      var assetsDirContent = (0, fs_1.readdirSync)(
        ''.concat(publicDir, '/').concat(assetsDir)
      );
      var precacheAndRoute =
        (_a =
          assetsDirContent === null || assetsDirContent === void 0
            ? void 0
            : assetsDirContent.map) === null || _a === void 0
          ? void 0
          : _a.call(assetsDirContent, function (cacheableFile) {
              // cacheableFile is a file that we can cache on every GET 200.
              return {
                revision: null,
                url: ''.concat(assetsDir, '/').concat(cacheableFile),
              };
            });
      // enforce ts-nocheck
      var pathToSWFile = (0, path_1.join)(''.concat(publicDir, '/sw.js'));
      if ((0, fs_1.existsSync)(pathToSWFile)) {
        var swFile = (0, fs_1.readFileSync)(pathToSWFile, 'utf8')
          .replace(/\n/g, '')
          .replace(/\t/g, '')
          // @ts-ignore
          .replaceAll('// @ts-nocheck', '');
        var REPLACEABLE_STRING = 'e.precacheAndRoute([';
        var NEW_STRING = ''
          .concat(REPLACEABLE_STRING, '...')
          .concat(JSON.stringify(precacheAndRoute), ',');
        var newSWFile = '// @ts-nocheck\n'.concat(
          swFile.replace(REPLACEABLE_STRING, NEW_STRING)
        );
        (0, fs_1.writeFile)(
          pathToSWFile,
          newSWFile,
          { encoding: 'utf8' },
          function () {
            console.log('Done');
          }
        );
      }
    }
  })();
}
exports.default = AssetsPlugin;
AssetsPlugin('dist/assets');
