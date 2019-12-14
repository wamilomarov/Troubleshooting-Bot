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
  MatSnackBarModule
} from '@angular/material';


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
  MatSnackBarModule
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialModule {
}
