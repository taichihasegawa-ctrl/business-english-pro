'use client';

import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import ProfileForm from '@/components/ProfileForm';
import DiagnosisTest from '@/components/DiagnosisTest-v2';
import ResultsPage from '@/components/ResultsPage';
import { UserProfile, DiagnosisResult } from '@/lib/types';

export default function Home() {
  const [step, setStep] = useState<'intro' | 'profile' | 'test' | 'results'>('intro');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<DiagnosisResult | null>(null);

  const handleStart = () => {
    setStep('profile');
  };

  const handleProfileComplete = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setStep('test');
  };

  const handleTestComplete = (diagnosisResult: DiagnosisResult) => {
    setResults(diagnosisResult);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('intro');
    setProfile(null);
    setResults(null);
  };

  return (
    <main className="min-h-screen">
      {step === 'intro' && <IntroScreen onStart={handleStart} />}
      {step === 'profile' && <ProfileForm onComplete={handleProfileComplete} />}
      {step === 'test' && profile && (
        <DiagnosisTest profile={profile} onComplete={handleTestComplete} />
      )}
      {step === 'results' && results && (
        <ResultsPage results={results} profile={profile!} onRestart={handleRestart} />
      )}
    </main>
  );
}
