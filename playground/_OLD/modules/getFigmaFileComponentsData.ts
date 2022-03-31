import * as Figma from 'figma-api';
import { figmaToken } from '../../../_figmaToken';

import { pick, has, merge } from 'lodash';

import { FigmaFile, UIKitComponentsData } from '../../../@types/types';
import { ComponentMetadata } from 'figma-api/lib/api-types';

const api = new Figma.Api({
    personalAccessToken: figmaToken,
});

// Notice: this hack has been introduced when we had to merge the multi-file UI kits in a single UI Kit library for the NVL/New Visual Language project.
// in this way we could annotate the page names in the single Figma file with a suffix that would associate the content of that page with the corresponding original Figma file
// eg. "Button [root]" means that the component "Button" in that page corresponds to the equivalent "Button" component in the "root" UI Kit,
// while the Button component in the "Button [main]" page has a corresponding equivalent in the "Button"component in the "main" UI Kit.
// In the evolution of the script, you may want to remove this extra logic, but in that case better to just leave it commented out, in case is needed again in the future.
const getComponentOverrides = (entry: ComponentMetadata, group: string) => {
    const regex = /^(.*) \[(\w+)\]$/;
    // TODO! fix this TS error
    // @ts-ignore
    if (entry && entry.containing_frame && entry.containing_frame.pageName && entry.containing_frame.pageName.match(regex)) {
        // TODO! fix this TS error
        // @ts-ignore
        const match = entry.containing_frame.pageName.match(regex);
        return {
            group: `${match[2]}-components`,
            containing_frame: {
                pageName: match[1],
            },
        };
    } else {
        return {};
    }
};

export async function getFigmaFileComponentsData(file: FigmaFile['figmaKey'], group: string) {
    const componentsData: UIKitComponentsData = {};

    // COMPONENTS
    const fileComponents = await api.getFileComponents(file);

    fileComponents.meta?.components.forEach((entry) => {
        const data: any = pick(entry, ['key', 'file_key', 'node_id', 'name']);
        data.group = group;
        data.type = 'component';
        data.containing_frame = pick(entry.containing_frame, ['name', 'nodeId', 'pageId', 'pageName', 'containingStateGroup']);
        if (has(entry, 'containing_frame.containingStateGroup')) {
            data.isComponentSetVariant = true;
        } else {
            data.isSetVariant = false;
        }
        // handle overrides of "group" done via page name
        merge(data, getComponentOverrides(entry, group));
        // append the component data to the main object
        componentsData[entry.key] = data;
    });

    // COMPONENT_SETS
    const fileComponentSets = await api.getFileComponentSets(file);

    fileComponentSets.meta?.component_sets.forEach((entry) => {
        const data: any = pick(entry, ['key', 'file_key', 'node_id', 'name']);
        data.group = group;
        data.type = 'component_set';
        data.containing_frame = pick(entry.containing_frame, ['name', 'nodeId', 'pageId', 'pageName', 'containingStateGroup']);
        // handle overrides of "group" done via page name
        merge(data, getComponentOverrides(entry, group));
        // append the component data to the main object
        componentsData[entry.key] = data;
    });

    return componentsData;
}
