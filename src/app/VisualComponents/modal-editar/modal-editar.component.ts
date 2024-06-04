import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfiliadosFuncionServiceImpl } from '../../Core/Service/Implements/AfiliadosFuncionServiceImpl';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfiliadosCategoriasServiceImpl } from '../../Core/Service/Implements/AfiliadosCategoriasServiceImpl';
import { UsuarioRolServiceImpl } from '../../Core/Service/Implements/UsuarioRolServiceImpl';
import { ProvinciasServiceImpl } from '../../Core/Service/Implements/ProvinciasServiceImpl';
import { LocalidadServiceImpl } from '../../Core/Service/Implements/LocalidadServiceImpl';
import { UsuariosServiceImpl } from '../../Core/Service/Implements/UsuariosServiceImpl';
import { DeporteServiceImpl } from '../../Core/Service/Implements/DeporteServiceImpl';
import { TipoDocumentacionServiceImpl } from '../../Core/Service/Implements/TipoDocumentacionServiceImpl';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AfiliadosCategoriasDto } from '../../Core/Model/AfiliadosCategoriasDto';
import { AfiliadosFuncionDto } from '../../Core/Model/AfiliadosFuncionDto';
import { DeportesDto } from '../../Core/Model/DeportesDto';
import { FederacionDto } from '../../Core/Model/FederacionDto';
import { LocalidadDto } from '../../Core/Model/LocalidadDto';
import { ProvinciaDto } from '../../Core/Model/ProvinciaDto';
import { TipoDocumentoDto } from '../../Core/Model/TipoDocumentoDto';
import { UsuariosDto } from '../../Core/Model/UsuariosDto';
import { UsuariosRolDto } from '../../Core/Model/UsuariosRolDto';
import { FederacionServiceImpl } from '../../Core/Service/Implements/FederacionServiceImpl';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { EstadosUsuariosDto } from '../../Core/Model/EstadosUsuariosDto';
import { EstadoUsuariosServiceImpl } from '../../Core/Service/Implements/EstadoUsuariosServiceImpl';

@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [FormsModule,
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
    RouterLink ],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {



  hide: boolean = true;
  registroForm: FormGroup;
  afiliadosFunciones: AfiliadosFuncionDto[] | undefined;
  usuariosRoles: UsuariosRolDto[] | undefined;
  estadosUsuariosList: EstadosUsuariosDto[]|undefined;
  deportes: DeportesDto[] | undefined;
  categorias: AfiliadosCategoriasDto[] | undefined;
  provincias: ProvinciaDto[] | undefined;
  tiposDocumentaciones: TipoDocumentoDto[] | undefined;
  localidades: LocalidadDto[] | undefined;
  federaciones: FederacionDto[] | undefined;
  filteredLocalidades  : LocalidadDto[] | undefined;
  filteredfederacionesList: Observable<FederacionDto[]> | undefined;
  selected = '';
  selectedafiliadosCategoria = '';
  selectedLocalidad = '';
  selectedProvincia = '';
  selectedDeporte = '';
  selectedFuncion = '';
  usuarioRegistrado : UsuariosDto | undefined;
  mostrarFormulario : boolean = false;
  selectedUsuariorol = '';
  filteredDeportes :DeportesDto[] | undefined;;
  newDeporteName = '';
  opciones: string[] = ['Alejandro', 'Alexander', 'Alejandra', 'Alicia', 'Alberto'];
  formaPagosList = [{"id":1,"descripcion":"Targeta de Crédito"},{"id":2,"descripcion":"Bizum"},{"id":3,"descripcion":"Transferencia Bancaria"},{"id":4,"descripcion":"Caja"}];
  filteredOptions: Observable<string[]> | undefined ;
  selectedFormaPago = '';
  selectedSituacionActual = '';
  activo = "Activo";
  ex = "Ex";
  selectedEstadoUsuario ='';
  showPasswordFields: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
    private afiliadosFuncionService: AfiliadosFuncionServiceImpl,
    private categoriasAfiiadosService: AfiliadosCategoriasServiceImpl,
    private usuariosRolService: UsuarioRolServiceImpl,
    private provinciasService: ProvinciasServiceImpl,
    private localidadService: LocalidadServiceImpl,
    private usuariosService: UsuariosServiceImpl,
    private deportesService: DeporteServiceImpl,
    private federacionService: FederacionServiceImpl,
    private tipoDocumentacionService: TipoDocumentacionServiceImpl,
    private estadosUsuariosService: EstadoUsuariosServiceImpl,
    private http: HttpClient) {
    this.registroForm = this.formBuilder.group({
      id_user: [data.fila.id_user, [Validators.required]],
      apellidos: [data.fila.apellidos, [Validators.required]],
      nombre: [data.fila.nombre, [Validators.required]],
      documento: [data.fila.documento, [Validators.required]],
      fechaNacimiento: [data.fila.fechaNacimiento, [Validators.required]],
      tipoDocumento: [data.fila.tipoDocumento, [Validators.required]],
      direccion: [data.fila.direccion, [Validators.required]],
      codigoPostal: [data.fila.codigoPostal, [Validators.required, Validators.pattern('[0-9]*')]],
      localidad: [data.fila.localidad, [Validators.required]],
      provincia: [data.fila.provincia, [Validators.required]],
      correo: [data.fila.correo, [Validators.required, Validators.email]],
      telefono: [data.fila.telefono, [Validators.required,Validators.pattern('[0-9]*'), Validators.maxLength(9), Validators.minLength(9)]],
      deporte: [data.fila.deporte, [Validators.required]],
      afiliadosFuncion: [data.fila.afiliadosFuncion, [Validators.required]],
      afiliadosCategoria: [data.fila.afiliadosCategoria, [Validators.required]],
      federacion: [data.fila.federacion, [Validators.required]],
      password: [data.fila.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [data.fila.password, [Validators.required, Validators.minLength(6)]],
      usuariorol: ['', [Validators.required]],
      tipoPago: [data.fila.tipoPago, [Validators.required]],
      estadoCuenta: ['', [Validators.required]],
      situacionActual: [data.fila.situacionActual, [Validators.required]],
      idAfiliacion: [data.fila.idAfiliacion, [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }



  ngOnInit() {
    console.log('Valor de usuariorol:', this.data.fila.usuariorol.id);
    
    this.cargarFuncionesDeAfiliadosComboBox();
    this.cargarDeportesComboBox();
    this.cargarRolesDeUsuariosComboBox();
    this.cargarProvinciasComboBox();
    this.cargarLocalidadesComboBox();
    this.cargarCategoriasDeAfiliadosComboBox();
    this.cargarFederacionesComboBox();
    this.cargarTiposDocumentacionComboBox();
    this.cargarEstadosUsuariosComboBox();
    this.filteredDeportes = this.deportes?.slice(); 
    this.registroForm.patchValue({
      usuariorol: this.data.fila.usuariorol?.id,
      estadoCuenta: this.data.fila.estadoCuenta?.id,
    });
    this.checkRoleAndStatus();
    
  }

  checkRoleAndStatus() {
    const selectedRole = this.registroForm.get('usuariorol')?.value;
    const selectedStatus = this.registroForm.get('estadoCuenta')?.value;
     console.log("rol",selectedRole)
     console.log("estado",selectedStatus)
    // Define the IDs of the roles that should enable the password fields
    const rolesRequiringPassword: string | any[] = [2,4,6,7];
    const activeStatus = 1; // Assuming 'activo' status has ID 1

    this.showPasswordFields = rolesRequiringPassword.includes(selectedRole) && selectedStatus === activeStatus;

    if (this.showPasswordFields) {
      this.registroForm.get('password')?.enable();
      this.registroForm.get('confirmPassword')?.enable();
    } else {
      this.registroForm.get('password')?.disable();
      this.registroForm.get('confirmPassword')?.disable();
    }
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
    })
  }

  cargarEstadosUsuariosComboBox() {

    this.estadosUsuariosService.getAllEstadosUsuarios().subscribe(usuariosEstados => {
      this.estadosUsuariosList = usuariosEstados;
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
        const localidadObject = this.localidades.find(loc => loc.id === datosFormulario.localidad);
        console.info(localidadObject)
        if (localidadObject) {
          datosFormulario.localidad = localidadObject;
        }
        // Provincias
        if (typeof this.provincias !== 'undefined') {
          const provinciasObject = this.provincias.find(loc => loc.id === datosFormulario.provincia);
          console.info(provinciasObject)
          if (provinciasObject) {
            datosFormulario.provincia = provinciasObject;
          }
        }
        // Deportes
        if (typeof this.deportes !== 'undefined') {
          const deportesObject = this.deportes.find(loc => loc.id === datosFormulario.deporte);
          console.info(deportesObject)
          if (deportesObject) {
            datosFormulario.deporte = deportesObject;
          }
        }
        //tipo de Documentacion
        if (typeof this.tiposDocumentaciones!== 'undefined') {
          const tipoDocumentacionObject = this.tiposDocumentaciones.find(loc => loc.id === datosFormulario.tipoDocumento);
          console.info(tipoDocumentacionObject)
          if (tipoDocumentacionObject) {
            datosFormulario.tipoDocumento = tipoDocumentacionObject;
          }
        }
        // AfiliacionFunciones
        if (typeof this.afiliadosFunciones !== 'undefined') {
          const afiliadosFuncionObject = this.afiliadosFunciones.find(loc => loc.id === datosFormulario.afiliadosFuncion);
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
          const categoriasFuncionObject = this.categorias.find(loc => loc.id === datosFormulario.afiliadosCategoria);
          console.info(categoriasFuncionObject)
          if (categoriasFuncionObject) {
            datosFormulario.afiliadosCategoria = categoriasFuncionObject;
          }
        }
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
          const tipoDocumentoObject = this.tiposDocumentaciones.find(loc => loc.id === datosFormulario.tipoDocumento);
          console.info(tipoDocumentoObject)
          if (tipoDocumentoObject) {
            datosFormulario.tipoDocumento = tipoDocumentoObject;
          }
        }
        //Asignacion estado usuario
        if (typeof this.estadosUsuariosList !== 'undefined') {
          const estadoUsuarioObject = this.estadosUsuariosList.find(loc => loc.id === datosFormulario.estadoCuenta);
          console.info(estadoUsuarioObject)
          if (estadoUsuarioObject) {
            datosFormulario.estadoCuenta = estadoUsuarioObject;
          }
          else{
            datosFormulario.estadoCuenta = this.data.fila.estadoCuenta;
            console.info('Datos usuarioRol por defecto:',datosFormulario.estadoCuenta)
          }
        }
        //Asignacion de usuario rol 

        if (typeof this.usuariosRoles !== 'undefined') {
          const usuariosRoleObject = this.usuariosRoles.find(loc => loc.id === datosFormulario.usuariorol);
          console.info('Datos usuarioRol:',usuariosRoleObject)
          if (usuariosRoleObject) {
            datosFormulario.usuariorol = usuariosRoleObject;
          }
          else{
            datosFormulario.usuariorol = this.data.fila.usuariorol;
            console.info('Datos usuarioRol por defecto:',datosFormulario.usuariorol)
          }
        }

        //Asignacion de id_afiliacion 
        datosFormulario.idAfiliacion = this.data.fila.idAfiliacion;
        console.info('Datos idAfiliacion por defecto:',datosFormulario.idAfiliacion)
        if(datosFormulario.password === undefined){
          this.registroForm.removeControl('password');
        }
        console.info(datosFormulario)
        this.usuariosService.saveOrUpdate(datosFormulario).subscribe(
          response => {
            console.log('Datos registrados con éxito:', response);
            // Aquí puedes agregar cualquier otra lógica después de enviar los datos
           this.usuarioRegistrado = response;
            this.mostrarFormulario = true;
            console.log('Valor formulario:', this.mostrarFormulario );
          },
          error => {
            console.error('Error al registrar los datos:', error);
            // Manejo de errores
          }
        );
      }
      else {
        // El formulario no es válido, puedes mostrar un mensaje de error o realizar otra acción
        console.error('Formulario no válido. Revise los campos.');
      }
    }
  }

  onlyNumbersValidator(control: AbstractControl): { [key: string]: any } | null {
    const inputValue: string = control.value;
    if (!/^\d+$/.test(inputValue)) {
      return { 'onlyNumbers': true };
    }
    return null;
  }

  updateLocalidades(provinciaId: number) {
    this.filteredLocalidades = this.localidades?.filter(localidad => localidad.idProvincia.id === provinciaId);
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

