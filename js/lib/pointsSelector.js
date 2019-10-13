import vtkWidgetManager from 'vtk.js/Sources/Widgets/Core/WidgetManager'
import macro from 'vtk.js/Sources/macro'

const viewer = require('./viewer')
const widgets = require('@jupyter-widgets/base')
import {
    simplearray_serialization,
} from "jupyter-dataserializers"

import SelectPointsWidget from './SelectPointsWidget'


const PointsSelectorModel = viewer.ViewerModel.extend({
  defaults: function() {
    return Object.assign(viewer.ViewerModel.prototype.defaults(), {
      _model_name: 'PointsSelectorModel',
      _view_name: 'PointsSelectorView',
      _model_module: 'itkwidgets',
      _view_module: 'itkwidgets',
      _model_module_version: '0.20.1',
      _view_module_version: '0.20.1',
      points: new Float64Array([0.0, 0.0, 0.0]),
    })
  }}, {
  serializers: Object.assign({
    points: simplearray_serialization,
  }, widgets.DOMWidgetModel.serializers) }
)


// Custom View. Renders the widget model.
const PointsSelectorView = viewer.ViewerView.extend({
  initialize_viewer: function() {
    this.initialize_itkVtkViewer()

    const viewProxy = this.model.itkVtkViewer.getViewProxy()
    const renderer = viewProxy.getRenderer()
    const picker = viewProxy.getAnnotationPicker()
    console.log(viewProxy)

    const widgetManager = vtkWidgetManager.newInstance()
    widgetManager.setRenderer(renderer);

    const widget = SelectPointsWidget.newInstance()
    const rendererBounds = renderer.computeVisiblePropBounds()
    widget.placeWidget(rendererBounds);
    const manipulator = widget.getManipulator()
    manipulator.setPicker(picker)
    console.log(widget)

    const viewWidget = widgetManager.addWidget(widget)
    console.log(viewWidget)
    //widgetManager.enablePicking()
    widgetManager.grabFocus(widget)

    //this.model.lineWidget = lineWidget
    //lineWidget.setInteractor(viewProxy.getInteractor())
    //lineWidget.setEnabled(1)
    //const selectInitialPoints = this.model.get('_select_initial_points')
    //if (selectInitialPoints) {
      //lineWidget.setWidgetStateToStart()
    //} else {
      //lineWidget.setWidgetStateToManipulate()
    //}
    //this.model.on('change:points', this.points_changed, this)
    //const volumeRepresentation = viewProxy.getRepresentations()[0]
    //const lineRepresentation = lineWidget.getWidgetRep()
    //this.model.lineRepresentation = lineRepresentation
    //const initialPoint1Position = this.model.get('point1')
    //lineRepresentation.setPoint1WorldPosition(Array.from(initialPoint1Position));
    //const initialPoint2Position = this.model.get('point2')
    //lineRepresentation.setPoint2WorldPosition(Array.from(initialPoint2Position));
    //const lineActor = lineRepresentation.getActors()[2]
    //const lineMapper = lineActor.getMapper()
    //this.model.renderWindow = renderWindow
    //lineMapper.setRelativeCoincidentTopologyLineOffsetParameters(-4, -4)
    //lineMapper.setResolveCoincidentTopology(true)
    //const onInteractionEvent = () => {
      //const mode = viewProxy.getViewMode()
      //const point1Position = lineRepresentation.getPoint1WorldPosition()
      //const point2Position = lineRepresentation.getPoint2WorldPosition()
      //switch (mode) {
      //case 'XPlane':
        //// Offset so it is visible
        //const xPosition = volumeRepresentation.getXSlice() + 0.0 * volumeRepresentation.getPropertyDomainByName('xSlice').step
        //if (point1Position[0] !== xPosition) {
          //point1Position[0] = xPosition
          //lineRepresentation.setPoint1WorldPosition(point1Position)
        //}
        //if (point2Position[0] !== xPosition) {
          //point2Position[0] = xPosition
          //lineRepresentation.setPoint2WorldPosition(point2Position)
        //}
        //renderWindow.render()
        //break;
      //case 'YPlane':
        //const yPosition = volumeRepresentation.getYSlice() + 0.0 * volumeRepresentation.getPropertyDomainByName('ySlice').step
        //if (point1Position[1] !== yPosition) {
          //point1Position[1] = yPosition
          //lineRepresentation.setPoint1WorldPosition(point1Position)
        //}
        //if (point2Position[1] !== yPosition) {
          //point2Position[1] = yPosition
          //lineRepresentation.setPoint2WorldPosition(point2Position)
        //}
        //renderWindow.render()
        //break;
      //case 'ZPlane':
        //const zPosition = volumeRepresentation.getZSlice() + 0.0 * volumeRepresentation.getPropertyDomainByName('zSlice').step
        //if (point1Position[2] !== zPosition) {
          //point1Position[2] = zPosition
          //lineRepresentation.setPoint1WorldPosition(point1Position)
        //}
        //if (point2Position[2] !== zPosition) {
          //point2Position[2] = zPosition
          //lineRepresentation.setPoint2WorldPosition(point2Position)
        //}
        //renderWindow.render()
        //break;
      //case 'VolumeRendering':
        //break;
      //default:
        //vtkErrorMacro('Unexpected view mode');
      //}
      //this.model.set('points', new Float64Array(point1Position))
      //this.model.set('point2', new Float64Array(point2Position))
      //this.model.save_changes()
    //}
    //const debouncedOnInteractionEvent = macro.debounce(onInteractionEvent, 200);
    //lineWidget.onInteractionEvent(debouncedOnInteractionEvent)
    //this.model.itkVtkViewer.subscribeViewModeChanged(debouncedOnInteractionEvent)
    //this.model.itkVtkViewer.subscribeXSliceChanged(debouncedOnInteractionEvent)
    //this.model.itkVtkViewer.subscribeYSliceChanged(debouncedOnInteractionEvent)
    //this.model.itkVtkViewer.subscribeZSliceChanged(debouncedOnInteractionEvent)
  },

  points_changed: function() {
    const modelPoint1Position = Array.from(this.model.get('point1'))
    const representationPoint1Position = this.model.lineRepresentation.getPoint1WorldPosition()
    if (!_.isEqual(modelPoint1Position, representationPoint1Position)) {
      this.model.lineRepresentation.setPoint1WorldPosition(modelPoint1Position)
      this.model.renderWindow.render()
    }
  },

});


module.exports = {
  PointsSelectorModel,
  PointsSelectorView
};
