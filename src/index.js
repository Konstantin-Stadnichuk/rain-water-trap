module.exports = function trapRainWater(elevationMap) {

  function countWaterBoxed(terrain) {
    var waterBoxes = 0;
    // current progress
    var currTerrainIdx = 0;
    
    // iterate terrain and count water boxes
    while (currTerrainIdx < terrain.length) {
      
      // current terrain array index value (elevation)
      let currTerrainElevation = terrain[currTerrainIdx];
      
      // find corresponding elevation for the current terrain elevation
      let correspondingElevationIndex = findCorrespondingElevation(currTerrainIdx, currTerrainElevation, terrain);
      let correspondingElevationValue = terrain[correspondingElevationIndex];
      
      // pick next terrain box (next array item)
      if (correspondingElevationIndex === null) {
        currTerrainIdx++;
        continue;
      }
      
      // count water boxes in between the two points
      let source = { idx: currTerrainIdx, value: currTerrainElevation };
      let target = { idx: correspondingElevationIndex, value: correspondingElevationValue };
      waterBoxes += countWaterBoxes(source, target, terrain);
      
      // go to the next terrain elevation (current corresponding)
      currTerrainIdx = correspondingElevationIndex;
    }
    // return amount of counted water boxes
    return waterBoxes;
  }

  function findCorrespondingElevation(sourceIndex, sourceElevation, terrain) {
    // no terrain elevation
    if (sourceElevation === 0) return null;
    
    // look for higher or same level terrain
    for (let i = sourceIndex + 1; i < terrain.length; i++) {
  	  if (terrain[i] >= sourceElevation) return i;
    }
    
    // look for the first lower high elevation
    var lowerHigh = 0;
    var lowerHighIndex = 0;
    for (let i = sourceIndex + 1; i < terrain.length; i++) {
      if (terrain[i] > lowerHigh) {
        lowerHigh = terrain[i];
        lowerHighIndex = i;
      }
    }
    
    let result = lowerHighIndex === 0 ? null : lowerHighIndex;
    return result;
  }


  function countWaterBoxes(source, target, terrain) {
    var result = 0,
        waterLevel = source.value > target.value ? target.value : source.value;
    
    for (let i = source.idx + 1; i < target.idx; i++) {
      result += waterLevel - terrain[i];
    }
    
    return result;
  }
  
  return countWaterBoxed(elevationMap);
}
