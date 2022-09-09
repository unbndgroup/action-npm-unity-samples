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




