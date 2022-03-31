import fse from 'fs-extra';
import path from 'path';
import prettier from 'prettier';

import { isEmpty } from 'lodash';

import { UIKitData } from '../../../@types/types';

export async function saveUIKitData(uikitData: UIKitData) {
    let content = '';
    if (uikitData.extra && uikitData.extra.links) {
        const links = uikitData.extra.links;
        content += '// Figma files:\n';
        content += `// - Core: ${links['core']}\n`;
        content += `// - Root: ${links['root']}\n`;
        content += `// - Components: ${links['components']}\n`;
        if (links['srv-assets']) {
            content += `// - SRV Assets: ${links['srv-assets']}\n`;
        }
        if (links['client-assets']) {
            content += `// - Client Assets: ${links['client-assets']}\n`;
        }
        content += '\n';
        // remove useless entities
        delete uikitData.extra.links;
        if (isEmpty(uikitData.extra)) {
            delete uikitData.extra;
        }
    }
    content += `export const uiKitData = ${JSON.stringify(uikitData)}`;
    const prettifiedContent = prettier.format(content, { parser: 'typescript' as const, printWidth: 120, tabWidth: 4, singleQuote: true });

    const targetFileName = `${uikitData.id}.ts`;
    const targetFilePath = path.resolve(__dirname, '../../dist/', targetFileName);
    await fse.outputFile(targetFilePath, prettifiedContent);
}
