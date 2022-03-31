import * as Figma from 'figma-api';
import { figmaToken } from '../../../_figmaToken';

import { UIKit, UIKitComponentsData, UIKitData } from '../../../@types/types';
import { getFigmaFileComponentsData } from './getFigmaFileComponentsData';
import { getFigmaFileStylesData } from './getFigmaFileStylesData';

const api = new Figma.Api({
    personalAccessToken: figmaToken,
});

export async function getUIKitData(uikitEntry: UIKit) {
    const coreFigmaFile = uikitEntry.files.core;
    const rootFigmaFile = uikitEntry.files.root;
    const componentsFigmaFile = uikitEntry.files.components;
    const srvAssetsFigmaFile = uikitEntry.files['srv-assets'];
    const clientAssetsFigmaFile = uikitEntry.files['client-assets'];
    const systemFigmaFile = uikitEntry.files['system'];

    const uikitData: UIKitData = {
        id: uikitEntry.id,
        name: uikitEntry.name,
        data: {
            styles: {},
            components: {},
        },
        extra: {
            // add links (they will be used later)
            links: {
                core: `https://www.figma.com/file/${coreFigmaFile}/`,
                root: `https://www.figma.com/file/${rootFigmaFile}/`,
                components: `https://www.figma.com/file/${componentsFigmaFile}/`,
                'srv-assets': srvAssetsFigmaFile ? `https://www.figma.com/file/${srvAssetsFigmaFile}/` : '',
                'client-assets': clientAssetsFigmaFile ? `https://www.figma.com/file/${clientAssetsFigmaFile}/` : '',
                system: systemFigmaFile ? `https://www.figma.com/file/${systemFigmaFile}/` : '',
            },
        },
    };

    // STYLES
    // -----------------------

    // get all the "core" styles
    uikitData.data.styles = await getFigmaFileStylesData(coreFigmaFile);
    // we need to include the "personas" styles for Bumble Mobile
    if (uikitEntry.id === 'bumble_mobile_uikit') {
        const personasStyles = await getFigmaFileStylesData(componentsFigmaFile);
        uikitData.data.styles = Object.assign(personasStyles, uikitData.data.styles);
    }

    // COMPONENTS
    // -----------------------

    // get all the "core/root/main" components/component_sets
    const coreComponents: UIKitComponentsData = await getFigmaFileComponentsData(coreFigmaFile, 'core-components');
    const rootComponents: UIKitComponentsData = await getFigmaFileComponentsData(rootFigmaFile, 'root-components');
    const mainComponents: UIKitComponentsData = await getFigmaFileComponentsData(componentsFigmaFile, 'main-components');

    // get all the "srv/client-assets" and "client-assets" components/component_sets
    let srvAssets: UIKitComponentsData = {};
    if (srvAssetsFigmaFile) {
        srvAssets = await getFigmaFileComponentsData(srvAssetsFigmaFile, 'srv-assets');
    }
    let clientAssets: UIKitComponentsData = {};
    if (clientAssetsFigmaFile) {
        clientAssets = await getFigmaFileComponentsData(clientAssetsFigmaFile, 'client-assets');
    }

    // get the system components
    let systemComponents: UIKitComponentsData = {};
    if (systemFigmaFile) {
        systemComponents = await getFigmaFileComponentsData(systemFigmaFile, 'system');
    }

    // merge all the components in a single flat list
    uikitData.data.components = { ...coreComponents, ...rootComponents, ...mainComponents, ...srvAssets, ...clientAssets, ...systemComponents };

    // console.log('uikitData', JSON.stringify(uikitData));
    return uikitData;
}
