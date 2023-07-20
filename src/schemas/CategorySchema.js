import * as Yup from 'yup';

const CategorySchema = Yup.object().shape({
  name: Yup.string('escriba nombre').min(3, 'pongale un nombre coherente').max(50, 'te pasas, ya esta muy largo').required('necesitamos que le ponga nombre a la categoría'),
});

export { CategorySchema };
