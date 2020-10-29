import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { DomSanitizer } from '@angular/platform-browser';



@NgModule({
  declarations: [ImageSanitizerPipe],
  exports: [ImageSanitizerPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
