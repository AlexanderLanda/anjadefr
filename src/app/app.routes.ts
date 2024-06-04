import { Routes } from '@angular/router';


export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./VisualComponents/home-component/home-component.component') 
    },
    { 
        path: 'home', 
        loadComponent: () => import('./VisualComponents/home-component/home-component.component') 
    },
    { 
        path: 'informacion/estatutos', 
        loadComponent: () => import('./VisualComponents/estatutos/estatutos.component') 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./VisualComponents/login/login.component') 
    },
    { 
        path: 'registro', 
        loadComponent: () => import('./VisualComponents/registro/registro.component')  
    },
    { 
        path: 'listausuarios', 
        loadComponent: () => import('./VisualComponents/usuarios-tabla/usuarios-tabla.component')  
    }
    ,
   /*{
        path: 'formulario', 
        loadComponent: () => import('./VisualComponents/formulario/formulario.component')  
    },*/
    { 
        path: 'redsys', 
        loadComponent: () => import('./VisualComponents/redsys/redsys.component')  
    },
    { 
        path: 'success', 
        loadComponent: () => import('./VisualComponents/success/success.component')  
    },
    { 
        path: 'failure', 
        loadComponent: () => import('./VisualComponents/failure/failure.component')  
    }
];
