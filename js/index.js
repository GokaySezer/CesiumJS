// Your access token can be found at: https://ion.cesium.com/tokens.
    // Replace `your_access_token` with your Cesium ion access token.
    
import {url} from "./cesiumConfig.js";
import {sports} from "./coordinates.js";
import {createModel} from "./cesiumFunc.js";

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGJiNGU3YS05MmZlLTRlODAtOTc1Mi04YTUyMGZmZTkxZWEiLCJpZCI6MjMwOTQ3LCJpYXQiOjE3MjE5ODk5MTZ9.GcEeaQLe1yMv_aljV0jL5gD_auYwhD91hhXSpHI6v7o';

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });    

sports.features.forEach((feature) => {
    createModel (
        viewer,
        url.basketGlb,
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
        0
    );
});

    // Fly the camera to Munich Astellerstraße at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-6.307183532, 53.36816339, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      }
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    //const buildingTileset = await Cesium.createOsmBuildingsAsync();
    //viewer.scene.primitives.add(buildingTileset);   