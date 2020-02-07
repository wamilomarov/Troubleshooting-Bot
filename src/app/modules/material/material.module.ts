import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule, MatCardModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatStepperModule,
  MatExpansionModule,
  MatTableModule,
  MatSnackBarModule, MatTooltipModule, MatProgressBarModule, MatPaginatorModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';


const MaterialModules = [
  // tslint:disable-next-line:max-line-length
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatGridListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatStepperModule,
  MatExpansionModule,
  MatTableModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatProgressBarModule,
  ScrollingModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialModule {
}
