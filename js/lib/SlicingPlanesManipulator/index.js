import macro from 'vtk.js/Sources/macro';
import vtkPlane from 'vtk.js/Sources/Common/DataModel/Plane';

export function intersectDisplayWithPlane(
  x,
  y,
  planeOrigin,
  planeNormal,
  renderer,
  glRenderWindow
) {
  const near = glRenderWindow.displayToWorld(x, y, 0, renderer);
  const far = glRenderWindow.displayToWorld(x, y, 1, renderer);

  return vtkPlane.intersectWithLine(near, far, planeOrigin, planeNormal).x;
}

// ----------------------------------------------------------------------------
// vtkSlicingPlanesManipulator methods
// ----------------------------------------------------------------------------

function vtkSlicingPlanesManipulator(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkSlicingPlanesManipulator');

  // --------------------------------------------------------------------------

  publicAPI.handleEvent = (callData, glRenderWindow) => {
    if (callData.type === "MouseMove") {
      return intersectDisplayWithPlane(
        callData.position.x,
        callData.position.y,
        model.origin,
        model.normal,
        callData.pokedRenderer,
        glRenderWindow
      );
    } else {
      const renderPosition = callData.position;
      model.picker.pick(
        [renderPosition.x, renderPosition.y, 0.0],
        callData.pokedRenderer
      );
      const worldPositions = model.picker.getPickedPositions();
      if (worldPositions.length > 0) {
        return worldPositions[0]
      } else {
        return null
      }
    }
  }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  normal: [0, 0, 1],
  origin: [0, 0, 0],
  picker: null
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);
  macro.obj(publicAPI, model);
  macro.setGetArray(publicAPI, model, ['normal', 'origin'], 3);
  macro.setGet(publicAPI, model, ['picker']);

  vtkSlicingPlanesManipulator(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkSlicingPlanesManipulator');

// ----------------------------------------------------------------------------

export default { intersectDisplayWithPlane, extend, newInstance };
