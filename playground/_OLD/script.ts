import { UIKit, UIKitData } from '../../@types/types';

// remember to configure the UI Kit files here
import { cosmosUIKits } from '../../_cosmosUIKits';

import { getUIKitData } from './modules/getUIKitData';
import { saveUIKitData } from './modules/saveUIKitData';

// EXPORT UI KIT DATA
// -------------------------------

async function exportUIKitData() {
    cosmosUIKits.forEach(async (uikitEntry: UIKit) => {
        // get all the data for the current UI kit entry
        const uikitData: UIKitData = await getUIKitData(uikitEntry);
        // generate the corresponding files
        await saveUIKitData(uikitData);
    });
}

exportUIKitData();
