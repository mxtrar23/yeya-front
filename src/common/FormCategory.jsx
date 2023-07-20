import { useRef, useState } from 'react';
import { CategorySchema } from '@schemas/CategorySchema';
import { addCategory } from '@services/api/category';
import useAlert from '@hooks/useAlert';

export default function FormRegisters({ setOpen }) {
  const [error, seterror] = useState(null);
  const formRef = useRef(null);

  const { setAlert } = useAlert();

  const handleSubmit = async (e) => {
    seterror(null);
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {
      name: formData.get('name'),
    };
    console.log('data', data);
    const val = await validaForm(data);
    if (val) {
      setAlert({
        active: true,
        message: 'asddasasdtamente!',
        type: 'success',
        autoClose: false,
      });
      if (!window.confirm('Confirma para continuar')) return;

      addCategory(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Registro guardado correctamente!',
            type: 'success',
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: 'Error:' + error.message,
            type: 'error',
            autoClose: false,
          });
        });
    }
  };

  const validaForm = async (data) => {
    try {
      return await CategorySchema.validate(data);
    } catch (error) {
      seterror(error.message);
    }
    return false;
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <textarea
                  name="name"
                  id="name"
                  autoComplete="name"
                  rows="3"
                  className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Nombre de la categoría"
                  defaultValue={null}
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="px-4 py-3  text-center sm:px-6 text-red-800 bg-red-100 ">
              <span>{error}</span>
            </div>
          )}
          <div className="px-4 py-3  text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
