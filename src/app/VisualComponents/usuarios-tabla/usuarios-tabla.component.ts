import { Component } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { UsuariosDto } from '../../Core/Model/UsuariosDto';
import { UsuariosServiceImpl } from '../../Core/Service/Implements/UsuariosServiceImpl';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfiliadosFuncionDto } from '../../Core/Model/AfiliadosFuncionDto';
import { AfiliadosFuncionServiceImpl } from '../../Core/Service/Implements/AfiliadosFuncionServiceImpl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


/**
 * @title Table with pagination
 */

@Component({
  selector: 'app-usuarios-tabla',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    ModalEditarComponent,
    MatTableModule
    
    
     
  ],
  templateUrl: './usuarios-tabla.component.html',
  styleUrl: './usuarios-tabla.component.css'
})
export  class UsuariosTablaComponent implements AfterViewInit {

  displayedColumns: string[] = ['idAfiliacion','apellidos', 'nombre', 'funcion','estadoFuncion', 'categoria', 'deporte','provincia', 'estado','rolAfiliado','editar'];
  listadoUsuarios : UsuariosDto[] | undefined;
  listadoUsuariosFiltrados : UsuariosDto[] | undefined;
  dataSource = new MatTableDataSource<UsuariosDto>();

  selectedFuncion :number | undefined;
  afiliadosFunciones: AfiliadosFuncionDto[] | undefined;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private usuariosService: UsuariosServiceImpl,
    private _liveAnnouncer: LiveAnnouncer,
    private afiliadosFuncionService: AfiliadosFuncionServiceImpl ,
     private dialog: MatDialog
  ){

     // Asigna el componente de ordenamiento a la tabla
 
     // Configura el filtro para que funcione correctamente con propiedades anidadas
     this.dataSource.filterPredicate = (data: UsuariosDto, filter: string) => this.customFilterPredicate(data, filter);
   }
  
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarListadoDeUsuarios();
  }

  ngOnInit() {
    this.cargarListadoDeUsuarios();
    this.cargarFuncionesDeAfiliadosComboBox();
  }

  editarFila(element: any): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      data: { fila: element }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrada');
    });
  }

  
  filtrar(event : Event){
    const filtro = (event?.target as HTMLInputElement).value;
    console.log(event);
    this.dataSource.filter = filtro.trim().toLowerCase()  ; 
  }

  getEstadoCuentaClass(estado: number): string {
    if (estado === 3) {
      return 'table-danger'; // Si el estado es 1, devuelve la clase 'estado-rojo'
    } else if (estado === 4) {
      return 'table-warning'; // Si el estado es 2, devuelve la clase 'estado-amarillo'
    } else {
      return ''; // Si el estado no es 1 ni 2, no se aplica ninguna clase adicional
    }
  }

  cargarListadoDeUsuarios(){

    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.dataSource.data = this.listadoUsuarios;
      this.dataSource.paginator = this.paginator; // Asegúrate de actualizar el paginador después de cargar los datos
      this.dataSource.sort = this.sort; // Asegúrate de actualizar el ordenamiento después de cargar los datos
      console.log(this.listadoUsuarios);
    });
      
  }

  

  cargarFuncionesDeAfiliadosComboBox() {

    this.afiliadosFuncionService.getAfiliadosFuncion().subscribe(afiliadosRoles => {
      this.afiliadosFunciones = afiliadosRoles;
    })
  }
  

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  customFilterPredicate(data: UsuariosDto, filter: string): boolean {
    const flatData = this.flattenObject(data);
    const dataStr = Object.values(flatData).join(' ').toLowerCase();
    return dataStr.includes(filter);
  }

  flattenObject(obj: any): any {
    const result: any = {};
    
    function recurse(cur: any, prop: string) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (let i = 0; i < cur.length; i++) {
          recurse(cur[i], prop ? `${prop}[${i}]` : `${i}`);
        }
        if (cur.length === 0) {
          result[prop] = [];
        }
      } else {
        let isEmpty = true;
        for (const p in cur) {
          if (cur.hasOwnProperty(p)) {
            isEmpty = false;
            recurse(cur[p], prop ? `${prop}.${p}` : p);
          }
        }
        if (isEmpty && prop) {
          result[prop] = {};
        }
      }
    }

    recurse(obj, "");
    return result;
  }
  
}
