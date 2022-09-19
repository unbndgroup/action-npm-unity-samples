const core = require("@actions/core");
const fs = require('fs-extra');

async function main() {
    try {

        let PackageFolderName = core.getInput('packageFolderName', { required: false }); //"Package";

        if (PackageFolderName == null || PackageFolderName == undefined || PackageFolderName == "") {
            let folders = fs.readdirSync("Packages/", { withFileTypes: true });
            let folderNames = folders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
            PackageFolderName = "Packages/" + folderNames[0];
        }
        //let PackageFolderName = "Package";
        // Get Directory of AssetsSampleFolder
        let AssetFolder = core.getInput('assetSampleFolder', { required: true }); //"Assets/Samples"; 
        //let AssetFolder = "Assets/Samples";
        if (fs.access(AssetFolder) == false) {
            console.log("Asset Sample Folder does not exist");
            return;
        }
        // Get Directory of PackageFolder
        let PackageSampleFolder = PackageFolderName + "/Samples~";

        // check if we have a package sample folder
        if (fs.access(PackageSampleFolder)) {
            fs.emptyDirSync(PackageSampleFolder);
            console.log("Package Folder Exists Clearing Content");
        } else {
            fs.mkdirSync(PackageSampleFolder);
            console.log("Package Folder Does Not Exist Creating Folder");
        }

        console.log("Copying Files From Asset Folder To Package Folder");
        fs.copySync(AssetFolder, PackageSampleFolder);

        // get all the folders in the sample package folder
        let folders = fs.readdirSync(PackageSampleFolder, { withFileTypes: true });
        // get all there names
        let folderNames = folders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

        // load the package json file
        let rawdata = fs.readFileSync(PackageFolderName + "/package.json");
        // convert to json
        let packageJSON = JSON.parse(rawdata);
        // clear sample array
        packageJSON.samples = [];

        // go through the top level folders
        folderNames.forEach(foldername => {

            // check if we have a description.txt in the sample folder
            let dscDir = PackageSampleFolder + "/" + foldername + "/description.txt";
            // add its description to the package json 
            let dsc = "This is an example of sample files of " + foldername;
            try {
                dsc = fs.readFileSync(dscDir, 'utf8');
                // dont need the description file anymore YEEET
                fs.removeSync(dscDir);
            } catch (err) {}

            console.log("Editing Package.json File with Folder Name: " + foldername);
            packageJSON.samples.push({
                displayName: foldername + " Samples",
                description: dsc,
                path: "Samples~/" + foldername,
            });


        });
        // write the package json file
        let resultJson = JSON.stringify(packageJSON, null, 2);
        // write back to folder
        fs.writeFileSync(PackageFolderName + "/package.json", resultJson);

    } catch (error) {
        core.setFailed(error.message);
        throw error;
    }
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch(e => {
            console.error(e);
            process.exit(1);
        });
}