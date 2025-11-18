'use client'
import { useEffect, useState } from 'react';
import DetailsTop from "@/components/details/DetailsTop";
import SimilarPizza from "@/components/details/SimilarPizza";
import { fetchPizzaById } from "@/lib/api";
import { useParams } from "next/navigation";
import { MenuResponse } from '@/lib/detailstype';

const Page = () => {
  const params = useParams();
  const [pizza, setPizza] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pizzaId = params?.id as string;

  useEffect(() => {
    if (!pizzaId) {
      setError('Pizza ID not found');
      setLoading(false);
      return;
    }

    const loadPizza = async () => {
      try {
        setLoading(true);
        const pizzaData = await fetchPizzaById(pizzaId);
        setPizza(pizzaData);
      } catch (err) {
        setError('Failed to load pizza details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPizza();
  }, [pizzaId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading pizza details...</p>
      </div>
    );
  }

  if (error || !pizza) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-destructive">{error || 'Pizza not found'}</p>
      </div>
    );
  }

  return (
    <div>
      <DetailsTop pizza={pizza} />
      <SimilarPizza similarPizzas={pizza.similar} />
    </div>
  );
};

export default Page;