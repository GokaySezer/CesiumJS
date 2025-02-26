export function createModel(viewer, modelUrl, longitude, latitude, height = 0.3, attributes = {}) {
    console.log(`Loading model from: ${modelUrl}`);

    const entity = viewer.entities.add({
        name: attributes.name || "Sports Facility", // Default name if none provided
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        model: {
            uri: modelUrl,
            scale: 1,
            minimumPixelSize: 256,
            maximumScale: 500,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        },
        description: `
            <h3>${attributes.name || "Unknown"}</h3>
             <p><strong>Street Name:</strong> ${attributes.street || "Unknown"}</p>
            <p><strong>Facility Type:</strong> ${attributes.facilityType || "N/A"}</p>
            <p><strong>Sport Type:</strong> ${attributes.sportType || "N/A"}</p>
            <p><strong>Surface Type:</strong> ${attributes.surfaceType || "N/A"}</p>
            <p><strong>Lighting:</strong> ${attributes.lighting || "N/A"}</p>
            <p><strong>Noise Level:</strong> ${attributes.noiseDb || "N/A"} dB</p>
        `
    });

    return entity;
}
