import React from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import constants from '@services/constants';
import moment from 'moment';
import { moneyFormatSigned } from 'utils/moneyFormat';

export default function RegisterRow({ register, showtoEditRegister, handleDelete }) {
  return (
    <tr key={register.reg_id} id={register.reg_id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 h-10 w-10">
          <Image className="h-10 w-10 rounded-full" src={person.image} alt="" width={100} height={100} />
        </div> */}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-500">{constants.registerTypes[register.type]}</div>
            <div className="text-sm text-gray-900">{register.descripcion}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{register.cat_categories.name}</div>
        {/* <div className="text-sm text-gray-500">{person.department}</div> */}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${constants.registerColorTypes[register.type]}-100 text-${constants.registerColorTypes[register.type]}-800`}>
          {moneyFormatSigned(register.value, register.type)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(register.date).format('LL')}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href={`#${register.reg_id}`} className="text-indigo-600 hover:text-indigo-900" onClick={() => showtoEditRegister(register)}>
          Editar
        </a>
        {/* <Link href={`/dashboard/edit/${product.id}`}>
            <a className="text-indigo-600 hover:text-indigo-900">Edit</a>
        </Link> */}
      </td>
      <td>
        <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => handleDelete(register.id)} />
      </td>
    </tr>
  );
}
