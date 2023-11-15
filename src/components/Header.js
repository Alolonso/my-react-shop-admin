'use client';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import Modal from '@common/Modal';

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className=" py-6 px-8 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">List of Products</h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setOpenModal(true)}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add Product
            </button>
          </span>
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        {console.log('entra')}
        <h1>Hola mundo</h1>
      </Modal>
    </>
  );
}
