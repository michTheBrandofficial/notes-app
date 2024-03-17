import { existsSync, readFileSync, readdirSync, writeFile } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

/**
 *
 * @param outAssetDir forward slash separatiing string of the out Directory vite builds to and the assets directory holding all the assets for the app. ```example``` `dist/assets'
 * @returns
 */
export default function AssetsPlugin(outAssetDir: `${string}/${string}`) {
  (() => {
    let [outDir, assetsDir] = outAssetDir.split('/');
    let publicDir = `${cwd()}/${outDir}`;
    // string[] of contents of dist build directory ['assets', 'index-....js', 'index.html']
    const dirContent = readdirSync(publicDir);
    if (dirContent?.includes(assetsDir)) {
      const assetsDirContent = readdirSync(`${publicDir}/${assetsDir}`);
      const precacheAndRoute = assetsDirContent?.map?.((cacheableFile) => {
        // cacheableFile is a file that we can cache on every GET 200.
        return { revision: null, url: `${assetsDir}/${cacheableFile}` };
      });

      // enforce ts-nocheck
      const pathToSWFile = join(`${publicDir}/sw.js`);
      if (existsSync(pathToSWFile)) {
        const swFile = readFileSync(pathToSWFile, 'utf8')
          .replace(/\n/g, '')
          .replace(/\t/g, '')
          .replaceAll('// @ts-nocheck', '');
        const REPLACEABLE_STRING = 'e.precacheAndRoute([';
        const NEW_STRING = `${REPLACEABLE_STRING}...${JSON.stringify(
          precacheAndRoute
        )},`;

        const newSWFile = `// @ts-nocheck\n${swFile.replace(
          REPLACEABLE_STRING,
          NEW_STRING
        )}`;
        writeFile(pathToSWFile, newSWFile, { encoding: 'utf8' }, () => {
          console.log('Done');
        });
      }
    }
  })();
}

AssetsPlugin(`dist/assets`);
