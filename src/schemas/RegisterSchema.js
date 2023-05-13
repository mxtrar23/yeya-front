import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  type: Yup.string().min(1).max(1).required(),
  value: Yup.number('algo sque sea serio').min(50, 'no creo que sema menos de 50').max(100000000, 'eso ya es mucha exageración,no cree?').required('Coloquemos unvalor coherente si?'),
  descripcion: Yup.string('escriba algo en la descripción')
    .min(3, 'inspirate algo con la descripción')
    .max(255, 'no te inspires tanto con la descripción')
    .required('el sistema no va a poder adivinar de que se trata'),
  categoryId: Yup.string().uuid().required(),
  // createdAt: Yup.date('y el sistema adivina cuando es? o que').required('Coloquemos una fecha porfa'),
});

export { RegisterSchema };
