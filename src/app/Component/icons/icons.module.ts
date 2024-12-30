import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, ChevronRight, ChevronDown, Edit, Trash2, Activity } from 'angular-feather/icons';

const icons = {
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Activity
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
