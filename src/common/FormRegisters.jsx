import { useRef, useState } from 'react';
import { RegisterSchema } from '@schemas/RegisterSchema';
import moment from 'moment';
import { addRegisters } from '@services/api/registers';

export default function FormRegisters({ setOpen, setAlert }) {
  const [error, seterror] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    seterror(null);
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {
      type: formData.get('type'),
      value: parseInt(formData.get('price')),
      descripcion: formData.get('description'),
      categoryId: formData.get('category'),
      // createdAt: formData.get('createdAt'),
      // images: [formData.get('images').name],
    };
    const val = await validaForm(data);
    if (val) {
      // console.log({ ...val, createdAt: moment(val.createdAt).format() });
      // addRegisters({ ...val, createdAt: moment(val.createdAt).format() }).then((response) => {
      addRegisters({ ...val })
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
      return await RegisterSchema.validate(data);
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
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Tipo registro
                </label>
                <select
                  id="type"
                  name="type"
                  autoComplete="type-name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="I">Entrada</option>
                  <option value="E">Salida</option>
                </select>
              </div>
              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="description"
                  id="description"
                  autoComplete="description"
                  rows="3"
                  className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input type="number" name="price" id="price" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <input type="date" name="createdAt" id="createdAt" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="col-span-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="add56b25-64bf-4e0d-a0af-ab29b3cf9588">Nomina</option>
                </select>
              </div>

              {/* <div className="col-span-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="images" name="images" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div> */}
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
