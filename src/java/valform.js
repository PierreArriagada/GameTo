$(document).ready(function () {
    console.log("DOM listo.");

    // Función para limpiar los mensajes de error
    function clearErrors() {
        console.log("Función clearErrors() llamada.");
        $(".error-message").text("");
        $("#numero_telefono").removeClass('border-red-500');
        console.log("Errores limpiados.");
    }


    // Función para validar el teléfono y actualizar el borde (MOVIDA FUERA DE validateForm)
    function validateTelefono() {
        console.log("Función validateTelefono() llamada.");
        const telefono = $("#numero_telefono").val();
        const telefonoError = $("#numero_telefono-error");
        const telefonoRegex = /^\d{9}$/;

        console.log("Teléfono:", telefono);

        if (!telefonoRegex.test(telefono)) {
            telefonoError.text("El teléfono debe tener 9 dígitos.");
            $("#numero_telefono").addClass('border-red-500');
            console.log("Teléfono inválido.");
            return false;
        } else {
            telefonoError.text("");
            $("#numero_telefono").removeClass('border-red-500');
            console.log("Teléfono válido.");
            return true;
        }
    }

    // Función para validar la fecha de nacimiento (MOVIDA FUERA DE validateForm)
    function validateFechaNacimiento(fechaNacimientoId, errorId) {
        console.log("Función validateFechaNacimiento() llamada.");
        const fechaNacimiento = new Date($("#" + fechaNacimientoId).val());
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        const dia = hoy.getDate() - fechaNacimiento.getDate();
        if (mes < 0 || (mes === 0 && dia < 0)) {
            edad--;
        }

        console.log("Fecha de nacimiento:", fechaNacimiento);
        console.log("Edad:", edad);

        if (edad < 13) {
            $("#" + errorId).text("Debes tener al menos 13 años.");
            console.log("Edad inválida.");
            return false;
        }
        console.log("Edad válida.");
        return true;
    }

    // Función para validar la complejidad de la contraseña (MOVIDA FUERA DE validateForm)
    function validatePassword(passwordId, errorId) {
        console.log("Función validatePassword() llamada.");
        const password = $("#" + passwordId).val();
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;

        console.log("Contraseña:", password);

        if (!passwordRegex.test(password)) {
            $("#" + errorId).text("La contraseña debe tener entre 6 y 18 caracteres, al menos una mayúscula y un número.");
            console.log("Contraseña inválida.");
            return false;
        }
        console.log("Contraseña válida.");
        return true;
    }

    // Función para validar el formulario completo
    function validateForm() {
        console.log("Función validateForm() llamada.");
        let isValid = true;
        clearErrors();

        // Validación de campos no vacíos (excepto dirección)
        const requiredFields = ["nombre_completo", "nombre_usuario", "email", "password", "password_confirmation", "numero_telefono", "fecha_nacimiento"];
        requiredFields.forEach(fieldId => {
            const value = $(`#${fieldId}`).val().trim();
            console.log("Campo", fieldId, "valor:", value);
            if (value === "") {
                $(`#${fieldId}-error`).text("Este campo es obligatorio.");
                isValid = false;
            }
        });

        // Validación de formato de correo electrónico
        const email = $("#email").val().trim();
        console.log("Email:", email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $("#email-error").text("Ingresa un correo electrónico válido.");
            isValid = false;
        }

        // 3. Validación de coincidencia de contraseñas
        const password = $("#password").val();
        const passwordConfirmation = $("#password_confirmation").val();
        console.log("Contraseña:", password, "Confirmación:", passwordConfirmation);
        if (password !== passwordConfirmation) {
            $("#password_confirmation-error").text("Las contraseñas no coinciden.");
            isValid = false;
        }

        //  Validación de la complejidad de la contraseña
        if (!validatePassword("password", "password-error")) {
            isValid = false;
        }

        //  Validación de la fecha de nacimiento
        if (!validateFechaNacimiento("fecha_nacimiento", "fecha_nacimiento-error")) {
            isValid = false;
        }

        //  Validación del número de teléfono
        if (!validateTelefono()) {
            isValid = false;
        }

        console.log("Formulario válido:", isValid);
        return isValid;
    }

    // Validación del teléfono al perder el foco
    $('#numero_telefono').on('blur', validateTelefono);

   
    // Evento submit del formulario
    $("#registro-form").submit(function (event) {
        console.log("Evento submit llamado.");
        event.preventDefault(); // Evita el envío por defecto

        if (validateForm()) {
            console.log("Formulario válido, enviando...");
            
            Swal.fire({
                title: '¡Formulario válido!',
                text: 'Registro exitoso.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            
        } else {
            console.log("Formulario inválido, errores detectados.");
            // Cuadro de diálogo de error con SweetAlert2
            Swal.fire({
                title: 'Error',
                text: 'Por favor, corrige los errores en el formulario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    $("#limpiar-form").click(function () {
        console.log("Evento de clic en limpiar-form detectado."); 
        $("#limpiar-form").click(function () {
            console.log("Limpiando formulario.");
            // Limpiar los campos individualmente
            $("#nombre_completo").val("");
            $("#nombre_usuario").val("");
            $("#email").val("");
            $("#password").val("");
            $("#password_confirmation").val("");
            $("#numero_telefono").val("");
            $("#fecha_nacimiento").val("");
            $("#direccion_despacho").val("");
    
            // Limpiar los mensajes de error
            clearErrors();
            console.log("Formulario limpiado.");
        });
    });
});




   

  