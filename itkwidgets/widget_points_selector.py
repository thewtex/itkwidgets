"""PointsSelector class

Interactively select points in space.
"""

import numpy as np
import ipywidgets as widgets
from .widget_viewer import Viewer
from traitlets import Unicode
from ipydatawidgets import NDArray, array_serialization, shape_constraints
import itk

@widgets.register
class PointsSelector(Viewer):
    """PointsSelector widget class."""
    _view_name = Unicode('PointsSelectorView').tag(sync=True)
    _model_name = Unicode('PointsSelectorModel').tag(sync=True)
    _view_module = Unicode('itkwidgets').tag(sync=True)
    _model_module = Unicode('itkwidgets').tag(sync=True)
    _view_module_version = Unicode('^0.20.1').tag(sync=True)
    _model_module_version = Unicode('^0.20.1').tag(sync=True)
    points = NDArray(dtype=np.float64, default_value=None, allow_none=True,
                     help="First point in physical space that defines the line profile")\
        .tag(sync=True, **array_serialization)\
        .valid(shape_constraints(None, 3,))

    def __init__(self, **kwargs):
        if 'ui_collapsed' not in kwargs:
            kwargs['ui_collapsed'] = True
        if 'gradient_opacity' not in kwargs:
            kwargs['gradient_opacity'] = 0.8
        if 'slicing_planes' not in kwargs:
            kwargs['slicing_planes'] = True
        if 'points' in kwargs:
            self.points = kwargs.pop('points')
        super(PointsSelector, self).__init__(**kwargs)

def select_points(image=None, points=None, **viewer_kwargs):
    """Interactively select points from an image or geometries.

    Parameters
    ----------
    image_or_array : array_like, itk.Image, or vtk.vtkImageData, optional
        The 2D or 3D image to visualize.

    points : Nx3 numpy float64 array, optional
        Initial points

    viewer_kwargs : optional
        Keyword arguments for the viewer. See help(itkwidgets.view).

    """

    profiler = PointsSelector(image=image, points=points, **viewer_kwargs)

    return profiler
