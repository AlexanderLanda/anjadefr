import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AfiliadosFuncionDto } from '../../Core/Model/AfiliadosFuncionDto';
import { AfiliadosFuncionServiceImpl } from '../../Core/Service/Implements/AfiliadosFuncionServiceImpl';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioRolServiceImpl } from '../../Core/Service/Implements/UsuarioRolServiceImpl';
import { DeporteServiceImpl } from '../../Core/Service/Implements/DeporteServiceImpl';
import { UsuariosDto } from '../../Core/Model/UsuariosDto';
import { DeportesDto } from '../../Core/Model/DeportesDto';
import { UsuariosRolDto } from '../../Core/Model/UsuariosRolDto';
import { AfiliadosCategoriasDto } from '../../Core/Model/AfiliadosCategoriasDto';
import { ProvinciaDto } from '../../Core/Model/ProvinciaDto';
import { LocalidadDto } from '../../Core/Model/LocalidadDto';
import { ProvinciasServiceImpl } from '../../Core/Service/Implements/ProvinciasServiceImpl';
import { LocalidadServiceImpl } from '../../Core/Service/Implements/LocalidadServiceImpl';
import { AfiliadosCategoriasServiceImpl } from '../../Core/Service/Implements/AfiliadosCategoriasServiceImpl';
import { UsuariosServiceImpl } from '../../Core/Service/Implements/UsuariosServiceImpl';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FederacionDto } from '../../Core/Model/FederacionDto';
import { FederacionServiceImpl } from '../../Core/Service/Implements/FederacionServiceImpl';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { TipoDocumentoDto } from '../../Core/Model/TipoDocumentoDto';
import { TipoDocumentacionServiceImpl } from '../../Core/Service/Implements/TipoDocumentacionServiceImpl';
//import { FormularioComponent } from "../formulario/formulario.component";
import { PaymentService } from '../../Core/Service/PaymentService';
import { FormularioComponent } from "../formulario/formulario.component";
import { OriginInterceptor } from '../../Core/OriginInterceptor';




@Component({
    selector: 'app-registro',
    standalone: true,
    templateUrl: './registro.component.html',
    styleUrl: './registro.component.css',
    imports: [
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        CommonModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        HttpClientModule,
        MatDatepickerModule,
        MatIconModule,
        MatAutocompleteModule,
        MatRadioModule,
        RouterLink,
        FormularioComponent,
        
    ],providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: OriginInterceptor,
        multi: true,
      },
    ],
})
export  class RegistroComponentComponent {

  
  hide: boolean = true;
  registroForm: FormGroup;
  afiliadosFunciones: AfiliadosFuncionDto[] | undefined;
  usuariosRoles: UsuariosRolDto[] | undefined;
  deportes: DeportesDto[] | undefined;
  categorias: AfiliadosCategoriasDto[] | undefined;
  provincias: ProvinciaDto[] | undefined;
  tiposDocumentaciones = [
    { id: 1, descripcion: 'DNI' },
    { id: 2, descripcion: 'NIE' },
    { id: 3, descripcion: 'Pasaporte' }
  ];
  localidades: LocalidadDto[] | undefined;
  federaciones: FederacionDto[] | undefined;
  filteredLocalidades  : LocalidadDto[] | undefined;
  filteredfederacionesList: Observable<FederacionDto[]> | undefined;
  selected = '';
  selectedafiliadosCategoria = '';
  selectedTipoDocumento = '';
  selectedLocalidad = '';
  selectedProvincia = '';
  selectedDeporte = '';
  selectedFuncion = '';
  usuarioRegistrado : UsuariosDto | undefined;
  mostrarFormulario : boolean = false;
  selectedUsuariorol = '';
  filteredDeportes :DeportesDto[] | undefined;
  afiliadosCategoria: FormControl<any> | undefined;
;
  newDeporteName = '';
  opciones: string[] = ['Alejandro', 'Alexander', 'Alejandra', 'Alicia', 'Alberto'];
  formaPagosList = [{"id":1,"descripcion":"Targeta de Crédito"},{"id":2,"descripcion":"Bizum"},{"id":3,"descripcion":"Transferencia Bancaria"},{"id":4,"descripcion":"Caja"}];
  filteredOptions: Observable<string[]> | undefined ;
  selectedFormaPago = '';
  selectedSituacionActual = '';
  activo = "Activo";
  ex = "Ex";
  usuario = {
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
  };

  constructor(private formBuilder: FormBuilder,private paymentService: PaymentService,
    private afiliadosFuncionService: AfiliadosFuncionServiceImpl,
    private categoriasAfiiadosService: AfiliadosCategoriasServiceImpl,
    private usuariosRolService: UsuarioRolServiceImpl,
    private provinciasService: ProvinciasServiceImpl,
    private localidadService: LocalidadServiceImpl,
    private usuariosService: UsuariosServiceImpl,
    private deportesService: DeporteServiceImpl,
    private federacionService: FederacionServiceImpl,
    private tipoDocumentacionService: TipoDocumentacionServiceImpl,
    private http: HttpClient) {
    this.registroForm = this.formBuilder.group({
      apellidos: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      tipoDocumento: [this.tiposDocumentaciones[0].id],
      direccion: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern('[0-9]*'), this.onlyNumbersValidator]],
      localidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required,Validators.pattern('[0-9]*'), this.onlyNumbersValidator, Validators.maxLength(9), Validators.minLength(9)]],
      deporte: ['', [Validators.required]],
      afiliadosFuncion: ['', [Validators.required]],
      afiliadosCategoria: ['', [Validators.required]],
      federacion: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      usuariorol: ['', [Validators.required]],
      tipoPago: ['', [Validators.required]],
      situacionActual: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });

    this.registroForm.get('tipoPago')?.valueChanges.subscribe(value => {
      this.selectedFormaPago = value;
      console.log(this.selectedFormaPago)
    });
  }



  ngOnInit() {
    this.cargarFuncionesDeAfiliadosComboBox();
    this.cargarDeportesComboBox();
    this.cargarRolesDeUsuariosComboBox();
    this.cargarProvinciasComboBox();
    this.cargarLocalidadesComboBox();
    this.cargarCategoriasDeAfiliadosComboBox();
    this.cargarFederacionesComboBox();
    this.cargarTiposDocumentacionComboBox();
    this.filteredDeportes = this.deportes?.slice(); 

  }

  
  searchDeporte = (text: string) => {
    return this.deportes?.filter(deporte => deporte.nombre.toLowerCase().includes(text.toLowerCase()));
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  cargarFuncionesDeAfiliadosComboBox() {

    this.afiliadosFuncionService.getAfiliadosFuncion().subscribe(afiliadosRoles => {
      this.afiliadosFunciones = afiliadosRoles;
      console.log(afiliadosRoles);
    })
  }

  cargarCategoriasDeAfiliadosComboBox() {

    this.categoriasAfiiadosService.getAfiliadosCategorias().subscribe(afiliadosCategorias => {
      this.categorias = afiliadosCategorias;
    })
  }

  cargarRolesDeUsuariosComboBox() {

    this.usuariosRolService.getUsuariosRoles().subscribe(usuariosRoles => {
      this.usuariosRoles = usuariosRoles;
    })
  }

  cargarDeportesComboBox() {

    this.deportesService.getDeportes().subscribe(deportes => {
      this.deportes = deportes;
    })
  }

  cargarProvinciasComboBox() {

    this.provinciasService.getProvincias().subscribe(provincias => {
      this.provincias = provincias;
    })
  }

  cargarTiposDocumentacionComboBox() {

    this.tipoDocumentacionService.getTipoDocumentacion().subscribe(tiposDocumentaciones => {
      this.tiposDocumentaciones = tiposDocumentaciones;
    })
  }

  cargarLocalidadesComboBox() {

    this.localidadService.getLocalidades().subscribe(localidades => {
      this.localidades = localidades;
    })
  }

  cargarFederacionesComboBox() {

    this.federacionService.getFederaciones().subscribe(federaciones => {
      this.federaciones = federaciones;
    })
  }

  onRegistro() {
    if (!this.registroForm.valid) {

      this.registroForm.removeControl('confirmPassword');
      const datosFormulario = this.registroForm.value;
      // Llamar al servicio de la API para enviar los datos
      console.info(datosFormulario)
      // Setteo de los datos de los oject foraneos de usuarios
      // Localidades
      if (typeof this.localidades !== 'undefined') {
        const localidadObject = this.localidades.find(loc => loc.id === Number(datosFormulario.localidad));
        console.info(localidadObject)
        if (localidadObject) {
          datosFormulario.localidad = localidadObject;
        }
      }
      // Provincias
      if (typeof this.provincias !== 'undefined') {
        const provinciasObject = this.provincias.find(loc => loc.id === Number(datosFormulario.provincia));
        console.info(provinciasObject)
        if (provinciasObject) {
          datosFormulario.provincia = provinciasObject;
        }
      }
      // Deportes
      if (typeof this.deportes !== 'undefined') {
        const deportesObject = this.deportes.find(loc => loc.id === Number(datosFormulario.deporte));
        console.info(deportesObject)
        if (deportesObject) {
          datosFormulario.deporte = deportesObject;
        }
      }
      //tipo de Documentacion
      if (typeof this.tiposDocumentaciones !== 'undefined') {
        const tipoDocumentacionObject = this.tiposDocumentaciones.find(loc => loc.id === datosFormulario.tipoDocumento);
        console.info(tipoDocumentacionObject)
        if (tipoDocumentacionObject) {
          datosFormulario.tipoDocumento = tipoDocumentacionObject;
        }
      }
      // AfiliacionFunciones
      if (typeof this.afiliadosFunciones !== 'undefined') {
        const afiliadosFuncionObject = this.afiliadosFunciones.find(loc => loc.id === Number(datosFormulario.afiliadosFuncion));
        console.info(afiliadosFuncionObject)
        if (afiliadosFuncionObject) {
          datosFormulario.afiliadosFuncion = afiliadosFuncionObject;
        }
      }
      // forma pago
      if (typeof this.formaPagosList !== 'undefined') {
        const formaPagoObject = this.formaPagosList.find(loc => loc.id === datosFormulario.tipoPago);
        console.info(formaPagoObject)
        if (formaPagoObject) {
          datosFormulario.tipoPago = formaPagoObject;
        }
      }
      // AfiliacionCategorias
      if (typeof this.categorias !== 'undefined') {
        const categoriasFuncionObject = this.categorias.find(loc => loc.id === Number(datosFormulario.afiliadosCategoria));
        console.info(categoriasFuncionObject)
        if (categoriasFuncionObject) {
          datosFormulario.afiliadosCategoria = categoriasFuncionObject;
        }
      }
      //Asignacion por defecto de rol de Afiiado
      datosFormulario.usuariorol = { id: "3", descripcion: "afiliados" };
      //asigancion de tipo de pago
      if (typeof this.formaPagosList !== 'undefined') {
        const tipoPagoObject = this.formaPagosList.find(loc => loc.id === datosFormulario.tipoPago);
        console.info(tipoPagoObject)
        if (tipoPagoObject) {
          datosFormulario.tipoPago = tipoPagoObject;
        }
      }

      //asigancion de tipo de documento
      if (typeof this.tiposDocumentaciones !== 'undefined') {
        const tipoDocumentoObject = this.tiposDocumentaciones.find(loc => loc.id === Number(datosFormulario.tipoDocumento));
        console.info(tipoDocumentoObject)
        if (tipoDocumentoObject) {
          datosFormulario.tipoDocumento = tipoDocumentoObject;
        }
      }


      console.info(datosFormulario)
      this.usuariosService.saveOrUpdate(datosFormulario).subscribe(
        response => {
          console.log('Datos registrados con éxito:', response);
          // Aquí puedes agregar cualquier otra lógica después de enviar los datos
          this.usuarioRegistrado = response;
          this.usuariosService.setUsuario(response);
          if(datosFormulario.tipoPago.id===1||datosFormulario.tipoPago.id===2){
            //PAGO POR TARGETA DE CREDITO O BIZUM
            this.paymentService.pay(datosFormulario.tipoPago.id,response.idAfiliacion);
          }
          else{
            this.mostrarFormulario = true;
          }
        },
        error => {
          console.error('Error al registrar los datos:', error);
          alert('Debe completar todos los datos de caracter obligatorios(*)');
          // Manejo de errores
        }
      );
    }
    else {
      // El formulario no es válido, puedes mostrar un mensaje de error o realizar otra acción
      console.error('Formulario no válido. Revise los campos.');
      alert('Error');
        
    }
  }


  

  onlyNumbersValidator(control: AbstractControl): { [key: string]: any } | null {
    const inputValue: string = control.value;
    if (!/^\d+$/.test(inputValue)) {
      return { 'onlyNumbers': true };
    }
    return null;
  }

  updateLocalidades() {
    console.log("SELECCION PROVINCIA: ",this.registroForm.value.afiliadosCategoria)
    //this.registroForm.value.localidad.id=this.registroForm.value.provincia.id
    const provinciaId = Number(this.registroForm.value.provincia); // Convertir el valor a número
    this.filteredLocalidades = this.localidades?.filter(loc => loc.id === provinciaId);
        console.info("Localidad",this.filteredLocalidades)
        /*
    this.filteredLocalidades = this.localidades?.find(localidad => {
      localidad.idProvincia.id === this.registroForm.value.provincia.id
    });*/
    
  }

  

  filterDeportes(value: string) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filteredDeportes = this.deportes?.filter(option => option.nombre.toLowerCase().includes(filterValue));
    } else {
      this.filteredDeportes = this.deportes?.slice(); // Si no hay valor, muestra todos los deportes
    }
  }

  realizarPago() {
    const datosPago = {
      Ds_Merchant_MerchantCode: '363273228',
      Ds_Merchant_Terminal: '1',
      Ds_Merchant_Currency: '978',
      Ds_Merchant_Amount: '1000', // Monto del pago en céntimos (en este caso 10 euros)
      Ds_Merchant_Order: this.generarNumeroPedido()
    };

    // Enviar los datos al servidor para procesar el pago
    this.http.post<string>('http://localhost:8080/procesar_pago', datosPago)
      .subscribe(
        (redirectUrl) => {
          // Redirigir al formulario de pago de Redsys
          window.location.href = redirectUrl;
        },
        (error) => {
          console.error('Error al procesar el pago:', error);
        }
      );
  }

  generarNumeroPedido(): string {
    // Generar un número de pedido único
    return 'PEDIDO_' + Math.random().toString(36).substr(2, 9);
  }

}



