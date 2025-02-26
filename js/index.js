// Import necessary modules and functions
import { url, assetIds } from "./cesiumConfig.js";
import { sports } from "./coordinates.js";
import { createModel } from "./cesiumFunc.js";

// Set Cesium Ion Access Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NGJiNGU3YS05MmZlLTRlODAtOTc1Mi04YTUyMGZmZTkxZWEiLCJpZCI6MjMwOTQ3LCJpYXQiOjE3MjE5ODk5MTZ9.GcEeaQLe1yMv_aljV0jL5gD_auYwhD91hhXSpHI6v7o';

// Async function to initialize Cesium and load assets properly
async function initializeCesium() {
    // Initialize the Cesium Viewer with World Terrain
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain(),
    });

    try {
        const googleResource = await Cesium.IonResource.fromAssetId(assetIds.google);
        const googleTileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetIds.google);
        
        viewer.scene.primitives.add(googleTileset);
        console.log("Google Photorealistic 3D Tileset loaded successfully.");
    } catch (error) {
        console.error("Error loading Google Photorealistic Tileset:", error);
    }

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(11.5323, 48.1253, 1000),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-30.0),
        }
    });

    const kazmairstr = sports.features.find(f => f.properties.name.includes("Kazmairstr"));

    if (kazmairstr) {
        createModel(
            viewer,
            url.tennisGlb, 
            kazmairstr.geometry.coordinates[0],
            kazmairstr.geometry.coordinates[1],
            0,
            {
                name: "Heimeranplatz Sports Facility",
                street: "Kazmairstr./Astallerstraße 31",
                facilityType: "Public",
                sportType: "Tennis",
                surfaceType: "Red Clay",
                lighting: "Yes",
                noiseDb: "65"    
            }
        );
        createModel(viewer, url.basketballGlb, kazmairstr.geometry.coordinates[0] + 0.0001, kazmairstr.geometry.coordinates[1] + 0.0001, 1);
    }

    const basketballResource = await Cesium.IonResource.fromAssetId(assetIds.basketball);
    viewer.entities.add({
        name: "Basketball Court",
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0.5),
        model: {
            uri: basketballResource,
            scale: 1,
            minimumPixelSize: 256,
            maximumScale: 500,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        }
    });

    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);
}

initializeCesium();
