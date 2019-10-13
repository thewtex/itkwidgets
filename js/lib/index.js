// Entry point for the notebook bundle containing custom model definitions.

// Export widget models and views, and the npm package version number.
const { ViewerModel, ViewerView } = require('./viewer.js');
const { LineProfilerModel, LineProfilerView } = require('./lineProfiler.js');
const { PointsSelectorModel, PointsSelectorView } = require('./pointsSelector.js');
const version = require('../package.json').version;
module.exports = {
  ViewerModel,
  ViewerView,
  LineProfilerModel,
  LineProfilerView,
  PointsSelectorModel,
  PointsSelectorView,
  version
};

module.exports = require('./index.js');
