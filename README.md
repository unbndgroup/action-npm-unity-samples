# GitHub Action - Copy Asset Samples to NPM Samples~
This GitHub Action helps edit package json file to add samples from assets

## Usage

Add this step in your workflow file
```yaml
- name: Copy Asset Samples to NPM Samples~
  uses: unbndgroup/action-npm-unity-samples
  with:
    packageFolderName: Packages/com.thisisaura.package.example
    assetSampleFolder: Assets/Samples
```
### Input Variables

- `packageFolderName`: Folder name of Package to copy into e.g `Packages/com.thisisaura.*`
- `assetSampleFolder`: Samples Folder in Unity assets folder `Assets/Samples`

## Unity
### Prequisities

+ `package.Json` file within `Packages/YOUR_PACKAGE_NAME/`
+ `Assets/Samples/YOUR_SAMPLE` folder
+ Optional `Assets/Samples/YOUR_SAMPLE/description.txt` file
+ No folder or files under the directory `Packages/YOUR_PACKAGE_NAME/Samples~`

### Usage

+ Within a unity package repo ensure the assets folder has `Samples` folder.
+ Create a new folder with the samples name under the `Assets/Samples/` folder.
+ Add any sample assets and folders into the created folder.
+ Optionally Within `Assets/Samples/YOUR_SAMPLE_FOLDER` add a txt file named `description.txt` within it place any futher information for this sample within it. 

### What Happens

+ On merge to a packages main branch before pushing to NPM a copy of the `Assets/Samples` is made and moved to `Packages/YOUR_PACKAGE_NAME/Samples~` 
+ The `Packages/YOUR_PACKAGE_NAME/package.json` is edited to include all `Packages/YOUR_PACKAGE_NAME/Samples~` subfolder directories.
+ `Packages/YOUR_PACKAGE_NAME/Samples~/YOUR_SAMPLE_FOLDER` is checked for a `description.txt` and writes the contents into the `Packages/YOUR_PACKAGE_NAME/package.json`.






