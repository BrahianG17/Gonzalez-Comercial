// Función para formatear precios en guaraníes
export const formatGuarani = (amount) => {
  // Convertir a número si es string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Formatear con separadores de miles y sin decimales
  return `₲ ${numAmount.toLocaleString('es-PY')}`;
};

// Función para convertir guaraníes a número (para cálculos)
export const parseGuarani = (guaraniString) => {
  // Remover símbolo ₲ y separadores de miles
  const cleanString = guaraniString.replace(/[₲\s,]/g, '');
  return parseInt(cleanString) || 0;
}; 