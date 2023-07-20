const moneyFormat = (value) => {
  const formatCop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return formatCop.format(value);
};

const moneyFormatSigned = (value, type) => {
  const formatCop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return `${type == 'I' ? '+' : '-'} ${formatCop.format(value)}`;
};

export { moneyFormat, moneyFormatSigned };
