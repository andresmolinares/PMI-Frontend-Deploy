import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { routing } from "./app.routing";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

//MODULOS ANGULAR/MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

//COMPONENTES
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SidebarComponent } from './components/containers/sidebar/sidebar.component';
import { HeaderComponent } from './components/containers/header/header.component';
import { IndexUsersComponent } from './components/admin/users/index-user/index-users.component';
import { CreateUserComponent } from './components/admin/users/create-user/create-user.component';
import { EditUserComponent } from './components/admin/users/edit-user/edit-user.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { CreatePatientComponent } from './components/patients/create-patient/create-patient.component';
import { IndexPatientComponent } from './components/patients/index-patient/index-patient.component';
import { EditPatientComponent } from './components/patients/edit-patient/edit-patient.component';
import { DetailsPatientComponent } from './components/patients/details-patient/details-patient.component';
import { AppContainerComponent } from './components/containers/app-container/app-container.component';
import { CreateParameterComponent } from './components/admin/parameters/parameter/create/create-parameter/create-parameter.component';
import { EditParameterComponent } from './components/admin/parameters/parameter/edit/edit-parameter/edit-parameter.component';
import { ParameterComponent } from './components/admin/parameters/parameter/parameter.component';
import { ParameterTypeComponent } from './components/admin/parameters/parameter-type/parameter-type.component';
import { CreateParameterTypeComponent } from './components/admin/parameters/parameter-type/create-parameter-type/create-parameter-type.component';
import { EditParameterTypeComponent } from './components/admin/parameters/parameter-type/edit-parameter-type/edit-parameter-type.component';
import { CognitiveTestsComponent } from './components/cognitive-tests/cognitive-tests.component';
import { CognitiveProcessesComponent } from './components/cognitive-processes/cognitive-processes.component';
import { PsychologicalTestsComponent } from './components/admin/psychological-tests/index-tests/psychological-tests.component';
import { EditarTestsComponent } from './components/admin/psychological-tests/edit-tests/edit-tests.component';
import { NewTestsComponent } from './components/admin/psychological-tests/new-tests/new-tests.component';
import { PsychologicalProcessesComponent } from './components/admin/psychological-processes/index-processes/psychological-processes.component';
import { EditProcessComponent } from './components/admin/psychological-processes/edit-processes/edit-process.component';
import { PsychologicalTasksComponent } from './components/admin/psychological-tasks/index-task/psychological-tasks.component';
import { EditTaskComponent } from './components/admin/psychological-tasks/edit-task/edit-task.component';
import { ProcessDescriptionComponent } from './components/cognitive-processes/process-description/process-description.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TestDescriptionComponent } from './components/cognitive-tests/cognitive-tests/test-description/test-description.component';
import { ReportTestComponent } from './components/admin/psychological-tests/index-tests/report-test/report-test.component';
import { IndexDatasetComponent } from './components/datasets/index-dataset/index-dataset.component';
import { DatasetDescriptionComponent } from './components/datasets/dataset-description/dataset-description.component';
import { EegTestsComponent } from './components/eeg-tests/eeg-tests.component';
import { MriTestsComponent } from './components/mri-tests/mri-tests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SidebarComponent,
    HeaderComponent,
    IndexUsersComponent,
    CreateUserComponent,
    EditUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CreatePatientComponent,
    IndexPatientComponent,
    EditPatientComponent,
    DetailsPatientComponent,
    AppContainerComponent,
    CreateParameterComponent,
    EditParameterComponent,
    ParameterComponent,
    ParameterTypeComponent,
    CreateParameterTypeComponent,
    EditParameterTypeComponent,
    CognitiveTestsComponent,
    CognitiveProcessesComponent,
    PsychologicalTestsComponent,
    EditarTestsComponent,
    NewTestsComponent,
    PsychologicalProcessesComponent,
    EditProcessComponent,
    PsychologicalTasksComponent,
    EditTaskComponent,
    ProcessDescriptionComponent,
    WelcomeComponent,
    TestDescriptionComponent,
    ReportTestComponent,
    IndexDatasetComponent,
    DatasetDescriptionComponent,
    EegTestsComponent,
    MriTestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    //MODULOS ANGULAR/MATERIAL
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTooltipModule,
    MatTabsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
