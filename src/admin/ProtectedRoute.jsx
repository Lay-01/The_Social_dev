import React from 'react';
import { useSiteContent, ALLOWED_ADMIN_EMAILS } from '../context/SiteContext';
import AdminLogin from './AdminLogin';

export default function ProtectedRoute({ children }) {
  const { user } = useSiteContent();

  const userEmail = (user?.email || '').toLowerCase().trim();

  // Enforce session object validation and authorized email whitelist
  if (!user || !ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
    return <AdminLogin />;
  }

  return children;
}
