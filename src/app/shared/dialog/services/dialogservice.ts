import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';


export interface DialogConfig {
  type: 'success' | 'error' | 'warning' | 'info' | 'confirm';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  duration?: number; // Para notificaciones auto-cerradas (ms)
}

export interface DialogResult {
  confirmed: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class Dialogservice {
  private dialogSubject = new Subject<DialogConfig>();
  private resultSubject = new Subject<DialogResult>();

  dialog$ = this.dialogSubject.asObservable();
  result$ = this.resultSubject.asObservable();

  constructor(private ngZone:NgZone){}

  // ========== MÉTODOS DE CONFIRMACIÓN ==========

  /* confirm(title: string, message: string, confirmText = 'Confirmar', cancelText = 'Cancelar'): Promise<boolean> {
    return new Promise((resolve) => {
      // ✅ Ejecutar dentro de NgZone para asegurar detección de cambios
      this.ngZone.run(() => {
        this.dialogSubject.next({
          type: 'confirm',
          title,
          message,
          confirmText,
          cancelText
        });
      });

      const subscription = this.result$.subscribe((result) => {
        // ✅ Resolver dentro de NgZone
        this.ngZone.run(() => {
          resolve(result.confirmed);
        });
        subscription.unsubscribe();
      });
    });
  }

  // ========== MÉTODOS DE NOTIFICACIÓN ==========

  success(title: string, message: string, duration = 3000): void {
    this.ngZone.run(() => {
      this.dialogSubject.next({
        type: 'success',
        title,
        message,
        duration
      });
    });
  }

  error(title: string, message: string, duration = 4000): void {
    this.ngZone.run(() => {
      this.dialogSubject.next({
        type: 'error',
        title,
        message,
        duration
      });
    });
  }

  warning(title: string, message: string, duration = 3500): void {
    this.ngZone.run(() => {
      this.dialogSubject.next({
        type: 'warning',
        title,
        message,
        duration
      });
    });
  }

  info(title: string, message: string, duration = 3000): void {
    this.ngZone.run(() => {
      this.dialogSubject.next({
        type: 'info',
        title,
        message,
        duration
      });
    });
  }

  // ========== MÉTODO INTERNO PARA RESPUESTA ==========

  sendResult(confirmed: boolean): void {
    this.ngZone.run(() => {
      this.resultSubject.next({ confirmed });
    });
  } */

    confirm(title: string, message: string, confirmText = 'Confirmar', cancelText = 'Cancelar'): Promise<boolean> {
    return new Promise((resolve) => {
      // ✅ setTimeout + NgZone evita ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.ngZone.run(() => {
          this.dialogSubject.next({
            type: 'confirm',
            title,
            message,
            confirmText,
            cancelText
          });
        });
      }, 0);

      const subscription = this.result$.subscribe((result) => {
        resolve(result.confirmed);
        subscription.unsubscribe();
      });
    });
  }

  // ========== MÉTODOS DE NOTIFICACIÓN ==========

  success(title: string, message: string, duration = 3000): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dialogSubject.next({
          type: 'success',
          title,
          message,
          duration
        });
      });
    }, 0);
  }

  error(title: string, message: string, duration = 4000): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dialogSubject.next({
          type: 'error',
          title,
          message,
          duration
        });
      });
    }, 0);
  }

  warning(title: string, message: string, duration = 3500): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dialogSubject.next({
          type: 'warning',
          title,
          message,
          duration
        });
      });
    }, 0);
  }

  info(title: string, message: string, duration = 3000): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dialogSubject.next({
          type: 'info',
          title,
          message,
          duration
        });
      });
    }, 0);
  }

  // ========== MÉTODO INTERNO PARA RESPUESTA ==========

  sendResult(confirmed: boolean): void {
    this.resultSubject.next({ confirmed });
  }


  // ========== MENSAJES PRE-CONFIGURADOS ==========

  // USUARIOS
  usuarioCreado(): void {
    this.success('¡Usuario Creado!', 'El usuario ha sido registrado exitosamente en el sistema.');
  }

  usuarioActualizado(): void {
    this.success('¡Usuario Actualizado!', 'Los cambios han sido guardados correctamente.');
  }

  usuarioEliminado(): void {
    this.success('¡Usuario Eliminado!', 'El usuario ha sido eliminado del sistema.');
  }

  usuarioActivado(): void {
    this.success('¡Usuario Activado!', 'La cuenta del usuario ha sido activada.');
  }

  usuarioDesactivado(): void {
    this.warning('Usuario Desactivado', 'La cuenta del usuario ha sido desactivada.');
  }

  confirmDeleteUsuario(nombreCompleto: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Usuario?',
      `¿Estás seguro de eliminar a "${nombreCompleto}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleUsuario(nombreCompleto: string, activar: boolean): Promise<boolean> {
    const action = activar ? 'activar' : 'desactivar';
    return this.confirm(
      `¿${activar ? 'Activar' : 'Desactivar'} Usuario?`,
      `¿Estás seguro de ${action} la cuenta de "${nombreCompleto}"?`,
      `Sí, ${activar ? 'Activar' : 'Desactivar'}`,
      'Cancelar'
    );
  }

  // DOCUMENTOS
  documentoCreado(): void {
    this.success('¡Documento Creado!', 'El documento ha sido subido exitosamente.');
  }

  documentoActualizado(): void {
    this.success('¡Documento Actualizado!', 'Los cambios en el documento han sido guardados.');
  }

  documentoEliminado(): void {
    this.success('¡Documento Eliminado!', 'El documento ha sido eliminado del sistema.');
  }

  documentoPublicado(): void {
    this.success('¡Documento Publicado!', 'El documento ahora es visible públicamente.');
  }

  documentoOculto(): void {
    this.warning('Documento Oculto', 'El documento ha sido ocultado del público.');
  }

  confirmDeleteDocumento(nombreDoc: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Documento?',
      `¿Estás seguro de eliminar "${nombreDoc}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleDocumento(nombreDoc: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Documento?`,
      `¿Estás seguro de ${action} "${nombreDoc}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }


  //Horario

   horarioCreado(): void {
    this.success('¡Horario Creado!', 'El horario ha sido creado exitosamente.');
  }

  horarioActualizado(): void {
    this.success('¡Horario Actualizado!', 'Los cambios en el horario han sido guardados.');
  }

  horarioEliminado(): void {
    this.success('¡Horario Eliminado!', 'El horario ha sido eliminado del sistema.');
  }

  horarioPublicado(): void {
    this.success('¡Horario Publicado!', 'El horario ahora es visible públicamente.');
  }

  horarioOculto(): void {
    this.warning('Horaio Oculto', 'El horario ha sido ocultado del público.');
  }

  confirmDeletehorario(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Horaio?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmTogglehorario(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Horario?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }



  // COMUNICADOS
  comunicadoCreado(): void {
    this.success('¡Comunicado Creado!', 'El comunicado ha sido creado exitosamente.');
  }

  comunicadoActualizado(): void {
    this.success('¡Comunicado Actualizado!', 'Los cambios en el comunicado han sido guardados.');
  }

  comunicadoEliminado(): void {
    this.success('¡Comunicado Eliminado!', 'El comunicado ha sido eliminado del sistema.');
  }

  comunicadoPublicado(): void {
    this.success('¡Comunicado Publicado!', 'El comunicado ahora es visible públicamente.');
  }

  comunicadoOculto(): void {
    this.warning('Comunicado Oculto', 'El comunicado ha sido ocultado del público.');
  }

  confirmDeleteComunicado(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Comunicado?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleComunicado(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Comunicado?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  // ESCUELAS
  escuelaCreada(): void {
    this.success('¡Escuela Creada!', 'La escuela ha sido registrada exitosamente en el sistema.');
  }

  escuelaActualizada(): void {
    this.success('¡Escuela Actualizada!', 'Los cambios han sido guardados correctamente.');
  }

  escuelaEliminada(): void {
    this.success('¡Escuela Eliminada!', 'La escuela ha sido eliminada del sistema.');
  }

  confirmDeleteEscuela(nombreEscuela: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Escuela?',
      `¿Estás seguro de eliminar "${nombreEscuela}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  // DEPENDENCIAS
  dependenciaCreada(): void {
    this.success('¡Dependencia Creada!', 'La dependencia ha sido registrada exitosamente en el sistema.');
  }

  dependenciaActualizada(): void {
    this.success('¡Dependencia Actualizada!', 'Los cambios han sido guardados correctamente.');
  }

  dependenciaEliminada(): void {
    this.success('¡Dependencia Eliminada!', 'La dependencia ha sido eliminada del sistema.');
  }

  confirmDeleteDependencia(nombreDependencia: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Dependencia?',
      `¿Estás seguro de eliminar "${nombreDependencia}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  // ROLES
  rolCreado(): void {
    this.success('¡Rol Creado!', 'El rol ha sido registrado exitosamente en el sistema.');
  }

  rolActualizado(): void {
    this.success('¡Rol Actualizado!', 'Los cambios han sido guardados correctamente.');
  }

  rolEliminado(): void {
    this.success('¡Rol Eliminado!', 'El rol ha sido eliminado del sistema.');
  }

  confirmDeleteRol(nombreRol: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Rol?',
      `¿Estás seguro de eliminar "${nombreRol}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  //ENCUESTA PRE CONFIGURAD

  encuestaCreado(): void {
    this.success('¡Encuesta Creado!', 'La encuesta ha sido creado exitosamente.');
  }

  encuestaActualizado(): void {
    this.success('¡Encuesta Actualizado!', 'Los cambios en la encuesta han sido guardados.');
  }

  encuestaEliminado(): void {
    this.success('¡Encuesta Eliminado!', 'La encuesta ha sido eliminado del sistema.');
  }

  encuestaPublicado(): void {
    this.success('¡Encuesta Publicado!', 'La encuesta ahora es visible públicamente.');
  }

  encuestaOculto(): void {
    this.warning('Encuesta Oculto', 'La encuesta ha sido ocultado del público.');
  }

  confirmDeleteencuesta(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Encuesta?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleencuesta(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Encuesta?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }


  //PRODUCTO

  productoCreado(): void {
    this.success('¡Producto Creado!', 'El producto ha sido creado exitosamente.');
  }

  productoActualizado(): void {
    this.success('¡Producto Actualizado!', 'Los cambios en el producto han sido guardados.');
  }

  productoEliminado(): void {
    this.success('¡Producto Eliminado!', 'El producto ha sido eliminado del sistema.');
  }

  productoPublicado(): void {
    this.success('¡Producto Publicado!', 'El producto ahora es visible públicamente.');
  }

  productoOculto(): void {
    this.warning('Producto Oculto', 'El producto ha sido ocultado del público.');
  }

  confirmDeleteproducto(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Producto?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleproducto(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Producto?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  //SERVICIO
  servicioCreado(): void {
    this.success('¡Servicio Creado!', 'El servicio ha sido creado exitosamente.');
  }

  servicioActualizado(): void {
    this.success('¡Servicio Actualizado!', 'Los cambios en el servicio han sido guardados.');
  }

  servicioEliminado(): void {
    this.success('¡Servicio Eliminado!', 'El servicio ha sido eliminado del sistema.');
  }

  servicioPublicado(): void {
    this.success('¡Servicio Publicado!', 'El servicio ahora es visible públicamente.');
  }

  servicioOculto(): void {
    this.warning('Servicio Oculto', 'El servicio ha sido ocultado del público.');
  }

  confirmDeleteservicio(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Servicio?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleservicio(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Servicio?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }




  ///HOME 
  //Equipo

  equipoCreado(): void {
    this.success('¡Equipo Creado!', 'El equipo ha sido creado exitosamente.');
  }

  equipoActualizado(): void {
    this.success('¡Equipo Actualizado!', 'Los cambios en el equipo han sido guardados.');
  }

  equipoEliminado(): void {
    this.success('¡Equipo Eliminado!', 'El equipo ha sido eliminado del sistema.');
  }

  equipoPublicado(): void {
    this.success('¡Equipo Publicado!', 'El equipo ahora es visible públicamente.');
  }

  equipoOculto(): void {
    this.warning('Equipo Oculto', 'El equipo ha sido ocultado del público.');
  }

  confirmDeleteequipo(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Equipo?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmToggleequipo(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Equipo?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  //valor
 valorCreado(): void {
    this.success('¡Valor Creado!', 'El valor ha sido creado exitosamente.');
  }

  valorActualizado(): void {
    this.success('¡Valor Actualizado!', 'Los cambios en el valor han sido guardados.');
  }

  valorEliminado(): void {
    this.success('¡Valor Eliminado!', 'El valor ha sido eliminado del sistema.');
  }

  valorPublicado(): void {
    this.success('¡Valor Publicado!', 'El valor ahora es visible públicamente.');
  }

  valorOculto(): void {
    this.warning('Valor Oculto', 'El valor ha sido ocultado del público.');
  }

  confirmDeletevalor(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Valor?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmTogglevalor(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Valor?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  //Mision

  misionCreado(): void {
    this.success('¡Mision Creado!', 'La mision ha sido creado exitosamente.');
  }

  misionActualizado(): void {
    this.success('¡Mision Actualizado!', 'Los cambios en la mision han sido guardados.');
  }

  misionEliminado(): void {
    this.success('¡Mision Eliminado!', 'La mision ha sido eliminado del sistema.');
  }

  misionPublicado(): void {
    this.success('¡Mision Publicado!', 'La mision ahora es visible públicamente.');
  }

  misionOculto(): void {
    this.warning('Mision Oculto', 'La mision ha sido ocultado del público.');
  }

  confirmDeletemision(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Mision?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmTogglemision(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Mision?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  //Vision
  visionCreado(): void {
    this.success('¡Vision Creado!', 'La vision ha sido creado exitosamente.');
  }

  visionActualizado(): void {
    this.success('¡Vision Actualizado!', 'Los cambios en la vision han sido guardados.');
  }

  visionEliminado(): void {
    this.success('¡Vision Eliminado!', 'La vision ha sido eliminado del sistema.');
  }

  visionPublicado(): void {
    this.success('¡Vision Publicado!', 'La vision ahora es visible públicamente.');
  }

  visionOculto(): void {
    this.warning('Vision Oculto', 'La vision ha sido ocultado del público.');
  }

  confirmDeletevision(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Vision?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmTogglevision(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Vision?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  
  homeCreado(): void {
    this.success('Portada Creado!', 'La portada ha sido creado exitosamente.');
  }

  homeActualizado(): void {
    this.success('Portada Actualizado!', 'Los cambios en la encuesta han sido guardados.');
  }

  homeEliminado(): void {
    this.success('¡Portada Eliminado!', 'La portada ha sido eliminado del sistema.');
  }

  homePublicado(): void {
    this.success('¡Portada Publicado!', 'La Portada ahora es visible públicamente.');
  }

  homeOculto(): void {
    this.warning('Portada Oculto', 'La portada ha sido ocultado del público.');
  }

  confirmDeletehome(titulo: string): Promise<boolean> {
    return this.confirm(
      '¿Eliminar Portada?',
      `¿Estás seguro de eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      'Sí, Eliminar',
      'Cancelar'
    );
  }

  confirmTogglehome(titulo: string, publicar: boolean): Promise<boolean> {
    const action = publicar ? 'publicar' : 'ocultar';
    return this.confirm(
      `¿${publicar ? 'Publicar' : 'Ocultar'} Portada?`,
      `¿Estás seguro de ${action} "${titulo}"?`,
      `Sí, ${publicar ? 'Publicar' : 'Ocultar'}`,
      'Cancelar'
    );
  }

  //NOSOTROS
  
  

  // ERRORES GENÉRICOS
  errorCarga(entidad: string = 'datos'): void {
    this.error('Error de Carga', `No se pudieron cargar los ${entidad}. Intenta nuevamente.`);
  }

  errorCreacion(entidad: string = 'registro'): void {
    this.error('Error de Creación', `No se pudo crear el ${entidad}. Verifica los datos e intenta nuevamente.`);
  }

  errorActualizacion(entidad: string = 'registro'): void {
    this.error('Error de Actualización', `No se pudo actualizar el ${entidad}. Intenta nuevamente.`);
  }

  errorEliminacion(entidad: string = 'registro'): void {
    this.error('Error de Eliminación', `No se pudo eliminar el ${entidad}. Intenta nuevamente.`);
  }

  errorConexion(): void {
    this.error('Error de Conexión', 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
  }

  errorPermisos(): void {
    this.error('Acceso Denegado', 'No tienes permisos para realizar esta acción.');
  }

  // ADVERTENCIAS
  camposIncompletos(): void {
    this.warning('Campos Incompletos', 'Por favor, completa todos los campos requeridos antes de continuar.');
  }

  archivoInvalido(formatosPermitidos: string = 'PDF'): void {
    this.warning('Archivo Inválido', `Solo se permiten archivos en formato ${formatosPermitidos}.`);
  }

  archivoGrande(maxSize: string = '10MB'): void {
    this.warning('Archivo Muy Grande', `El archivo no debe superar los ${maxSize}.`);
  }

  // INFORMACIÓN
  sinCambios(): void {
    this.info('Sin Cambios', 'No se detectaron cambios para guardar.');
  }

  procesando(accion: string = 'operación'): void {
    this.info('Procesando', `La ${accion} está en proceso. Por favor espera...`);
  } 
}
