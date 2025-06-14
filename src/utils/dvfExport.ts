
import { DVFEvaluation, DVFExportData } from "@/types/dvf";

export const exportToExcel = (evaluations: DVFEvaluation[]) => {
  const headers = [
    'Title',
    'Description', 
    'Desirability',
    'Viability',
    'Feasibility',
    'Total Score',
    'Recommendation',
    'Notes',
    'Created Date'
  ];

  const csvContent = [
    headers.join(','),
    ...evaluations.map(evaluation => [
      `"${evaluation.title.replace(/"/g, '""')}"`,
      `"${evaluation.description.replace(/"/g, '""')}"`,
      evaluation.scores.desirability,
      evaluation.scores.viability,
      evaluation.scores.feasibility,
      evaluation.totalScore,
      evaluation.recommendation,
      `"${(evaluation.notes || '').replace(/"/g, '""')}"`,
      evaluation.createdAt.toLocaleDateString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dvf-evaluations-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const calculateAverageScores = (evaluations: DVFEvaluation[]) => {
  if (evaluations.length === 0) {
    return { desirability: 0, viability: 0, feasibility: 0, total: 0 };
  }

  const totals = evaluations.reduce(
    (acc, evaluation) => ({
      desirability: acc.desirability + evaluation.scores.desirability,
      viability: acc.viability + evaluation.scores.viability,
      feasibility: acc.feasibility + evaluation.scores.feasibility,
      total: acc.total + evaluation.totalScore
    }),
    { desirability: 0, viability: 0, feasibility: 0, total: 0 }
  );

  const count = evaluations.length;
  return {
    desirability: Math.round((totals.desirability / count) * 10) / 10,
    viability: Math.round((totals.viability / count) * 10) / 10,
    feasibility: Math.round((totals.feasibility / count) * 10) / 10,
    total: Math.round((totals.total / count) * 10) / 10
  };
};
