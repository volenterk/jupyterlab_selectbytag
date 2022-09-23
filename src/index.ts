import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_runbytag extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_runbytag:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_runbytag is activated!');
  }
};

export default plugin;
