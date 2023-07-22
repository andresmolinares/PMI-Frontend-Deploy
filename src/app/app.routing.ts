import { CognitiveProcessesComponent } from './components/cognitive-processes/cognitive-processes.component';
import { ParameterComponent } from './components/admin/parameters/parameter/parameter.component';
import { ParameterTypeComponent } from './components/admin/parameters/parameter-type/parameter-type.component';
import { AppContainerComponent } from './components/containers/app-container/app-container.component';
import { DetailsPatientComponent } from './components/patients/details-patient/details-patient.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { IndexUsersComponent } from "./components/admin/users/index-user/index-users.component";
import { AdminGuard } from "./guards/admin.guard";
import { ElectroencephalogramGuard } from "./guards/electroencephalogram.guard";
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/auth/reset-password/reset-password.component";
import { IndexPatientComponent } from "./components/patients/index-patient/index-patient.component";
import { CognitiveTestsComponent } from './components/cognitive-tests/cognitive-tests.component';
import { PsychologicalTestsComponent } from './components/admin/psychological-tests/index-tests/psychological-tests.component';
import { PsychologicalProcessesComponent } from './components/admin/psychological-processes/index-processes/psychological-processes.component';
import { PsychologicalTasksComponent } from './components/admin/psychological-tasks/index-task/psychological-tasks.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReportTestComponent } from './components/admin/psychological-tests/index-tests/report-test/report-test.component';

const appRoute: Routes = [
    {
        path: '',
        data: {
            title: 'PMI'
        },
        component: WelcomeComponent
    },
    {
        path: 'login',
        data: {
            title: 'Iniciar sesión'
        },
        component: LoginComponent 
    },
    {
        path: 'register',
        data: {
            title: 'Registrarte'
        },
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        data: {
            title: '¿Olvidaste tu contraseña?'
        },
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:token',
        data: {
            title: 'Restablecer contraseña'
        },
        component: ResetPasswordComponent 
    },

    {
        path: 'PMI', 
        component: AppContainerComponent, 
        children: [
            {
                path: 'home', 
                data: { 
                    title: 'Inicio | PMI' 
                }, 
                component: HomeComponent 
            },
            {
                path: 'users', 
                data: { 
                    title: 'Usuarios | PMI' 
                }, 
                component: IndexUsersComponent, 
                canActivate: [AdminGuard] 
            },
            {
                path: 'patients', 
                data: { 
                    title: 'Pacientes | PMI' 
                }, 
                canActivate: [AdminGuard], 
                children: [
                    { 
                        path: '', 
                        data: { 
                            title: 'Pacientes | PMI' 
                        }, 
                        component: IndexPatientComponent 
                    },
                    { 
                        path: 'details-patient/:id', 
                        data: { 
                            title: 'Detalles del paciente | PMI' 
                        }, 
                        component: DetailsPatientComponent 
                    },
                ]
            },
            {
                path: 'parameter_type',
                data: {
                    title: 'Tipos de parámetro | PMI'
                },
                canActivate: [AdminGuard],
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Tipos de parámetro | PMI'
                        },
                        component: ParameterTypeComponent,
                        canActivate: [AdminGuard],
                    },
                    {
                        path: ':id/details-parameters', 
                        data: { title: 'Parámetros | PMI' }, 
                        component: ParameterComponent, 
                        canActivate: [AdminGuard] 
                    },
                ]
            },
            {
                path: 'patient/:id/cognitive-tests', 
                data: { title: 'Pruebas cognitivas | PMI' }, 
                component: CognitiveTestsComponent, 
                canActivate: [AdminGuard] 
            },
            {
                path: 'patient/:patient/cognitive-test/:test/cognitive-processes', 
                data: { title: 'Pacientes | PMI' },
                component: CognitiveProcessesComponent,
                canActivate: [AdminGuard]
            },
            { 
                path: 'tests', 
                data: { 
                    title: 'Pruebas | PMI' 
                },
                canActivate: [AdminGuard],
                children: [
                    { 
                        path: '', 
                        data: { 
                            title: 'Pruebas | PMI' 
                        },
                        canActivate: [AdminGuard],
                        component: PsychologicalTestsComponent,
                    },
                    {
                        path: ':id/details-process', 
                        data: { 
                            title: 'Procesos | PMI' 
                        },
                        canActivate: [AdminGuard],
                        children: [
                            {
                                path: '', 
                                data: { 
                                    title: 'Procesos | PMI' 
                                }, 
                                canActivate: [AdminGuard],
                                component: PsychologicalProcessesComponent,
                            },
                            {
                                path: ':id/tasks', 
                                data: { 
                                    title: 'Preguntas | PMI' 
                                }, 
                                component: PsychologicalTasksComponent,
                                canActivate: [AdminGuard] 
                            }
                        ]
                    },
                    {
                        path: ':id/report-test', 
                        data: { 
                            title: 'Reporte de prueba | PMI' 
                        },
                        canActivate: [AdminGuard],
                        component: ReportTestComponent,
                    }
                ]
            },
        ]
    },

    // { path: '**', component: Error404Component },
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);