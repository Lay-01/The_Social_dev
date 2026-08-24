import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import AdminLogin from './AdminLogin';

export default function ProtectedRoute({ children }) {
  const { user } = useSiteContent();

  if (!user) {
    return <AdminLogin />;
  }

  return children;
}
