import { useState, useEffect } from 'react';

interface AccessCounter {
  totalVisits: number;
  uniqueVisits: number;
  lastVisit: string;
  todayVisits: number;
}

const STORAGE_KEY = 'portfolio_access_counter';
const VISITOR_ID_KEY = 'portfolio_visitor_id';

export const useAccessCounter = () => {
  const [counter, setCounter] = useState<AccessCounter>({
    totalVisits: 0,
    uniqueVisits: 0,
    lastVisit: '',
    todayVisits: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Gera um ID único para o visitante se não existir
  const getOrCreateVisitorId = (): string => {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  };

  // Verifica se é uma nova visita do mesmo visitante
  const isNewVisit = (lastVisit: string): boolean => {
    if (!lastVisit) return true;
    
    const lastVisitDate = new Date(lastVisit);
    const now = new Date();
    
    // Considera nova visita se passou mais de 30 minutos
    const thirtyMinutes = 30 * 60 * 1000;
    return (now.getTime() - lastVisitDate.getTime()) > thirtyMinutes;
  };

  // Verifica se é uma visita do mesmo dia
  const isSameDay = (date1: string, date2: string): boolean => {
    if (!date1 || !date2) return false;
    
    const d1 = new Date(date1).toDateString();
    const d2 = new Date(date2).toDateString();
    
    return d1 === d2;
  };

  // Incrementa o contador
  const incrementCounter = () => {
    const visitorId = getOrCreateVisitorId();
    const now = new Date().toISOString();
    
    setCounter(prevCounter => {
      const isNewVisitSession = isNewVisit(prevCounter.lastVisit);
      const isTodayVisit = isSameDay(prevCounter.lastVisit, now);
      
      const newCounter: AccessCounter = {
        totalVisits: isNewVisitSession ? prevCounter.totalVisits + 1 : prevCounter.totalVisits,
        uniqueVisits: prevCounter.uniqueVisits + (isNewVisitSession ? 1 : 0),
        lastVisit: now,
        todayVisits: isTodayVisit ? 
          (isNewVisitSession ? prevCounter.todayVisits + 1 : prevCounter.todayVisits) : 
          1,
      };

      // Salva no localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounter));
      
      return newCounter;
    });
  };

  // Carrega dados do localStorage
  useEffect(() => {
    try {
      const savedCounter = localStorage.getItem(STORAGE_KEY);
      if (savedCounter) {
        const parsed: AccessCounter = JSON.parse(savedCounter);
        setCounter(parsed);
      }
      
      // Incrementa contador para esta visita
      setTimeout(() => {
        incrementCounter();
        setIsLoading(false);
      }, 1000); // Delay de 1 segundo para contar como visita real
      
    } catch (error) {
      console.error('Erro ao carregar contador de acessos:', error);
      setIsLoading(false);
    }
  }, []);

  // Função para resetar contador (útil para desenvolvimento)
  const resetCounter = () => {
    const resetData: AccessCounter = {
      totalVisits: 0,
      uniqueVisits: 0,
      lastVisit: '',
      todayVisits: 0,
    };
    
    setCounter(resetData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VISITOR_ID_KEY);
  };

  return {
    counter,
    isLoading,
    resetCounter,
  };
};