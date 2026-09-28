import React, { useState } from 'react';
import { Search, BookOpen, Users, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { professores, turmas } from '../data/scheduleData';

const normalizeSearch = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR')
  .trim();

export default function Professores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState('Todas');
  const [selectedTurno, setSelectedTurno] = useState('Todos');

  const disciplinas = [...new Set(professores.flatMap((professor) => professor.disciplinas))]
    .sort((left, right) => left.localeCompare(right, 'pt-BR'));
  const turnos = [...new Set(turmas.map((turma) => turma.turno))];
  const turmaPorCodigo = Object.fromEntries(turmas.map((turma) => [turma.codigo, turma]));
  const normalizedSearch = normalizeSearch(searchTerm);
  const normalizedDiscipline = normalizeSearch(selectedDisciplina);

  const filteredProfessores = professores.filter((professor) => {
    const classNames = professor.turmas.map((codigo) => turmaPorCodigo[codigo]?.nome_completo || codigo);
    const searchableValues = [professor.nome, ...professor.disciplinas, ...professor.turmas, ...classNames];
    const matchesSearch = searchableValues.some((value) => normalizeSearch(value).includes(normalizedSearch));
    const matchesDiscipline = selectedDisciplina === 'Todas' || professor.disciplinas.some(
      (disciplina) => normalizeSearch(disciplina) === normalizedDiscipline
    );
    const matchesTurn = selectedTurno === 'Todos' || professor.turmas.some(
      (codigo) => turmaPorCodigo[codigo]?.turno === selectedTurno
    );
    return matchesSearch && matchesDiscipline && matchesTurn;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDisciplina('Todas');
    setSelectedTurno('Todos');
  };

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="pb-20">
      <PageHeader title="Professores" subtitle="Corpo docente da escola" icon={Users} />

      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="teacher-search"
              type="text"
              aria-label="Buscar professor por nome, disciplina ou turma"
              placeholder="Buscar professor, disciplina ou turma..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-500">
              Disciplina
              <select
                value={selectedDisciplina}
                onChange={(event) => setSelectedDisciplina(event.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todas">Todas as disciplinas</option>
                {disciplinas.map((disciplina) => <option key={disciplina} value={disciplina}>{disciplina}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-500">
              Turno
              <select
                value={selectedTurno}
                onChange={(event) => setSelectedTurno(event.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos os turnos</option>
                {turnos.map((turno) => <option key={turno} value={turno}>{turno}</option>)}
              </select>
            </label>
          </div>

          <p className="text-sm text-slate-500" role="status">
            {filteredProfessores.length} {filteredProfessores.length === 1 ? 'professor encontrado' : 'professores encontrados'}
          </p>
          {(searchTerm || selectedDisciplina !== 'Todas' || selectedTurno !== 'Todos') && (
            <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900">
              <X className="h-4 w-4" /> Limpar busca e filtros
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredProfessores.map((professor) => (
              <div
                key={professor.id}
                className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 flex flex-col h-full min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {getInitials(professor.nome)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{professor.nome}</h3>
                    <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
                      <BookOpen className="w-4 h-4" />
                      {professor.disciplinas.length} disciplinas
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-600">{professor.disciplinas.join(', ')}</p>

                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {professor.turmas.map((codigo) => (
                      <span key={codigo} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                        {codigo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
          ))}
          {filteredProfessores.length === 0 && (
            <div className="text-center py-10 text-slate-500 sm:col-span-2">Nenhum professor encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}
