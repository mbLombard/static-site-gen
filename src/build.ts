import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import buildHtml from './utils/buildHtml';
import { dirExists } from './utils/file';
import chalk from 'chalk';
import { Site, parseFiles } from './utils/parseFiles';
import { execSync } from 'node:child_process';

const buildPath = path.join(process.cwd(), 'build');

const filePathToDirs = (filePath: string) => filePath.substring(0, filePath.lastIndexOf('/'));

export default async () => {
    console.log(chalk.yellowBright('Building...'));

    // get layout ID
    let layoutID = process.env.LAYOUT_ID;

    if (!layoutID) {
        layoutID = "example-layout"
    }
    // remove the build folder, create a new one, obtain templates, and copy the files into it
    const cmd = `rm -rf build && mkdir build && mkdir ${layoutID}`
    execSync(cmd, { stdio: 'inherit', shell: '/bin/sh' });

    const site: Site = parseFiles();

    site.static.forEach((filePath) => {
        const dest = filePath.replace(process.cwd(), buildPath);
        execSync(`mkdir -p ${filePathToDirs(dest)}`);
        execSync(`cp -r ${filePath} ${dest}`);
    });

    for (const content of site.pages.list) {
        const pageContent = await buildHtml(content, site.pages);

        const pagePath = path.join(buildPath, content.url);

        const pageDirPath = filePathToDirs(pagePath);

        // create the directory if it doesn't exist
        if (!dirExists(pageDirPath)) mkdirSync(pageDirPath, { recursive: true });

        // write the page to the correct build folder
        writeFileSync(pagePath, pageContent);
    }

    // logRoutePages(routePages);

    writeFileSync(path.join(buildPath, 'build-' + new Date().toISOString()), 'build complete!');
};
