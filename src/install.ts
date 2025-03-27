import chalk from 'chalk';
import fileRead from './utils/file';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
    console.log(chalk.yellowBright('Initializing...'));

    const rootPath = process.env.INIT_CWD!;

    const pkgPath = path.join(rootPath, 'package.json');

    const pkg = JSON.parse(fileRead(pkgPath)!);

    const scriptsToAdd = {
        dev: 'static-site-gen -dev',
        build: 'static-site-gen -build',
        start: 'static-site-gen -start',
        deploy: 'static-site-gen -deploy',
    };

    Object.entries(scriptsToAdd).forEach(([key, script]) => {
        if (pkg.scripts[key] && pkg.scripts[key] !== script) {
            console.info(chalk.yellow(`Warning: '${script}' script already exists at ${pkgPath}`));
        } else {
            pkg.scripts[key] = script;
        }
    });

    writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));

    console.log(chalk.greenBright('Initializing complete!'));
};
