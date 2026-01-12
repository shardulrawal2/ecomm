import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // You could also log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      // Minimal fallback UI - no red banners for users
      return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
          {/* Empty fallback - users see blank page */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
