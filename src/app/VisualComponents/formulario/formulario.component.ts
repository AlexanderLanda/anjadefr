import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuariosDto } from '../../Core/Model/UsuariosDto';
import { DeporteServiceImpl } from '../../Core/Service/Implements/DeporteServiceImpl';
import { DeportesDto } from '../../Core/Model/DeportesDto';
import { MatRadioModule } from '@angular/material/radio';
import { CuestionarioServiceImpl } from '../../Core/Service/Implements/CuestionarioServiceImpl';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    MatDatepickerModule,
    MatCardModule,
    MatRadioModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export  class FormularioComponent implements OnInit{

  @Input() usuario: UsuariosDto | undefined;
 /* usuario = {
  "id_user": 36,
  "nombre": "ccc",
  "apellidos": "Cuestionarios Pruebas",
  "fechaNacimiento": "2024-05-09T22:00:00.000+00:00",
  "direccion": "ccc",
  "correo": "ccc@ccc.c",
  "deporte": {
    "id": 37,
    "nombre": "Bádminton"
  },
  "localidad": {
    "id": 3,
    "descripcion": "Alicante",
    "idProvincia": {
      "id": 3,
      "descripcion": "Alicante"
    }
  },
  "documento": "ccc",
  "codigoPostal": "12312",
  "provincia": {
    "id": 3,
    "descripcion": "Alicante"
  },
  "telefono": "123123123",
  "afiliadosFuncion": {
    "id": 3,
    "descripcion": "Juez(a) de mesa"
  },
  "afiliadosCategoria": {
    "id": 2,
    "descripcion": "Profesional"
  },
  "usuariorol": {
    "id": 3,
    "descripcion": "afiliados"
  },
  "estadoCuenta": {
    "id": 3,
    "estado": "pendiente de pago"
  },
  "observaciones": null,
  "password": "",
  "fechaAfiliacion": "2024-05-22T12:39:07.719+00:00",
  "federacion": "",
  "tipoPago": {
    "id": 3,
    "descripcion": "Transferencia Bancaria"
  },
  "tipoDocumento": {
    "id": 1,
    "descripcion": "DNI"
  },
  "situacionActual": "Ex"
};*/
  formularioForm: FormGroup;
  deportes: DeportesDto[] | undefined;
  selectedDeporte : any;
  selectedcolaboracion : boolean | undefined;
  idiomasLista: { id: number, descripcion: string }[] = [
    { id: 1, descripcion: 'Inglés' },
    { id: 2, descripcion: 'Alemán' },
    { id: 3, descripcion: 'Francés' },
    { id: 4, descripcion: 'Español' },
    { id: 5, descripcion: 'Italiano' },
    { id: 6, descripcion: 'Portugués' },
    { id: 7, descripcion: 'Neerlandés (Holandés)' },
    { id: 8, descripcion: 'Polaco' },
    { id: 9, descripcion: 'Sueco' },
    { id: 10, descripcion: 'Danés' },
    { id: 11, descripcion: 'Griego' },
    { id: 12, descripcion: 'Checo' },
    { id: 13, descripcion: 'Rumano' },
    { id: 14, descripcion: 'Húngaro' },
    { id: 15, descripcion: 'Finlandés' },
    { id: 16, descripcion: 'Eslovaco' },
    { id: 17, descripcion: 'Búlgaro' },
    { id: 18, descripcion: 'Croata' },
    { id: 19, descripcion: 'Esloveno' },
    { id: 20, descripcion: 'Lituano' }
  ];

  constructor(private formBuilder: FormBuilder,private deportesService: DeporteServiceImpl,
    private cuestionarioService : CuestionarioServiceImpl,
  ){
    console.log('Datos del usuario:', this.usuario);
    this.formularioForm = this.formBuilder.group({
      nombreApellidos: [this.usuario?.apellidos, [Validators.required]],//tomar de los datos de usuario
      localidad: [this.usuario?.localidad, [Validators.required]],//toar de los datos del usuario
      telefono: [this.usuario?.telefono, [Validators.required]],//tomar de los datos de usuario
      correo: [this.usuario?.correo,[Validators.required]],//tomar de los datos de usuario
      profesionLaboral: ['', [Validators.required]],
      situacionActual: ['', [Validators.required]],
      deporte: ['', [Validators.required]],//dar opcion de dado un deporte elegido , seleccione la categoria y los años de participacion 
      anosActivoCategorias: ['', [Validators.required]],//dar opcion de dado un deporte elegido , seleccione la categoria y los años de participacion
      otrasActividades: ['', [Validators.required]],
      colaborarAsociacion: ['Si', Validators.required],//buscar para guardar valor si o no 
      tipoColaboracion: new FormControl({ value: '', disabled: true }, Validators.required),//a partir del valor elegido antes, dar opcion de entrar datos de que le gustaria colaborar
      comisionColaboracion: ['', [Validators.required]],//dar opocion de elegir comisiones en las que le gustaria colaborar
      idiomas: [['Español'], Validators.required],//guardar listado de idiomas
      tiempoLibre: ['', [Validators.required]],//buscar para guardar valor si o no 
      desplazamiento: ['', [Validators.required]],//buscar para guardar valor si o no 
      delegacionColaboracion: ['', [Validators.required]],//buscar para guardar valor si o no y una descripcion de lo que quiere
      darClases: [{ value: '', disabled: true }, [Validators.required]],//buscar para guardar valor si o no y una descripcion de lo que quiere
      selectedDarClases: ['No', [Validators.required]],//buscar para guardar valor si o no 
      organizarEventosDeportivos: ['', [Validators.required]],//buscar para guardar valor si o no 
      reunionesAsociacion: ['', [Validators.required]],//buscar para guardar valor si o no 
      mediador: ['', [Validators.required]],//buscar para guardar valor si o no 
      ayudaAgresiones: ['', [Validators.required]],//buscar para guardar valor si o no 
      opinionAsociacion: ['', [Validators.required]],//buscar para guardar valor si o no 
      mejorasAsociacion: ['', [Validators.required]],
      idAfiliacion: ['', [Validators.required]],
      usuarioDto: [this.usuario],
      
      
    });
  }

  ngOnInit() {
    this.cargarDeportesComboBox();
    //Habilitación de ccomponent de colaboración
    this.formularioForm.get('colaborarAsociacion')?.valueChanges.subscribe(value => {
      if (value === "true") {
        this.formularioForm.get('tipoColaboracion')?.enable(); // Habilita el campo
      } else {
        this.formularioForm.get('tipoColaboracion')?.disable(); // Deshabilita el campo
      }
    });
    //Habilitación de ccomponent de dar clases
    this.formularioForm.get('selectedDarClases')?.valueChanges.subscribe(value => {
      if (value === "true") {
        this.formularioForm.get('darClases')?.enable(); // Habilita el campo
      } else {
        this.formularioForm.get('darClases')?.disable(); // Deshabilita el campo
      }
    });
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      console.log('Usuario recibido:', this.usuario);
    }
  }

  cargarDeportesComboBox() {

    this.deportesService.getDeportes().subscribe(deportes => {
      this.deportes = deportes;
    })
  }
  onRegistrarFormulario() {
    const datosFormulario = this.formularioForm.value;
    datosFormulario.usuarioDto = this.usuario;
    console.info('Datos usuario de cuestionario:',datosFormulario.usuarioDto)
    console.info('Datos a registrar:',datosFormulario)
    this.cuestionarioService.saveOrUpdate(datosFormulario).subscribe(
      response => {
        console.log('Datos registrados con éxito:', response);
        // Aquí puedes agregar cualquier otra lógica después de enviar los datos
      },
      error => {
        console.error('Error al registrar los datos:', error);
        alert('Debe introducir su número de afiliación para poder enviar su cuestionario. Si no le encuetra, dirijase a su correo de bienvenida. Muchas Gracias');
        // Manejo de errores
      }
    );
  }
}
