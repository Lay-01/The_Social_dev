import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import AdminLogin from './AdminLogin';

export default function ProtectedRoute({ children }) {
  const { user } = useSiteContent();

  // Enforce session object validation (must have valid email or user id)
  if (!user || (!user.email && !user.id)) {
    return <AdminLogin />;
  }

  return children;
}
