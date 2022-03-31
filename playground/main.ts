import * as Figma from '../lib/index';
import { find, pick } from 'lodash';

import { figmaToken } from '../../../_figmaToken';
import { figmaIDs } from '../../../_figmaIDs';
import { FigmaFile } from '../../../@types/types';
import { GetProjectFilesResult, ProjectFile } from 'figma-api/lib/api-types';

const api = new Figma.Api({
    personalAccessToken: figmaToken,
});

// TEAM PROJECTS
// -------------------------------

// you can use this function to get all the data about the projects you're interested in
// and prepare a list of IDs as in _figma-IDs.ts

export async function getTeamProjectsData() {
    // https://www.figma.com/files/839613523546835152/team/918476559349790623/Cosmos-Team
    const cosmosTeamID = figmaIDs.teams['Cosmos Team'].figmaID;
    const cosmosTeamProjects = await api.getTeamProjects(cosmosTeamID);
    console.log(cosmosTeamProjects);

    // https://www.figma.com/files/839613523546835152/team/839778551147448099/Cosmos-UI-Kits
    const cosmosUIKitsTeamID = figmaIDs.teams['Cosmos UI Kits'].figmaID;
    const cosmosUIKitsTeamProjects = await api.getTeamProjects(cosmosUIKitsTeamID);
    console.log(cosmosUIKitsTeamProjects);

    // https://www.figma.com/files/839613523546835152/team/854705291689964842/Cosmos-Assets
    const cosmosAssetsTeamID = figmaIDs.teams['Cosmos Assets'].figmaID;
    const cosmosAssetsTeamProjects = await api.getTeamProjects(cosmosAssetsTeamID);
    console.log(cosmosAssetsTeamProjects);
}
// getTeamProjectsData();

// PROJECT FILES
// -------------------------------

// you can use this function to get all the data about the files in a project
// and add them to the "teams.project.files" entry in _figma-IDs.ts

export async function getProjectFilesData() {
    // const teams = ['Cosmos Team', 'Cosmos UI Kits', 'Cosmos Assets'];
    const teams = ['Cosmos Team'];
    for await (const team of teams) {
        const projectFilesData: { [key: string]: FigmaFile[] } = {};
        const teamProjects = figmaIDs.teams[team].projects;
        // console.log(teamProjects);
        const projectNames = Object.keys(teamProjects);
        for (let i = 0; i < projectNames.length; i++) {
            const projectName = projectNames[i];
            const projectFiles = await api.getProjectFiles(teamProjects[projectName].figmaID);
            // console.log(projectName, projectFiles);
            projectFilesData[projectName] = projectFiles.files.map((file) => {
                return {
                    figmaKey: file.key,
                    figmaName: file.name,
                };
            });
        }
        console.log(JSON.stringify(projectFilesData, null, 2));
    }
}
getProjectFilesData();

// FILES
// -------------------------------

// export async function getFileData() {
//     const file = await api.getFile('X7BBl0I8yEE06IdyBed644');
//     console.log(file);
// }

// COMMENTS
// -------------------------------

// this is a function used to test how the APIs for comments work

export async function testComments() {
    const figmaTeam = figmaIDs.teams['Cosmos Team'];
    const figmaUIKitProject = figmaTeam.projects['TEST Cloning UI Kit'];
    // @ts-ignore
    const mainFigmaFileID = find(figmaUIKitProject.files, { type: 'uikit-components' }).key;
    try {
        // add new comment
        const newComment = await api.postComment(mainFigmaFileID, 'Hello World!', { node_id: '1:5', node_offset: { x: -225, y: -66 } });
        console.log(JSON.stringify(newComment));
        // add second comment as response to first one
        const addComment1 = await api.postComment(mainFigmaFileID, 'Hello Planet! #1', { x: -225, y: -66 }, newComment.id);
        console.log(JSON.stringify(addComment1));
        // add third comment
        const addComment2 = await api.postComment(mainFigmaFileID, 'Hello Planet! #2', { x: -225, y: -66 }, newComment.id);
        console.log(JSON.stringify(addComment2));
        // delete second comment
        const deleteComment = await api.deleteComments(mainFigmaFileID, addComment1.id);
        console.log(JSON.stringify(deleteComment));
    } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
    }
    // get all comments
    // const allComments = await api.getComments(mainFigmaFileID);
    // console.log(JSON.stringify(allComments, null, 2));
}
// testComments();

// DESIGN FILE DATA
// -------------------------------

export async function getDesignFileUIKitData() {
    // FULL COMPONENTS
    // https://www.figma.com/file/H46gRaKiX2D1ZyIkjTavpH/Current---Screens-(Design)
    // const designFigmaFileID = 'H46gRaKiX2D1ZyIkjTavpH';
    // TEST COMPONENTS
    // https://www.figma.com/file/svFmoRGCqmD8d6bKxINynF/Current---Testing-(Design)
    const designFigmaFileID = 'svFmoRGCqmD8d6bKxINynF';

    // we could emulate this call reading directly a JSON file, to avoid too many API calls
    // const uiKitData = await getUIKitData();
    // console.log(JSON.stringify(uiKitData, null, 2));

    const designFileNodes = await api.getFileNodes(designFigmaFileID, ['0:0']);
    console.log(JSON.stringify(designFileNodes, null, 2));
}
// getDesignFileUIKitData();
