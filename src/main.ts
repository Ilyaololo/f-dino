import 'core-js';
import 'reflect-metadata';

import { IWorkbench, Workbench } from 'workbench';

const workbench: IWorkbench = new Workbench();

document.addEventListener('DOMContentLoaded', workbench.prepare, {
  passive: false,
});
