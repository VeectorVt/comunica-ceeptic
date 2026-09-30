import React, { useState } from 'react';
import { BookOpen, Search, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { gradeDays, grades, turmas } from '../data/scheduleData';

const normalizeSearch = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR')
  .trim();

const dayLabels = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
};

const getTimeRange = (startTime) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endMinutes = hours * 60 + minutes + 45;
  const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
  return `${startTime}–${endTime}`;
};

const getSubjectColor = (index, total) => {
  const hue = Math.round((index * 360) / total);
  return {
    backgroundColor: `hsl(${hue} 80% 90%)`,
    borderColor: `hsl(${hue} 65% 72%)`,
    color: `hsl(${hue} 70% 25%)`,
  };
};

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
  const subjects = gradeAtual
    ? [...new Set(gradeAtual.horarios.flatMap((row) => gradeDays.map((day) => row[day.key].disciplina)))].filter((subject) => subject && subject !== '-').sort((left, right) => left.localeCompare(right, 'pt-BR'))
    : [];
  const subjectColors = new Map(subjects.map((subject, index) => [subject, getSubjectColor(index, subjects.length)]));

  return (
    <div className="w-full min-w-0 max-w-full pb-20 min-h-screen bg-slate-50 rounded-lg">
      <PageHeader title="Grade de Aulas" icon={BookOpen} />

      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-1.5 text-slate-400">
          <RefreshCw className="w-3 h-3" />
          <span className="text-xs font-medium">Atualizado em: 30/09/2026</span>
        </div>
      </div>

      <div className="w-full min-w-0 px-4 py-4">
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
          <div className="min-w-0 bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <h2 className="font-bold text-lg">{gradeAtual.nome}</h2>
              <p className="text-blue-100 text-sm">{gradeAtual.turno} · Horário de aulas</p>
            </div>

            <div className="min-w-0 p-4">
              <div className="min-w-0 overflow-x-auto pb-2">
                <div className="min-w-[820px] space-y-2">
                  <div className="grid grid-cols-[96px_repeat(5,minmax(128px,1fr))] gap-2">
                    <div className="flex items-center justify-center rounded-lg bg-slate-100 px-2 py-3 text-xs font-bold text-slate-600">Horário</div>
                    {gradeDays.map((day) => (
                      <div key={day.key} className="flex items-center justify-center rounded-lg bg-slate-100 px-2 py-3 text-xs font-bold text-slate-700">
                        {dayLabels[day.key]}
                      </div>
                    ))}
                  </div>

                  {gradeAtual.horarios.map((row) => (
                    <div key={row.horario} className="grid grid-cols-[96px_repeat(5,minmax(128px,1fr))] gap-2">
                      <div className="flex min-h-[88px] flex-col items-center justify-center rounded-lg bg-slate-800 px-2 text-center text-xs font-bold text-white">
                        {getTimeRange(row.horario)}
                      </div>
                      {gradeDays.map((day) => {
                        const lesson = row[day.key];
                        const color = subjectColors.get(lesson.disciplina);
                        return (
                          <div
                            key={day.key}
                            style={color}
                            className={`flex min-h-[88px] flex-col justify-center rounded-lg border p-3 shadow-sm ${color ? '' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
                          >
                            <span className="break-words text-xs font-bold leading-snug">{lesson.disciplina === '-' ? 'Sem aula' : lesson.disciplina}</span>
                            {lesson.professor && <span className="mt-2 break-words text-[11px] leading-tight opacity-75">{lesson.professor}</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <h3 className="mb-3 text-xs font-bold uppercase text-slate-500">Disciplinas</h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <span key={subject} style={subjectColors.get(subject)} className="rounded-md border px-2 py-1 text-[11px] font-semibold">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
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
