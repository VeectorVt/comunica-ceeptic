import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { gradeDays, grades, turmas } from '../data/scheduleData';

const normalizeSearch = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR')
  .trim();

const GradeAulas = () => {
  const [selectedTurma, setSelectedTurma] = useState(turmas[0]?.codigo || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTurno, setSelectedTurno] = useState('Todos');
  const [selectedCurso, setSelectedCurso] = useState('Todos');

  const turnos = [...new Set(turmas.map((turma) => turma.turno))];
  const cursos = [...new Set(turmas.map((turma) => turma.curso))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const normalizedQuery = normalizeSearch(searchQuery);
  const compactQuery = normalizedQuery.replace(/\s+/g, '');
  const filteredTurmas = turmas.filter((turma) => {
    const searchableFields = [turma.nome_completo, turma.codigo, turma.curso, turma.ano, turma.turno, turma.turma];
    const matchesSearch = searchableFields.some((field) => {
      const normalizedField = normalizeSearch(field);
      return normalizedField.includes(normalizedQuery) || normalizedField.replace(/\s+/g, '').includes(compactQuery);
    });
    const matchesTurno = selectedTurno === 'Todos' || turma.turno === selectedTurno;
    const matchesCurso = selectedCurso === 'Todos' || turma.curso === selectedCurso;
    return matchesSearch && matchesTurno && matchesCurso;
  });

  const activeTurma = filteredTurmas.some((turma) => turma.codigo === selectedTurma)
    ? selectedTurma
    : filteredTurmas[0]?.codigo || '';
  const gradeAtual = grades[activeTurma];

  return (
    <div className="pb-20 min-h-screen bg-slate-50 rounded-lg">
      <PageHeader title="Grade de Aulas" icon={BookOpen} />

      <div className="px-4 py-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-6">
          <label htmlFor="class-search" className="block text-sm font-bold text-slate-700 mb-2">Encontre sua turma</label>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="class-search"
              type="text"
              placeholder="Buscar turma, curso ou código..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Buscar turma por nome, código, curso, ano ou turno"
            />
          </div>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-500">
              Turno
              <select
                value={selectedTurno}
                onChange={(event) => setSelectedTurno(event.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos os turnos</option>
                {turnos.map((turno) => <option key={turno} value={turno}>{turno}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-500">
              Curso
              <select
                value={selectedCurso}
                onChange={(event) => setSelectedCurso(event.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos os cursos</option>
                {cursos.map((curso) => <option key={curso} value={curso}>{curso}</option>)}
              </select>
            </label>
          </div>

          <label htmlFor="class-select" className="sr-only">Selecionar turma</label>
          <select
            id="class-select"
            value={activeTurma}
            onChange={(event) => setSelectedTurma(event.target.value)}
            disabled={filteredTurmas.length === 0}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-60"
          >
            {filteredTurmas.length === 0 ? (
              <option value="">Nenhuma turma encontrada</option>
            ) : filteredTurmas.map((turma) => (
              <option key={turma.codigo} value={turma.codigo}>{turma.nome_completo}</option>
            ))}
          </select>
        </div>

        {filteredTurmas.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Nenhuma turma corresponde à busca e aos filtros.</p>
          </div>
        ) : gradeAtual ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <h2 className="font-bold text-lg">{gradeAtual.nome}</h2>
              <p className="text-blue-100 text-sm">{gradeAtual.turno} · Horário de aulas</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 border-b border-slate-100">
                    <th className="p-3 font-bold whitespace-nowrap">Horário</th>
                    {gradeDays.map((day) => <th key={day.key} className="p-3 font-bold">{day.label}</th>)}
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {gradeAtual.horarios.map((row, index) => (
                    <tr key={row.horario} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-500 whitespace-nowrap">{row.horario}</td>
                      {gradeDays.map((day) => {
                        const lesson = row[day.key];
                        return (
                          <td key={day.key} className="p-3">
                            <span>{lesson.disciplina}</span>
                            {lesson.professor && <span className="mt-1 block text-xs text-slate-500">{lesson.professor}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">A grade desta turma ainda não está cadastrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeAulas;
