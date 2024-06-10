import { Routes } from '@angular/router';


export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./VisualComponents/home-component/home-component.component').then((c) => c.HomeComponentComponent), 
    },
    { 
        path: 'home', 
        loadComponent: () => import('./VisualComponents/home-component/home-component.component').then((c) => c.HomeComponentComponent), 
    },
    { 
        path: 'informacion/estatutos', 
        loadComponent: () => import('./VisualComponents/estatutos/estatutos.component').then((c) => c.EstatutosComponent),  
    },
    { 
        path: 'login', 
        loadComponent: () => import('./VisualComponents/login/login.component').then((c) => c.LoginComponent),  
    },
    { 
        path: 'registro', 
        loadComponent: () => import('./VisualComponents/registro/registro.component').then((c) => c.RegistroComponentComponent),   
    },
    { 
        path: 'listausuarios', 
        loadComponent: () => import('./VisualComponents/usuarios-tabla/usuarios-tabla.component').then((c) => c.UsuariosTablaComponent),   
    }
    ,
    {
        path: 'formulario', 
        loadComponent: () => import('./VisualComponents/formulario/formulario.component').then((c) => c.FormularioComponent),   
    },
    { 
        path: 'redsys', 
        loadComponent: () => import('./VisualComponents/redsys/redsys.component').then((c) => c.RedsysComponent),   
    },
    { 
        path: 'success', 
        loadComponent: () => import('./VisualComponents/success/success.component').then((c) => c.SuccessComponent),   
    },
    { 
        path: 'failure', 
        loadComponent: () => import('./VisualComponents/failure/failure.component')  
    },
    { 
        path: 'junta', 
        loadComponent: () => import('./VisualComponents/junta-directiva/junta-directiva.component').then((c) => c.JuntaDirectivaComponent),  
    }
];
