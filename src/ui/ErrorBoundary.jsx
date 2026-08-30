import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="card" style={{ border: '1px solid var(--warning-border, #ef4444)', padding: '2rem', margin: '1rem', color: 'var(--text-primary)' }}>
                    <h2 style={{ color: 'var(--warning-text, #fca5a5)', marginBottom: '8px' }}>An unexpected error occurred.</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{this.state.error && this.state.error.toString()}</p>
                    <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>
                        Reload Application
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
