import React from 'react'

export default function Organization() {
  return (
    <div className="text-gray-600 body-font w-full h-full">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">Cadastre sua instituição para apoiar nossa causa</h1>
          <p className="leading-relaxed mt-4">Se você se preocupa com a sustentabilidade e quer ajudar a combater a poluição, cadastre-se no Cataki. Com o aplicativo, é possível agendar a coleta de materiais recicláveis com catadores próximos da sua região, contribuindo para a reciclagem e inclusão social dos catadores. É fácil, rápido e faz a diferença!</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Registre sua Instituição</h2>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Nome da Instituição</label>
            <input type="text" className="w-full bg-white rounded border border-[#6bc55c] focus:border-[#2B761F] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">E-mail</label>
            <input type="email" className="w-full bg-white rounded border border-[#6bc55c] focus:border-[#2B761F] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Senha</label>
            <input type="password" className="w-full bg-white rounded border border-[#6bc55c] focus:border-[#2B761F] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Descrição</label>
            <textarea name="description" id="" className='w-full bg-white rounded border border-[#6bc55c] focus:border-[#2B761F] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></textarea>
          </div>
          <button className="text-white bg-[#6BC55C] border-0 py-2 px-8 focus:outline-none hover:bg-[#2B761F] rounded text-lg">Registrar</button>
        </div>
      </div>
    </div>
  )
}

