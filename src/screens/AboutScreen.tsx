import React from 'react';

const AboutScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-6 pb-24 overflow-y-auto bg-white">
      <div className="text-center mb-8 mt-4">
        <div className="w-20 h-20 bg-libras-yellow rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
           <span className="text-3xl">👋</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Sobre o Projeto</h2>
        <p className="text-gray-500 text-sm">Campus Garanhuns • Nov 2025</p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-bold text-libras-blue uppercase tracking-wider mb-2">Instituição</h3>
          <p className="text-gray-700 font-medium">Universidade de Pernambuco (UPE)</p>
          <p className="text-gray-500">Campus Garanhuns</p>
        </section>

        <section>
          <h3 className="text-sm font-bold text-libras-blue uppercase tracking-wider mb-2">Equipe de Desenvolvimento</h3>
          <ul className="grid grid-cols-1 gap-2">
            {['Luíz Tenório', 'Melissa Rêgo', 'Paula Beatriz', 'Pedro Ricardo'].map((name) => (
              <li key={name} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-700">{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-bold text-libras-blue uppercase tracking-wider mb-2">Fonte do Material</h3>
          <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 border border-gray-100">
            <p className="mb-2 font-bold">Libras Básico I - Apostila</p>
            <p><strong>Instituição:</strong> Escola de Governo do Distrito Federal (EGOV) / SEFP</p>
            <p className="mt-2 text-xs text-gray-500">
              Conteúdo histórico (pág. 5-6) e vocabulário (págs. 15, 17, 26, 37, 51, 62) baseados integralmente neste material.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-libras-blue uppercase tracking-wider mb-2">Objetivo</h3>
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-900 leading-relaxed border border-blue-100">
            "Difundir a história por trás da Língua de Sinais, apresentando fatos e
            curiosidades sobre essa língua e aumentar o vocabulário de LIBRAS do usuário."
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutScreen;
