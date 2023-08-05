import React, { useState, Fragment, useEffect } from 'react';
import Modal from '@common/Modal';
import { PlusIcon, ChevronDownIcon, FolderPlusIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import FormRegisters from '@common/FormRegisters';
import moment from 'moment';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import FormCategory from '@common/FormCategory';
import RegisterTable from '@components/RegisterTable';
import { getMyRegisters, deleteRegister } from '@services/api/registers';
import 'moment/locale/es';
import Link from 'next/link';

moment.locale('es');

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [register, setregister] = useState(null);
  const [registers, setregisters] = useState(null);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getRegisters() {
      const response = await getMyRegisters();
      setregisters(response);
    }
    try {
      getRegisters();
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [alert]);

  const handleDelete = (id) => {
    if (!window.confirm('Confirma para continuar')) return;
    deleteRegister(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Registro eliminado',
          type: 'warning',
          autoClose: true,
        });
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: false,
        });
      });
  };

  const showtoNewRegister = () => {
    setregister(null);
    setOpenRegister(true);
  };

  const showtoEditRegister = (register) => {
    setregister(register);
    setOpenRegister(true);
  };

  // useEffect(() => {
  //   Getdata();
  // }, [alert]);

  // const Getdata = () => {
  // const registers = useFetch(endPoints.registers.list);
  //   setregisters(data);
  // };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-4">
        <div className="min-w-0 flex-1"></div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setOpenCategory(true)}
            >
              <FolderPlusIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Nueva Categoría
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => showtoNewRegister()}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Nuevo Registro
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      Edit
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      View
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="flex flex-col">
        <RegisterTable registers={registers} showtoEditRegister={showtoEditRegister} handleDelete={handleDelete} />
      </div>
      <Modal open={openRegister} setOpen={setOpenRegister} titleModal={`${register ? 'Modificar' : 'Nuevo'} Registro`}>
        <FormRegisters setOpen={setOpenRegister} register={register} />
      </Modal>
      <Modal open={openCategory} setOpen={setOpenCategory} titleModal="Nueva Categoría">
        <FormCategory setOpen={setOpenCategory} />
      </Modal>
    </>
  );
}
