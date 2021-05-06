import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the itkwidgets extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'itkwidgets:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension itkwidgets is activated!');
  }
};

export default extension;
