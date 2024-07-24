function getErrorMessage(key: string): string {
  const errorMessages: { [key: string]: string } = {
    "auth/invalid-email": "Correo inválido",
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/too-many-requests": "Demasiados intentos, intente más tarde",
    "auth/invalid-credential": "Credenciales inválidas",
  };

  return errorMessages[key] || "Error desconocido";
}

export function loginHandlingError(message: string): string {
  const errorKey = Object.keys(getErrorMessage).find((key) =>
    message.includes(key),
  );
  return errorKey ? getErrorMessage(errorKey) : "Error desconocido";
}
