import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AcademicMicroSaaS = () => {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}>
      <Button
        asChild
        variant="outline"
        size="sm"
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>
      <iframe
        src="https://academic-micro-saas.lovable.app/landing"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0
        }}
        title="Academic Micro SaaS"
        allow="fullscreen"
      />
    </div>
  );
};

export default AcademicMicroSaaS;
