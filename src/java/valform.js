$(document).ready(function () {
    // Función para limpiar los mensajes de error
    function clearErrors() {
        $(".error-message").text("");
        $("#numero_telefono").removeClass('border-red-500'); // Limpia el borde rojo del telefono
    }

    // Función para validar el teléfono y actualizar el borde
    function validateTelefono() {
        const telefono = $("#numero_telefono").val();
        const telefonoError = $("#numero_telefono-error"); // Corregido: selecciona el ID correcto
        const telefonoRegex = /^\d{9}$/;

        if (!telefonoRegex.test(telefono)) {
            telefonoError.text("El teléfono debe tener 9 dígitos.");
            $("#numero_telefono").addClass('border-red-500');
            return false;
        } else {
            telefonoError.text("");
            $("#numero_telefono").removeClass('border-red-500');
            return true;
        }
    }

    // Función para validar el formulario completo
    function validateForm() {
        let isValid = true;
        clearErrors();

        // 1. Validación de campos no vacíos (excepto dirección)
        const requiredFields = ["nombre_completo", "nombre_usuario", "email", "password", "password_confirmation", "numero_telefono", "fecha_nacimiento"];
        requiredFields.forEach(fieldId => {
            const value = $(`#${fieldId}`).val().trim();
            if (value === "") {
                $(`#${fieldId}-error`).text("Este campo es obligatorio.");
                isValid = false;
            }
        });

        // 2. Validación de formato de correo electrónico
        const email = $("#email").val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $("#email-error").text("Ingresa un correo electrónico válido.");
            isValid = false;
        }

        // 3. Validación de coincidencia de contraseñas
        const password = $("#password").val();
        const passwordConfirmation = $("#password_confirmation").val();
        if (password !== passwordConfirmation) {
            $("#password_confirmation-error").text("Las contraseñas no coinciden.");
            isValid = false;
        }

        // 4. Validación de la complejidad de la contraseña (al menos un número y una mayúscula)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;
        if (!passwordRegex.test(password)) {
            $("#password-error").text("La contraseña debe tener entre 6 y 18 caracteres, al menos una mayúscula y un número.");
            isValid = false;
        }

        // 5. Validación de la fecha de nacimiento (mayor de 13 años)
        const fechaNacimiento = new Date($("#fecha_nacimiento").val());
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        const dia = hoy.getDate() - fechaNacimiento.getDate();
        if (mes < 0 || (mes === 0 && dia < 0)) {
            edad--;
        }
        if (edad < 13) {
            $("#fecha_nacimiento-error").text("Debes tener al menos 13 años.");
            isValid = false;
        }

        // 6. Validación del número de teléfono
        if (!validateTelefono()) {
            isValid = false;
        }

        return isValid;
    }

    // Validación del teléfono al perder el foco
    $('#numero_telefono').on('blur', validateTelefono);

    // Evento submit del formulario
    $("#registro-form").submit(function (event) {
        event.preventDefault(); // Evita el envío por defecto

        if (validateForm()) {
            // Si la validación es exitosa, puedes enviar el formulario aquí
            alert("Formulario válido. ¡Registro exitoso!");
            // $(this).off('submit').submit(); // Descomentar para enviar el formulario realmente
        } else {
            alert("Por favor, corrige los errores en el formulario.");
        }
    });

    // Evento click del botón Limpiar
    $("#limpiar-form").click(function () {
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
    });
});